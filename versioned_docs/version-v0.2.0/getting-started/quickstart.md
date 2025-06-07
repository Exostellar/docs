---
title: Quickstart Guide
description: Get up and running with Exostellar in 5 minutes
---

# Quickstart Guide

Deploy Exostellar and start optimizing your GPU workloads in under 5 minutes.

## Prerequisites

- Kubernetes cluster (v1.24+)
- kubectl configured
- Helm 3.x installed

## Installation

```bash
# Add Exostellar Helm repository
helm repo add exostellar https://charts.exostellar.io
helm repo update

# Install Exostellar
helm install exostellar exostellar/exostellar \
  --namespace exostellar-system \
  --create-namespace
```

## Verify Installation

```bash
kubectl get pods -n exostellar-system
```

## Next Steps

- [Install on AWS](/getting-started/install-aws)
- [Configure GPU Flex](/gpu-flex/fractional-gpu)
- [Set up monitoring](/observability/gpu-utilization-metrics)
