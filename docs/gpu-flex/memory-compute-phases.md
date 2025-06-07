---
title: Memory-Compute Phases
description: Optimize GPU workloads by separating memory and compute phases
---

# Memory-Compute Phases

Optimize GPU utilization by intelligently managing memory and compute phases.

## Phase Separation

GPU Flex automatically detects and optimizes:
- **Memory-intensive phases**: Data loading, preprocessing
- **Compute-intensive phases**: Model training, inference

## Configuration

```yaml
phaseOptimization:
  enabled: true
  memoryPhase:
    maxMemory: 24Gi
    minCompute: 0.1
  computePhase:
    maxCompute: 1.0
    minMemory: 4Gi
```

## Benefits

- 40% better resource utilization
- Reduced memory waste during compute phases
- Lower costs through optimized scheduling
