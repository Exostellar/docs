# Troubleshooting

This guide helps you diagnose and resolve common issues with Exostellar Platform.

## Installation Troubleshooting

### Prerequisites Check
Before troubleshooting, verify:
- System requirements are met
- Network connectivity is established
- Required permissions are granted

### Common Installation Issues

#### Helm Installation Failures
```bash
# Check Helm version
helm version

# Verify cluster connectivity
kubectl cluster-info

# Check namespace status
kubectl get namespace exostellar-system
```

#### Storage Configuration Problems
- Verify storage class availability
- Check persistent volume claims
- Ensure proper RBAC permissions

## Runtime Troubleshooting

### Workspace Issues

#### Workspace Won't Start
1. Check workspace status: `kubectl get pods -n exostellar-workspaces`
2. Review workspace logs: `kubectl logs -n exostellar-workspaces <pod-name>`
3. Verify resource availability: `kubectl describe node`

#### Connection Problems
- Verify network policies
- Check ingress configuration
- Validate DNS resolution

### Performance Issues

#### Slow Response Times
1. Check resource utilization
2. Review application logs
3. Monitor network latency
4. Verify storage performance

### Monitoring & Observability

#### Missing Metrics
- Verify monitoring stack deployment
- Check Prometheus targets
- Validate metric collection agents

#### Dashboard Not Loading
- Clear browser cache
- Check network connectivity
- Verify authentication status

## Log Collection

### Platform Logs
```bash
# Core platform logs
kubectl logs -n exostellar-system -l app=exostellar-controller

# Workspace logs
kubectl logs -n exostellar-workspaces -l workspace=<workspace-name>
```

### Application Logs
```bash
# Application-specific logs
kubectl logs -n <namespace> <pod-name>

# Follow logs in real-time
kubectl logs -f -n <namespace> <pod-name>
```

## Getting Help

If you cannot resolve the issue:
1. Collect relevant logs and error messages
2. Document steps to reproduce the problem
3. Contact [Support](support.md) with detailed information
