# System Requirements

Ensure your environment meets these requirements before installing Exostellar Platform.

## Kubernetes Cluster Requirements

### Supported Versions
- **Kubernetes**: 1.25+ (recommended: 1.27+)
- **kubectl**: Compatible with cluster version
- **Helm**: 3.8+ (required for installation)

### Cluster Specifications

#### Minimum Requirements (Development/Testing)
- **Nodes**: 3 worker nodes
- **CPU**: 2 cores per node (6 cores total)
- **Memory**: 8GB RAM per node (24GB total)
- **Storage**: 50GB per node

#### Recommended Requirements (Production)
- **Nodes**: 5+ worker nodes
- **CPU**: 4+ cores per node
- **Memory**: 16GB+ RAM per node
- **Storage**: 100GB+ per node

#### High Availability Requirements
- **Nodes**: 7+ worker nodes across 3+ availability zones
- **CPU**: 8+ cores per node
- **Memory**: 32GB+ RAM per node
- **Storage**: 200GB+ per node

## Hardware Requirements

### CPU Architecture
- **Supported**: x86_64 (AMD64)
- **ARM Support**: Limited (contact support)

### Storage Requirements
- **Type**: SSD recommended for performance
- **IOPS**: 3000+ IOPS for database workloads
- **Throughput**: 125+ MB/s sustained

### Network Requirements
- **Bandwidth**: 1Gbps+ between nodes
- **Latency**: <10ms between nodes in same region
- **Internet**: Outbound HTTPS (443) access required

## Software Dependencies

### Container Runtime
- **Supported**:
  - containerd 1.6+
  - Docker 20.10+ (deprecated)
  - CRI-O 1.25+

### CNI (Container Network Interface)
- **Supported**:
  - Calico
  - Flannel
  - Weave Net
  - AWS VPC CNI
  - Azure CNI

### CSI (Container Storage Interface)
- **AWS**: EBS CSI Driver
- **Azure**: Azure Disk CSI Driver
- **GCP**: Compute Engine Persistent Disk CSI Driver
- **Generic**: Local Path Provisioner (development only)

## Cloud Provider Requirements

### Amazon Web Services (AWS)
- **EKS Version**: 1.25+
- **Instance Types**: t3.large or larger
- **Regions**: All commercial regions supported
- **IAM Permissions**: EC2, EKS, EBS, ELB, Route53

### Microsoft Azure
- **AKS Version**: 1.25+
- **VM Sizes**: Standard_D4s_v3 or larger
- **Regions**: All commercial regions supported
- **Permissions**: Contributor access to resource group

### Google Cloud Platform (GCP)
- **GKE Version**: 1.25+
- **Machine Types**: n1-standard-4 or larger
- **Regions**: All commercial regions supported
- **IAM Roles**: GKE Cluster Admin, Compute Admin

## Network Requirements

### Ingress Requirements
- **Load Balancer**: Layer 4 or Layer 7
- **SSL/TLS**: Valid certificates required for production
- **Domain**: Dedicated domain or subdomain

### Firewall Rules
| Protocol | Port | Source | Description |
|----------|------|--------|-------------|
| HTTPS | 443 | Internet | Web interface access |
| HTTP | 80 | Internet | Redirect to HTTPS |
| TCP | 6443 | Admin networks | Kubernetes API |
| TCP | 2379-2380 | Cluster nodes | etcd communication |
| TCP | 10250 | Cluster nodes | Kubelet API |

### DNS Requirements
- **External DNS**: Public domain resolution
- **Internal DNS**: Cluster DNS (CoreDNS)
- **Wildcard Support**: *.your-domain.com

## Operating System Support

### Kubernetes Nodes
- **Ubuntu**: 20.04 LTS, 22.04 LTS
- **CentOS**: 7, 8
- **RHEL**: 7, 8, 9
- **Amazon Linux**: 2
- **Container-Optimized OS**: Google COS

### Client Requirements
- **kubectl**: Local installation required
- **Helm**: Version 3.8+ required
- **Docker**: Optional for container building

## Browser Support

### Supported Browsers
- **Chrome**: 90+ (recommended)
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### JavaScript Requirements
- **ES6 Support**: Required
- **WebSocket**: Required for real-time features
- **Local Storage**: Required for session management

## Performance Considerations

### Database Requirements
- **Storage**: High-performance SSD storage
- **Memory**: Dedicated memory allocation
- **CPU**: Multi-core processors recommended

### Monitoring Overhead
- **CPU**: Additional 10-15% overhead
- **Memory**: 2-4GB for monitoring stack
- **Storage**: 50GB+ for metrics retention

## Validation Script

Use this script to validate your environment:

```bash
#!/bin/bash
# Exostellar Platform Requirements Check

echo "Checking Kubernetes cluster..."
kubectl version --short

echo "Checking cluster nodes..."
kubectl get nodes

echo "Checking storage classes..."
kubectl get storageclass

echo "Checking Helm installation..."
helm version

echo "Requirements check complete."
```

## Next Steps

After verifying requirements:
1. Proceed with [Cloud Environment Preparation](cloud-environment-preparation.md)
2. Continue to [Platform Installation](platform/index.md)
