---
title: AWS Installation
description: Deploy Exostellar on Amazon EKS
---

# AWS Installation

Deploy Exostellar on Amazon EKS with GPU node groups.

## Prerequisites

- AWS CLI configured
- eksctl installed
- kubectl installed

## Create EKS Cluster

```bash
eksctl create cluster \
  --name exostellar-cluster \
  --region us-west-2 \
  --node-groups-taints exostellar.io/gpu=true:NoSchedule \
  --nodegroup-name gpu-nodes \
  --instance-types g4dn.xlarge \
  --nodes 2 \
  --nodes-min 1 \
  --nodes-max 4
```

## Install GPU Drivers

```bash
kubectl apply -f https://raw.githubusercontent.com/NVIDIA/k8s-device-plugin/v0.14.1/nvidia-device-plugin.yml
```

## Deploy Exostellar

```bash
helm install exostellar exostellar/exostellar \
  --namespace exostellar-system \
  --create-namespace \
  --set cloud.provider=aws \
  --set gpu.driver=nvidia
```

## Verify GPU Detection

```bash
kubectl describe nodes | grep nvidia.com/gpu
```
