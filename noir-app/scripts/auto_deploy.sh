#!/bin/bash

# Change directory to the desired location
cd ~/Circuit-Breaker/ZK-Gas/noir-app/circuits

# Run "cargo check"
echo "Running 'cargo check'..."
cargo check

# Run "cargo prove"
echo "Running 'cargo prove'..."
cargo prove

# Run "cargo codegen-verifier"
echo "Running 'cargo codegen-verifier'..."
cargo codegen-verifier
