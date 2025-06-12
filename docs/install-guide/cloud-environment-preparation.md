# Cloud Environment Preparation

Prepare your cloud environment for Exostellar Platform deployment.

## AWS Environment Setup

### Prerequisites
- AWS CLI configured with appropriate credentials
- kubectl configured for EKS cluster access
- Helm 3.x installed

### Create EKS Cluster
```bash
# Using eksctl (recommended)
eksctl create cluster \
  --name exostellar-cluster \
  --version 1.27 \
  --nodegroup-name standard-workers \
  --node-type t3.large \
  --nodes 3 \
  --nodes-min 1 \
  --nodes-max 10 \
  --managed
```

### Configure IAM Roles
```bash
# Create service account for Exostellar
kubectl create serviceaccount exostellar-sa -n exostellar-system

# Associate IAM role with service account
eksctl create iamserviceaccount \
  --name exostellar-sa \
  --namespace exostellar-system \
  --cluster exostellar-cluster \
  --attach-policy-arn arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy
```

### Install AWS Load Balancer Controller
```bash
# Install AWS Load Balancer Controller
helm repo add eks https://aws.github.io/eks-charts
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=exostellar-cluster
```

## Azure Environment Setup

### Prerequisites
- Azure CLI logged in with subscription access
- kubectl configured for AKS cluster access
- Helm 3.x installed

### Create AKS Cluster
```bash
# Create resource group
az group create --name exostellar-rg --location eastus

# Create AKS cluster
az aks create \
  --resource-group exostellar-rg \
  --name exostellar-cluster \
  --node-count 3 \
  --node-vm-size Standard_D4s_v3 \
  --kubernetes-version 1.27.3 \
  --enable-managed-identity \
  --generate-ssh-keys
```

### Configure Cluster Access
```bash
# Get cluster credentials
az aks get-credentials \
  --resource-group exostellar-rg \
  --name exostellar-cluster

# Verify connection
kubectl get nodes
```

### Install NGINX Ingress Controller
```bash
# Install NGINX Ingress Controller
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace
```

## GCP Environment Setup

### Prerequisites
- gcloud CLI authenticated with project access
- kubectl installed and configured
- Helm 3.x installed

### Create GKE Cluster
```bash
# Set project and zone
export PROJECT_ID=your-project-id
export ZONE=us-central1-a

# Create GKE cluster
gcloud container clusters create exostellar-cluster \
  --zone $ZONE \
  --machine-type n1-standard-4 \
  --num-nodes 3 \
  --enable-autoscaling \
  --min-nodes 1 \
  --max-nodes 10 \
  --enable-network-policy
```

### Configure Cluster Access
```bash
# Get cluster credentials
gcloud container clusters get-credentials exostellar-cluster \
  --zone $ZONE \
  --project $PROJECT_ID

# Verify connection
kubectl cluster-info
```

### Configure Workload Identity
```bash
# Enable Workload Identity
gcloud container clusters update exostellar-cluster \
  --workload-pool=$PROJECT_ID.svc.id.goog \
  --zone $ZONE
```

## Self-Hosted Kubernetes Setup

### Prerequisites
- Existing Kubernetes cluster (1.25+)
- Cluster admin access
- Storage class configured
- Ingress controller installed

### Validate Cluster
```bash
# Check cluster version
kubectl version

# Verify node readiness
kubectl get nodes

# Check storage classes
kubectl get storageclass

# Verify ingress controller
kubectl get pods -n ingress-nginx
```

### Install Required Components
```bash
# Install cert-manager for TLS certificates
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml

# Verify cert-manager installation
kubectl wait --for=condition=ready pod -l app=cert-manager -n cert-manager --timeout=60s
```

## Storage Configuration

### AWS EBS CSI Driver
```bash
# Install EBS CSI Driver
kubectl apply -k "github.com/kubernetes-sigs/aws-ebs-csi-driver/deploy/kubernetes/overlays/stable/?ref=release-1.21"

# Create storage class
cat <<EOF | kubectl apply -f -
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: exostellar-storage
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
  iops: "3000"
  throughput: "125"
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
EOF
```

### Azure Disk CSI Driver
```bash
# Azure Disk CSI is pre-installed in AKS
# Create storage class
cat <<EOF | kubectl apply -f -
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: exostellar-storage
provisioner: disk.csi.azure.com
parameters:
  storageaccounttype: Premium_LRS
  kind: Managed
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
EOF
```

### GCP Persistent Disk CSI Driver
```bash
# GCE PD CSI is pre-installed in GKE
# Create storage class
cat <<EOF | kubectl apply -f -
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: exostellar-storage
provisioner: pd.csi.storage.gke.io
parameters:
  type: pd-ssd
  replication-type: regional-pd
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
EOF
```

## Network Policy Configuration

### Calico Network Policies
```bash
# Install Calico for network policies (if not present)
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.26.1/manifests/calico.yaml

# Verify Calico installation
kubectl get pods -n kube-system -l k8s-app=calico-node
```

## DNS Configuration

### External DNS Setup
```bash
# Install External DNS (AWS Route53 example)
helm repo add external-dns https://kubernetes-sigs.github.io/external-dns/
helm install external-dns external-dns/external-dns \
  --set provider=aws \
  --set aws.zoneType=public \
  --set txtOwnerId=exostellar-cluster
```

## Monitoring Prerequisites

### Install Prometheus Operator
```bash
# Add Prometheus community Helm repository
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install kube-prometheus-stack
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set prometheus.prometheusSpec.retention=30d
```

## Validation Checklist

Before proceeding to platform installation, verify:

- [ ] Kubernetes cluster is running and accessible
- [ ] Storage class is configured and working
- [ ] Ingress controller is installed and ready
- [ ] DNS resolution is working
- [ ] Network policies are supported
- [ ] Monitoring stack is deployed (optional)
- [ ] TLS certificate management is configured

## Next Steps

After completing environment preparation:
1. Begin [Platform Installation](platform/index.md)
2. Follow [Kubernetes Setup](platform/kubernetes-setup.md)
3. Proceed with [Helm Installation](platform/helm-installation.md)
