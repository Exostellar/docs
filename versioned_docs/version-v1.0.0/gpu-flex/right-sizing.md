---
title: Right-sizing
description: Automatic resource optimization based on workload patterns
---

# Right-sizing

Automatically optimize resource allocations based on actual workload usage patterns.

## How Right-sizing Works

1. **Monitoring**: Continuous tracking of resource usage
2. **Analysis**: Pattern recognition and optimization opportunities
3. **Recommendations**: Suggested resource adjustments
4. **Auto-scaling**: Automatic resource adjustments (optional)

## Configuration

```yaml
rightSizing:
  enabled: true
  mode: recommend  # recommend | auto
  analysisWindow: 7d
  thresholds:
    memoryUtilization: 80%
    computeUtilization: 70%
```

## Viewing Recommendations

```bash
kubectl get rightsizing -n exostellar-system
```
