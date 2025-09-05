"""
Figure Maestro - The core orchestrator for AgreeMint contract analysis.

This module contains the Maestro class which serves as the main controller
for contract analysis and AI-powered contract checking functionality.
"""

import json
import re
from typing import Dict, List, Optional, Any


class FigureMaestro:
    """
    The Figure Maestro is the main orchestrator for contract analysis.
    
    It coordinates contract parsing, analysis, and provides insights
    about contract terms, potential issues, and recommendations.
    """
    
    def __init__(self):
        """Initialize the Figure Maestro."""
        self.analysis_results = {}
        self.contract_data = None
        
    def analyze_contract(self, contract_text: str) -> Dict[str, Any]:
        """
        Analyze a contract and return detailed insights.
        
        Args:
            contract_text (str): The contract text to analyze
            
        Returns:
            Dict[str, Any]: Analysis results including key terms, risks, and recommendations
        """
        self.contract_data = contract_text
        
        # Extract key contract elements
        parties = self._extract_parties(contract_text)
        key_terms = self._extract_key_terms(contract_text)
        dates = self._extract_dates(contract_text)
        risks = self._identify_risks(contract_text)
        
        self.analysis_results = {
            "status": "analyzed",
            "parties": parties,
            "key_terms": key_terms,
            "important_dates": dates,
            "identified_risks": risks,
            "recommendations": self._generate_recommendations(risks),
            "contract_length": len(contract_text),
            "analysis_summary": self._generate_summary(parties, key_terms, risks)
        }
        
        return self.analysis_results
    
    def _extract_parties(self, text: str) -> List[str]:
        """Extract party names from the contract."""
        # Simple pattern matching for common contract party indicators
        patterns = [
            r"between\s+([A-Z][a-zA-Z\s]+?)\s+and\s+([A-Z][a-zA-Z\s]+?)(?:\s|,|\.|;)",
            r"Party\s+1[:\s]+([A-Z][a-zA-Z\s]+?)(?:\n|,|\.|;)",
            r"Party\s+2[:\s]+([A-Z][a-zA-Z\s]+?)(?:\n|,|\.|;)",
        ]
        
        parties = []
        for pattern in patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                for group in match.groups():
                    if group and len(group.strip()) > 2:
                        parties.append(group.strip())
        
        # Remove duplicates while preserving order
        unique_parties = []
        for party in parties:
            if party not in unique_parties:
                unique_parties.append(party)
                
        return unique_parties[:5]  # Limit to first 5 parties found
    
    def _extract_key_terms(self, text: str) -> List[str]:
        """Extract key contract terms and clauses."""
        key_terms = []
        
        # Look for common contract terms
        term_patterns = [
            r"payment[s]?\s+of\s+\$?([0-9,]+(?:\.[0-9]{2})?)",
            r"term[s]?\s+of\s+([0-9]+\s+(?:days?|months?|years?))",
            r"effective\s+date[:\s]+([A-Za-z0-9\s,]+)",
            r"termination[:\s]+([^.]+\.)",
            r"confidentiality[:\s]+([^.]+\.)",
        ]
        
        for pattern in term_patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                term = match.group(0).strip()
                if term and len(term) < 200:  # Avoid overly long matches
                    key_terms.append(term)
        
        return key_terms[:10]  # Limit to top 10 terms
    
    def _extract_dates(self, text: str) -> List[str]:
        """Extract important dates from the contract."""
        date_patterns = [
            r"\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b",
            r"\b\d{1,2}[/-]\d{1,2}[/-]\d{4}\b",
            r"\b\d{4}[/-]\d{1,2}[/-]\d{1,2}\b",
        ]
        
        dates = []
        for pattern in date_patterns:
            matches = re.finditer(pattern, text)
            for match in matches:
                dates.append(match.group(0))
        
        # Remove duplicates
        return list(set(dates))[:5]  # Limit to 5 unique dates
    
    def _identify_risks(self, text: str) -> List[Dict[str, str]]:
        """Identify potential risks in the contract."""
        risks = []
        
        # Define risk indicators
        risk_indicators = [
            {
                "pattern": r"penalty|penalties|fine[s]?|forfeit",
                "type": "Financial Risk",
                "description": "Contract contains penalty or fine clauses"
            },
            {
                "pattern": r"unlimited\s+liability|personal\s+guarantee",
                "type": "Liability Risk", 
                "description": "Unlimited liability or personal guarantee terms found"
            },
            {
                "pattern": r"automatic\s+renewal|auto[- ]renew",
                "type": "Commitment Risk",
                "description": "Automatic renewal clauses may extend commitment unexpectedly"
            },
            {
                "pattern": r"non[- ]compete|non[- ]disclosure|confidentiality",
                "type": "Restrictive Terms",
                "description": "Non-compete or confidentiality restrictions present"
            }
        ]
        
        for indicator in risk_indicators:
            if re.search(indicator["pattern"], text, re.IGNORECASE):
                risks.append({
                    "type": indicator["type"],
                    "description": indicator["description"],
                    "severity": "medium"  # Default severity
                })
        
        return risks
    
    def _generate_recommendations(self, risks: List[Dict[str, str]]) -> List[str]:
        """Generate recommendations based on identified risks."""
        recommendations = []
        
        if not risks:
            recommendations.append("No major risks identified. Review contract for completeness.")
        else:
            recommendations.append(f"Found {len(risks)} potential risk areas requiring attention.")
            
            for risk in risks:
                if risk["type"] == "Financial Risk":
                    recommendations.append("Review penalty clauses and consider negotiating caps on financial liability.")
                elif risk["type"] == "Liability Risk":
                    recommendations.append("Consider limiting liability to specific amounts or circumstances.")
                elif risk["type"] == "Commitment Risk":
                    recommendations.append("Review renewal terms and ensure clear termination procedures.")
                elif risk["type"] == "Restrictive Terms":
                    recommendations.append("Evaluate non-compete and confidentiality terms for reasonableness.")
        
        return recommendations
    
    def _generate_summary(self, parties: List[str], key_terms: List[str], risks: List[Dict[str, str]]) -> str:
        """Generate a brief analysis summary."""
        party_count = len(parties)
        term_count = len(key_terms)
        risk_count = len(risks)
        
        summary = f"Contract analysis complete. "
        summary += f"Identified {party_count} parties, {term_count} key terms, and {risk_count} potential risks. "
        
        if risk_count == 0:
            summary += "Contract appears to have standard terms with minimal risk indicators."
        elif risk_count <= 2:
            summary += "Contract has some areas requiring attention but appears manageable."
        else:
            summary += "Contract has multiple risk areas that should be carefully reviewed."
        
        return summary
    
    def get_analysis_results(self) -> Dict[str, Any]:
        """Get the current analysis results."""
        return self.analysis_results
    
    def export_analysis(self, format_type: str = "json") -> str:
        """
        Export analysis results in specified format.
        
        Args:
            format_type (str): Export format ('json' or 'text')
            
        Returns:
            str: Formatted analysis results
        """
        if not self.analysis_results:
            return "No analysis results available. Run analyze_contract() first."
        
        if format_type == "json":
            return json.dumps(self.analysis_results, indent=2)
        elif format_type == "text":
            return self._format_text_report()
        else:
            raise ValueError("Unsupported format. Use 'json' or 'text'.")
    
    def _format_text_report(self) -> str:
        """Format analysis results as a text report."""
        if not self.analysis_results:
            return "No analysis available."
        
        report = "=== AgreeMint Contract Analysis Report ===\n\n"
        report += f"Analysis Summary: {self.analysis_results.get('analysis_summary', 'N/A')}\n\n"
        
        # Parties
        parties = self.analysis_results.get('parties', [])
        if parties:
            report += "Identified Parties:\n"
            for i, party in enumerate(parties, 1):
                report += f"  {i}. {party}\n"
            report += "\n"
        
        # Key Terms
        key_terms = self.analysis_results.get('key_terms', [])
        if key_terms:
            report += "Key Terms:\n"
            for term in key_terms:
                report += f"  - {term}\n"
            report += "\n"
        
        # Risks
        risks = self.analysis_results.get('identified_risks', [])
        if risks:
            report += "Identified Risks:\n"
            for risk in risks:
                report += f"  - {risk['type']}: {risk['description']}\n"
            report += "\n"
        
        # Recommendations
        recommendations = self.analysis_results.get('recommendations', [])
        if recommendations:
            report += "Recommendations:\n"
            for rec in recommendations:
                report += f"  - {rec}\n"
        
        return report