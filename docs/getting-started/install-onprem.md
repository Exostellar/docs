---
title: On-Premises Installation
description: Deploy Exostellar on your own Kubernetes infrastructure
---

# On-Premises Installation

Deploy Exostellar on your existing Kubernetes infrastructure.

## Prerequisites

- Kubernetes cluster (v1.24+)
- GPU nodes with NVIDIA drivers installed
- Helm 3.x installed

## Prepare GPU Nodes

```bash
# Label GPU nodes
kubectl label nodes <gpu-node-name> exostellar.io/gpu=true

# Verify GPU resources
kubectl describe node <gpu-node-name> | grep nvidia.com/gpu
```

## Deploy NVIDIA Device Plugin

```bash
kubectl apply -f https://raw.githubusercontent.com/NVIDIA/k8s-device-plugin/v0.14.1/nvidia-device-plugin.yml
```

## Install Exostellar

```bash
helm install exostellar exostellar/exostellar \
  --namespace exostellar-system \
  --create-namespace \
  --set cloud.provider=onprem \
  --set gpu.driver=nvidia
```

## Configure Storage

```bash
# Example for local storage
kubectl apply -f - <<EOF
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: exostellar-storage
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer
EOF
```

## Network Configuration

Ensure your cluster network allows:
- Pod-to-pod communication across nodes
- Access to external registries (if needed)
- LoadBalancer or NodePort services (for UI access)
