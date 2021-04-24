"""myst-parser package setup."""
from importlib import import_module

from setuptools import find_packages, setup

setup(
    name="jupyter_auth_docs",
    version='0.0.1',
    description=(
        "Jupyter Auth"
    ),
    url="https://github.com/datalayer/jupyter_auth",
    project_urls={"Documentation": "https://jupyter-auth.readthedocs.io"},
    license="MIT",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.3",
        "Programming Language :: Python :: 3.4",
        "Programming Language :: Python :: 3.5",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: Implementation :: CPython",
        "Programming Language :: Python :: Implementation :: PyPy",
    ],
    keywords="datalayer,jupyter,auth",
    python_requires=">=3.6",
    install_requires=[
    ],
    extras_require={
        "sphinx": [],
        "code_style": [
            "flake8<3.8.0,>=3.7.0", 
            "black", 
            "pre-commit==1.17.0"
        ],
        "testing": [
            "coverage",
            "pytest>=3.6,<4",
            "pytest-cov",
            "pytest-regressions",
            "beautifulsoup4",
        ],
        # Note: This is only required for internal use
        "rtd": [
            "myst_nb",
            "pyyaml",
            "docutils>=0.15",
            "sphinx",
            "sphinx-autobuild",
            "sphinxcontrib-bibtex",
            "sphinxcontrib-mermaid",
            "ipython",
            "sphinx-book-theme",
            "sphinx_tabs"
        ],
    },
    zip_safe=True,
)
