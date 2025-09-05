# AgreeMint
AI Contract Checker with Figure Maestro

## Overview

AgreeMint is an AI-powered contract analysis tool featuring the **Figure Maestro** - a sophisticated orchestrator that analyzes contracts, identifies risks, and provides actionable recommendations.

## Features

### Figure Maestro Core Capabilities
- **Smart Contract Analysis**: Automatically extracts parties, key terms, and important dates
- **Risk Detection**: Identifies potential financial, liability, commitment, and restrictive risks
- **Intelligent Recommendations**: Provides tailored advice based on detected risk patterns
- **Multiple Export Formats**: Output results in JSON or human-readable text format

## Quick Start

### Installation
```bash
# Clone the repository
git clone https://github.com/YearningAsian/AgreeMint.git
cd AgreeMint

# Install dependencies
pip install -r requirements.txt
```

### Usage

#### Command Line Interface

**Run a demo:**
```bash
python cli.py demo
```

**Analyze a contract file:**
```bash
python cli.py analyze contract.txt
```

**Quick analysis of text:**
```bash
python cli.py quick -t "Your contract text here"
```

#### Python API

```python
from agreemint.maestro import FigureMaestro

# Initialize the Figure Maestro
maestro = FigureMaestro()

# Analyze a contract
contract_text = "Your contract content here..."
results = maestro.analyze_contract(contract_text)

# Export results
text_report = maestro.export_analysis("text")
json_report = maestro.export_analysis("json")
```

## Figure Maestro Analysis Output

The Figure Maestro provides comprehensive analysis including:

- **Contract Parties**: Automatically identified contracting parties
- **Key Terms**: Important clauses, payment terms, and dates
- **Risk Assessment**: Categorized risks with severity levels
- **Smart Recommendations**: Actionable advice for contract review
- **Analysis Summary**: Executive summary of findings

## Example Output

```
=== AgreeMint Contract Analysis Report ===

Analysis Summary: Contract analysis complete. Identified 2 parties, 3 key terms, and 2 potential risks.

Identified Parties:
  1. Acme Corporation
  2. Beta Services LLC

Key Terms:
  - Payment of $50,000
  - Terms of 12 months
  - Termination: Either party may terminate with 30 days notice

Identified Risks:
  - Financial Risk: Contract contains penalty or fine clauses
  - Commitment Risk: Automatic renewal clauses may extend commitment unexpectedly

Recommendations:
  - Review penalty clauses and consider negotiating caps on financial liability
  - Review renewal terms and ensure clear termination procedures
```

## Testing

Run the test suite to verify Figure Maestro functionality:

```bash
python -m unittest tests.test_maestro -v
```

## License

MIT License - see LICENSE file for details.
