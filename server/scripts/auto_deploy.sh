#!/bin/bash

# Change directory to the desired location
cd ~/Circuit-Breaker/Breaker/ZK-Gas/noir-app/circuits

# Run "cargo check"
echo "Running 'nargo check'..."
nargo check

# Run "cargo prove"
echo "Running 'nargo prove'..."
nargo prove

