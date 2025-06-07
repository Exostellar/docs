---
title: Troubleshooting
description: Common installation and configuration issues
---

# Troubleshooting

Solutions for common installation and configuration issues.

## Installation Issues

### Helm Installation Fails

```bash
# Check Helm version
helm version

# Verify cluster connection
kubectl cluster-info

# Check for existing installations
helm list -A
```

### GPU Detection Issues

```bash
# Verify GPU drivers
kubectl describe nodes | grep -A 5 "Allocated resources"

# Check device plugin logs
kubectl logs -n kube-system -l name=nvidia-device-plugin-daemonset
```

## Runtime Issues

### Pods Stuck in Pending

```bash
# Check resource availability
kubectl describe pod <pod-name>

# Verify node resources
kubectl top nodes
```

### Performance Issues

1. Check GPU utilization
2. Verify resource limits
3. Review scheduling policies

## Log Collection

```bash
# Exostellar system logs
kubectl logs -n exostellar-system -l app=exostellar

# GPU metrics
kubectl logs -n exostellar-system -l app=gpu-metrics
```

## Getting Help

- [Submit a support ticket](/support/submit-feedback)
- Check [known issues](/support/known-issues)
- Review [FAQ](/support/faq)
