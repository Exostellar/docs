---
title: Fractional GPU Configuration
description: Configure and manage fractional GPU allocations
---

# Fractional GPU Configuration

Configure fractional GPU allocations to maximize resource utilization and reduce costs.

## Configuration

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: gpu-flex-config
data:
  fractional-gpu.yaml: |
    fractions:
      - name: small
        memory: 2Gi
        compute: 0.25
      - name: medium
        memory: 8Gi
        compute: 0.5
      - name: large
        memory: 16Gi
        compute: 1.0
```

## Using Fractional GPUs

```yaml
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: training-job
    resources:
      requests:
        exostellar.io/gpu-fraction: small
      limits:
        exostellar.io/gpu-fraction: small
```

## Best Practices

- Start with smaller fractions for development
- Monitor actual usage before increasing allocations
- Use right-sizing recommendations
