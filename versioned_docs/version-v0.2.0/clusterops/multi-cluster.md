---
title: Multi-cluster Setup
description: Configure and manage multiple Kubernetes clusters
---

# Multi-cluster Setup

Configure ClusterOps to manage workloads across multiple Kubernetes clusters.

## Adding Clusters

```bash
exo cluster add \
  --name production \
  --kubeconfig /path/to/prod-kubeconfig \
  --region us-west-2

exo cluster add \
  --name staging \
  --kubeconfig /path/to/staging-kubeconfig \
  --region us-east-1
```

## Cluster Configuration

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cluster-config
data:
  clusters.yaml: |
    clusters:
      - name: production
        weight: 80
        capabilities:
          - gpu
          - high-memory
      - name: staging
        weight: 20
        capabilities:
          - cpu
          - testing
```
