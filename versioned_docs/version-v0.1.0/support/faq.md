---
title: Frequently Asked Questions
description: Common questions about Exostellar
---

# FAQ

Common questions and answers about Exostellar.

## General

### What is Exostellar?

Exostellar is an intelligent GPU orchestration platform that enables fractional GPU allocation and multi-cluster resource management for AI workloads.

### How much can I save with GPU Flex?

Most customers see 60-70% cost reduction through better GPU utilization and right-sizing.

### Which cloud providers are supported?

- Amazon Web Services (EKS)
- Microsoft Azure (AKS)
- Google Cloud Platform (GKE)
- On-premises Kubernetes clusters

## Technical

### What Kubernetes versions are supported?

Kubernetes 1.24 and higher are officially supported.

### Does Exostellar support AMD GPUs?

Currently, only NVIDIA GPUs are supported. AMD GPU support is planned for a future release.

### How does fractional GPU allocation work?

GPU Flex uses advanced virtualization to split GPU memory and compute resources, allowing multiple workloads to share a single GPU safely.

## Troubleshooting

### Installation fails on AWS EKS

Check that your node groups have the correct taints and that GPU drivers are installed. See our [troubleshooting guide](/getting-started/troubleshooting).

### GPU utilization metrics not showing

Ensure the metrics server is running and GPU device plugins are properly configured.

## Pricing

### Is there a free tier?

Yes, Exostellar offers a free tier for development and testing with up to 2 GPU fractions.

### How is usage calculated?

Usage is calculated based on GPU-hours consumed by your workloads, with fractional allocations counted proportionally.
