# Platform Installation

Install the core Exostellar Platform components on your prepared Kubernetes cluster.

## Installation Overview

The platform installation consists of four main phases:

1. **[Kubernetes Setup](kubernetes-setup.md)** - Configure Kubernetes-specific components
2. **[Helm Installation](helm-installation.md)** - Install platform using Helm charts
3. **[Storage Configuration](storage-configuration.md)** - Configure persistent storage
4. **[Platform Deployment](platform-deployment.md)** - Deploy and verify platform components

## Prerequisites

Before beginning installation, ensure you have completed:
- [Infrastructure Setup](../infrastructure-setup.md)
- [System Requirements](../system-requirements.md) verification
- [Cloud Environment Preparation](../cloud-environment-preparation.md)

## Installation Methods

### Standard Installation (Recommended)
Use Helm charts for streamlined deployment with sensible defaults.

### Custom Installation
Manual deployment with custom configurations for specific requirements.

### Air-Gapped Installation
For environments without internet access (contact support for offline packages).

## Pre-Installation Checklist

Verify these components before starting:

- [ ] Kubernetes cluster is accessible (`kubectl cluster-info`)
- [ ] Helm 3.x is installed (`helm version`)
- [ ] Storage class is available (`kubectl get storageclass`)
- [ ] Ingress controller is running
- [ ] DNS is configured
- [ ] Required namespaces can be created

## Installation Architecture

The platform consists of these core components:

### Control Plane Components
- **Exostellar Controller**: Main orchestration service
- **API Gateway**: Request routing and authentication
- **Database**: Platform state and configuration storage
- **Message Queue**: Asynchronous communication

### Data Plane Components
- **Workspace Manager**: Container lifecycle management
- **Storage Manager**: Persistent volume operations
- **Network Manager**: Service networking and policies
- **Monitoring Agent**: Metrics and observability

### Supporting Services
- **Identity Provider**: Authentication and authorization
- **Certificate Manager**: TLS certificate automation
- **Backup Service**: Data protection and recovery
- **Log Aggregator**: Centralized logging

## Resource Requirements

### Minimum Resources (Development)
- **CPU**: 4 cores total
- **Memory**: 8GB RAM total
- **Storage**: 50GB persistent storage
- **Nodes**: 3 worker nodes

### Recommended Resources (Production)
- **CPU**: 12+ cores total
- **Memory**: 32GB+ RAM total
- **Storage**: 200GB+ persistent storage
- **Nodes**: 5+ worker nodes

### High Availability Resources
- **CPU**: 24+ cores across availability zones
- **Memory**: 64GB+ RAM distributed
- **Storage**: 500GB+ with replication
- **Nodes**: 9+ nodes across 3+ zones

## Installation Process

### Step 1: Prepare Installation Environment
```bash
# Create namespace
kubectl create namespace exostellar-system

# Verify namespace
kubectl get namespace exostellar-system
```

### Step 2: Add Helm Repository
```bash
# Add Exostellar Helm repository
helm repo add exostellar https://charts.exostellar.com
helm repo update
```

### Step 3: Configure Installation Values
```bash
# Download default values
helm show values exostellar/exostellar-platform > values.yaml

# Edit values.yaml for your environment
# See platform-deployment.md for configuration details
```

### Step 4: Install Platform
```bash
# Install Exostellar Platform
helm install exostellar-platform exostellar/exostellar-platform \
  --namespace exostellar-system \
  --values values.yaml \
  --wait --timeout=20m
```

### Step 5: Verify Installation
```bash
# Check pod status
kubectl get pods -n exostellar-system

# Verify services
kubectl get services -n exostellar-system

# Check ingress
kubectl get ingress -n exostellar-system
```

## Configuration Options

### Basic Configuration
- Domain name and TLS certificates
- Storage class selection
- Resource limits and requests
- Ingress configuration

### Advanced Configuration
- High availability settings
- Custom authentication providers
- Network policies
- Monitoring and alerting

### Security Configuration
- RBAC policies
- Pod security standards
- Network segmentation
- Secret management

## Troubleshooting Installation

### Common Issues
- **Pod startup failures**: Check resource constraints and node capacity
- **Storage issues**: Verify storage class and persistent volume claims
- **Network connectivity**: Validate ingress and DNS configuration
- **Permission errors**: Review RBAC settings and service accounts

### Diagnostic Commands
```bash
# Check platform status
kubectl get pods -n exostellar-system -o wide

# Review recent events
kubectl get events -n exostellar-system --sort-by='.lastTimestamp'

# Check platform logs
kubectl logs -n exostellar-system -l app=exostellar-controller
```

## Post-Installation Steps

After successful installation:

1. **Configure DNS**: Set up domain name resolution
2. **Install TLS Certificates**: Configure HTTPS access
3. **Set up Authentication**: Configure identity providers
4. **Create Initial Users**: Set up administrative access
5. **Configure Monitoring**: Enable observability features

## Next Steps

1. Complete [Storage Configuration](storage-configuration.md)
2. Proceed with [Platform Deployment](platform-deployment.md)
3. Configure [DNS Setup](../configuration/dns-setup.md)
4. Set up [Billing Integration](../configuration/billing-integration.md)

## Support

For installation assistance:
- Review [Troubleshooting Guide](../../troubleshooting.md)
- Check [Known Issues](../../known-issues.md)
- Contact [Support](../../support.md)
