---
title: GCP Installation
description: Deploy Exostellar on Google Kubernetes Engine (GKE)
---

# GCP Installation

Deploy Exostellar on Google Kubernetes Engine with GPU accelerators.

## Prerequisites

- gcloud CLI installed and configured
- kubectl installed

## Create GKE Cluster

```bash
gcloud container clusters create exostellar-cluster \
  --zone us-central1-a \
  --machine-type n1-standard-4 \
  --num-nodes 1 \
  --enable-autorepair \
  --enable-autoupgrade
```

## Add GPU Node Pool

```bash
gcloud container node-pools create gpu-pool \
  --cluster exostellar-cluster \
  --zone us-central1-a \
  --machine-type n1-standard-4 \
  --accelerator type=nvidia-tesla-k80,count=1 \
  --num-nodes 2 \
  --node-taints nvidia.com/gpu=present:NoSchedule
```

## Install GPU Drivers

```bash
kubectl apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/container-engine-accelerators/master/nvidia-driver-installer/cos/daemonset-preloaded.yaml
```

## Deploy Exostellar

```bash
helm install exostellar exostellar/exostellar \
  --namespace exostellar-system \
  --create-namespace \
  --set cloud.provider=gcp \
  --set gpu.driver=nvidia
```
