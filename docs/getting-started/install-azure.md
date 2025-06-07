---
title: Azure Installation
description: Deploy Exostellar on Azure Kubernetes Service (AKS)
---

# Azure Installation

Deploy Exostellar on Azure Kubernetes Service with GPU-enabled node pools.

## Prerequisites

- Azure CLI installed and configured
- kubectl installed

## Create AKS Cluster

```bash
az aks create \
  --resource-group exostellar-rg \
  --name exostellar-cluster \
  --node-count 1 \
  --enable-addons monitoring \
  --generate-ssh-keys
```

## Add GPU Node Pool

```bash
az aks nodepool add \
  --resource-group exostellar-rg \
  --cluster-name exostellar-cluster \
  --name gpunodepool \
  --node-count 2 \
  --node-vm-size Standard_NC6s_v3 \
  --node-taints sku=gpu:NoSchedule
```

## Install GPU Drivers

```bash
kubectl apply -f https://raw.githubusercontent.com/Azure/aks-engine/master/examples/addons/nvidia-device-plugin/nvidia-device-plugin.yaml
```

## Deploy Exostellar

```bash
helm install exostellar exostellar/exostellar \
  --namespace exostellar-system \
  --create-namespace \
  --set cloud.provider=azure \
  --set gpu.driver=nvidia
```
