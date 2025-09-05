#!/usr/bin/env python3
"""
AgreeMint CLI - Command Line Interface for Figure Maestro

This provides a command-line interface to the Figure Maestro contract analysis tool.
"""

import click
import sys
import os
from typing import Optional

# Add the parent directory to the path so we can import agreemint
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agreemint.maestro import FigureMaestro


@click.group()
@click.version_option(version="0.1.0")
def cli():
    """AgreeMint - AI Contract Checker with Figure Maestro"""
    pass


@cli.command()
@click.argument('contract_file', type=click.File('r'))
@click.option('--format', 'output_format', 
              type=click.Choice(['json', 'text']), 
              default='text',
              help='Output format for analysis results')
@click.option('--output', '-o', 
              type=click.File('w'), 
              default='-',
              help='Output file (default: stdout)')
def analyze(contract_file, output_format, output):
    """Analyze a contract file using Figure Maestro."""
    try:
        # Read the contract content
        contract_text = contract_file.read()
        
        if not contract_text.strip():
            click.echo("Error: Contract file is empty", err=True)
            sys.exit(1)
        
        # Initialize Figure Maestro and analyze
        maestro = FigureMaestro()
        click.echo("Analyzing contract with Figure Maestro...", err=True)
        
        results = maestro.analyze_contract(contract_text)
        
        # Export and output results
        formatted_output = maestro.export_analysis(output_format)
        output.write(formatted_output)
        
        if output != sys.stdout:
            click.echo(f"Analysis complete. Results written to {output.name}", err=True)
        
    except Exception as e:
        click.echo(f"Error analyzing contract: {str(e)}", err=True)
        sys.exit(1)


@cli.command()
@click.option('--text', '-t', 
              help='Contract text to analyze (instead of file)')
@click.option('--format', 'output_format', 
              type=click.Choice(['json', 'text']), 
              default='text',
              help='Output format for analysis results')
def quick(text, output_format):
    """Quick analysis of contract text."""
    if not text:
        click.echo("Error: No contract text provided", err=True)
        sys.exit(1)
    
    try:
        # Initialize Figure Maestro and analyze
        maestro = FigureMaestro()
        click.echo("Running quick analysis with Figure Maestro...", err=True)
        
        results = maestro.analyze_contract(text)
        
        # Output results
        formatted_output = maestro.export_analysis(output_format)
        click.echo(formatted_output)
        
    except Exception as e:
        click.echo(f"Error in quick analysis: {str(e)}", err=True)
        sys.exit(1)


@cli.command()
def demo():
    """Run a demonstration of Figure Maestro with sample contract."""
    sample_contract = """
    CONTRACT AGREEMENT
    
    This agreement is between Acme Corporation and Beta Services LLC, effective January 1, 2024.
    
    Terms of service: 12 months with automatic renewal.
    Payment of $50,000 due within 30 days.
    
    Confidentiality: Both parties agree to maintain strict confidentiality of all shared information.
    
    Penalties: Late payment will result in a penalty of 5% per month.
    
    Personal guarantee required from company officers.
    
    Termination: Either party may terminate with 30 days notice.
    """
    
    try:
        maestro = FigureMaestro()
        click.echo("🎼 Figure Maestro Demo - Analyzing Sample Contract", err=True)
        click.echo("=" * 50, err=True)
        
        results = maestro.analyze_contract(sample_contract)
        
        # Show text format output
        formatted_output = maestro.export_analysis("text")
        click.echo(formatted_output)
        
        click.echo("\n" + "=" * 50, err=True)
        click.echo("✅ Demo complete! Figure Maestro successfully analyzed the contract.", err=True)
        
    except Exception as e:
        click.echo(f"Error in demo: {str(e)}", err=True)
        sys.exit(1)


@cli.command()
def version():
    """Show version information."""
    click.echo("AgreeMint Figure Maestro v0.1.0")
    click.echo("AI Contract Checker")


if __name__ == '__main__':
    cli()