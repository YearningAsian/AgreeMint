"""
Setup configuration for AgreeMint Figure Maestro
"""

from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

with open("requirements.txt", "r", encoding="utf-8") as fh:
    requirements = [line.strip() for line in fh if line.strip() and not line.startswith("#")]

setup(
    name="agreemint",
    version="0.1.0",
    author="Colin",
    description="AI Contract Checker with Figure Maestro",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/YearningAsian/AgreeMint",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Legal",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
    ],
    python_requires=">=3.7",
    install_requires=requirements,
    entry_points={
        "console_scripts": [
            "agreemint=cli:cli",
        ],
    },
    keywords="contract analysis ai legal document review",
    project_urls={
        "Bug Reports": "https://github.com/YearningAsian/AgreeMint/issues",
        "Source": "https://github.com/YearningAsian/AgreeMint",
    },
)