#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

echo """
yarn:
  yarn build:build    # Build.
  yarn build:clean    # Clean all.
  yarn build:dist     # Create a distribution in the _ui folder.
  yarn build:help     # Echo help.
  yarn build:install  # Install dependencies.
  yarn build:scss     # Generate the CSS.
  yarn start          # Start development server (auto reload)."""
