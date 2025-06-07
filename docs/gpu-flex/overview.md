---
title: GPU Flex Overview
description: Intelligent GPU fractionalization and resource optimization
---

# GPU Flex Overview

GPU Flex enables intelligent fractionalization of GPU resources, allowing multiple workloads to share GPU memory and compute efficiently.

## Key Features

- **Fractional GPU Allocation**: Split GPUs into smaller, right-sized chunks
- **Memory-Compute Decoupling**: Separate memory and compute phases for optimal utilization
- **Dynamic Right-sizing**: Automatic resource adjustment based on workload needs
- **Performance Benchmarking**: Built-in performance analysis and optimization

## How It Works

GPU Flex uses advanced virtualization and scheduling techniques to:

1. Monitor workload resource usage patterns
2. Dynamically allocate GPU fractions based on actual needs
3. Optimize memory and compute phases separately
4. Provide isolation between co-located workloads

## Benefits

- **Cost Reduction**: Up to 70% reduction in GPU costs
- **Improved Utilization**: Achieve 90%+ GPU utilization
- **Faster Iteration**: Smaller resource allocations enable faster experimentation
- **Multi-tenancy**: Safe isolation for shared infrastructure

## Use Cases

- **Development & Testing**: Smaller GPU fractions for development workloads
- **Inference Serving**: Right-sized allocations for production inference
- **Training Optimization**: Efficient resource sharing for training jobs
- **Research & Experimentation**: Cost-effective resource access for researchers

## Getting Started

1. [Configure Fractional GPU](/gpu-flex/fractional-gpu)
2. [Optimize Memory-Compute Phases](/gpu-flex/memory-compute-phases)
3. [Set up Right-sizing](/gpu-flex/right-sizing)
4. [Review Benchmarks](/gpu-flex/benchmarks)
