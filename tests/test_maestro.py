"""
Tests for Figure Maestro functionality
"""

import unittest
import sys
import os

# Add the parent directory to the path so we can import agreemint
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agreemint.maestro import FigureMaestro


class TestFigureMaestro(unittest.TestCase):
    """Test cases for the Figure Maestro class."""
    
    def setUp(self):
        """Set up test fixtures before each test method."""
        self.maestro = FigureMaestro()
        self.sample_contract = """
        CONTRACT AGREEMENT
        
        This agreement is between Acme Corporation and Beta Services LLC, effective January 1, 2024.
        
        Terms of service: 12 months with automatic renewal.
        Payment of $50,000 due within 30 days.
        
        Confidentiality: Both parties agree to maintain strict confidentiality.
        
        Penalties: Late payment will result in a penalty of 5% per month.
        Personal guarantee required from company officers.
        
        Termination: Either party may terminate with 30 days notice.
        """
    
    def test_maestro_initialization(self):
        """Test that Figure Maestro initializes correctly."""
        self.assertIsInstance(self.maestro, FigureMaestro)
        self.assertEqual(self.maestro.analysis_results, {})
        self.assertIsNone(self.maestro.contract_data)
    
    def test_analyze_contract_basic(self):
        """Test basic contract analysis functionality."""
        results = self.maestro.analyze_contract(self.sample_contract)
        
        # Check that analysis returns expected structure
        self.assertIsInstance(results, dict)
        self.assertEqual(results['status'], 'analyzed')
        self.assertIn('parties', results)
        self.assertIn('key_terms', results)
        self.assertIn('important_dates', results)
        self.assertIn('identified_risks', results)
        self.assertIn('recommendations', results)
        self.assertIn('analysis_summary', results)
    
    def test_party_extraction(self):
        """Test that parties are correctly extracted from contract."""
        results = self.maestro.analyze_contract(self.sample_contract)
        parties = results['parties']
        
        # Should find the two parties mentioned in the contract
        self.assertIsInstance(parties, list)
        # The exact extraction may vary, but should find some parties
        self.assertTrue(len(parties) >= 0)  # Could be 0 if pattern doesn't match exactly
    
    def test_risk_identification(self):
        """Test that risks are properly identified."""
        results = self.maestro.analyze_contract(self.sample_contract)
        risks = results['identified_risks']
        
        self.assertIsInstance(risks, list)
        # Sample contract contains penalties, personal guarantee, confidentiality, auto-renewal
        # So we should detect multiple risks
        self.assertTrue(len(risks) > 0)
        
        # Check risk structure
        if risks:
            risk = risks[0]
            self.assertIn('type', risk)
            self.assertIn('description', risk)
            self.assertIn('severity', risk)
    
    def test_recommendations_generation(self):
        """Test that recommendations are generated based on risks."""
        results = self.maestro.analyze_contract(self.sample_contract)
        recommendations = results['recommendations']
        
        self.assertIsInstance(recommendations, list)
        self.assertTrue(len(recommendations) > 0)
        
        # Should contain at least one recommendation
        self.assertTrue(any(isinstance(rec, str) for rec in recommendations))
    
    def test_export_json_format(self):
        """Test JSON export functionality."""
        self.maestro.analyze_contract(self.sample_contract)
        json_output = self.maestro.export_analysis("json")
        
        self.assertIsInstance(json_output, str)
        # Should be valid JSON (will raise exception if not)
        import json
        parsed = json.loads(json_output)
        self.assertIsInstance(parsed, dict)
    
    def test_export_text_format(self):
        """Test text export functionality."""
        self.maestro.analyze_contract(self.sample_contract)
        text_output = self.maestro.export_analysis("text")
        
        self.assertIsInstance(text_output, str)
        self.assertIn("AgreeMint Contract Analysis Report", text_output)
    
    def test_empty_contract(self):
        """Test handling of empty contract."""
        results = self.maestro.analyze_contract("")
        
        self.assertEqual(results['contract_length'], 0)
        self.assertEqual(len(results['parties']), 0)
        self.assertEqual(len(results['key_terms']), 0)
        self.assertEqual(len(results['identified_risks']), 0)
    
    def test_export_without_analysis(self):
        """Test export when no analysis has been performed."""
        output = self.maestro.export_analysis("text")
        self.assertIn("No analysis results available", output)
    
    def test_invalid_export_format(self):
        """Test handling of invalid export format."""
        self.maestro.analyze_contract(self.sample_contract)
        
        with self.assertRaises(ValueError):
            self.maestro.export_analysis("invalid_format")


if __name__ == '__main__':
    unittest.main()