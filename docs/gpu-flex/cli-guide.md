---
title: CLI Guide
description: Command-line interface for GPU Flex management
---

# CLI Guide

Use the Exostellar CLI to manage GPU Flex configurations and monitor performance.

## Installation

```bash
curl -sSL https://get.exostellar.io | bash
```

## Commands

### View GPU Allocations

```bash
exo gpu list
exo gpu describe <gpu-id>
```

### Manage Fractions

```bash
exo fraction create --name small --memory 2Gi --compute 0.25
exo fraction list
exo fraction delete small
```

### Monitor Usage

```bash
exo metrics gpu
exo metrics workload <workload-name>
```

### Right-sizing

```bash
exo rightsizing recommendations
exo rightsizing apply <recommendation-id>
```
