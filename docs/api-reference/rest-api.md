---
title: REST API
description: Complete REST API reference for Exostellar
---

# REST API Reference

Complete reference for the Exostellar REST API v1.

## Authentication

```bash
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
  https://api.exostellar.io/v1/clusters
```

## Endpoints

### Clusters

#### List Clusters
```http
GET /v1/clusters
```

#### Get Cluster
```http
GET /v1/clusters/{cluster-id}
```

#### Create Cluster
```http
POST /v1/clusters
Content-Type: application/json

{
  "name": "production",
  "kubeconfig": "base64-encoded-kubeconfig"
}
```

### GPU Resources

#### List GPU Fractions
```http
GET /v1/gpu/fractions
```

#### Create GPU Fraction
```http
POST /v1/gpu/fractions
Content-Type: application/json

{
  "name": "small",
  "memory": "2Gi",
  "compute": 0.25
}
```

### Workloads

#### Submit Job
```http
POST /v1/jobs
Content-Type: application/json

{
  "name": "training-job",
  "image": "pytorch/pytorch:latest",
  "resources": {
    "gpu-fraction": "small"
  }
}
```

## SDKs

- [Python SDK](/api-reference/sdk-usage)
- [Go SDK](/api-reference/sdk-usage)
- [Node.js SDK](/api-reference/sdk-usage)
