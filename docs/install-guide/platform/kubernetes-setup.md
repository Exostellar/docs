# Kubernetes Setup

Configure Kubernetes-specific components required for Exostellar Platform.

## Namespace Configuration

### Create System Namespace
```bash
# Create main system namespace
kubectl create namespace exostellar-system

# Label namespace for monitoring
kubectl label namespace exostellar-system name=exostellar-system

# Create workspaces namespace
kubectl create namespace exostellar-workspaces

# Label workspaces namespace
kubectl label namespace exostellar-workspaces name=exostellar-workspaces
```

### Create Additional Namespaces
```bash
# Create monitoring namespace (if not exists)
kubectl create namespace exostellar-monitoring --dry-run=client -o yaml | kubectl apply -f -

# Create ingress namespace (if not exists)
kubectl create namespace exostellar-ingress --dry-run=client -o yaml | kubectl apply -f -
```

## RBAC Configuration

### Create Service Accounts
```bash
# Create platform service account
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: exostellar-platform
  namespace: exostellar-system
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: exostellar-workspace-manager
  namespace: exostellar-workspaces
EOF
```

### Create Cluster Roles
```bash
# Platform cluster role
cat <<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: exostellar-platform
rules:
- apiGroups: [""]
  resources: ["nodes", "namespaces", "pods", "services", "endpoints", "persistentvolumes", "persistentvolumeclaims"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
- apiGroups: ["apps"]
  resources: ["deployments", "statefulsets", "daemonsets"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
- apiGroups: ["networking.k8s.io"]
  resources: ["ingresses", "networkpolicies"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
- apiGroups: ["storage.k8s.io"]
  resources: ["storageclasses", "volumeattachments"]
  verbs: ["get", "list", "watch"]
- apiGroups: ["rbac.authorization.k8s.io"]
  resources: ["roles", "rolebindings", "clusterroles", "clusterrolebindings"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
EOF
```

### Create Role Bindings
```bash
# Bind platform cluster role
cat <<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: exostellar-platform
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: exostellar-platform
subjects:
- kind: ServiceAccount
  name: exostellar-platform
  namespace: exostellar-system
EOF
```

## Custom Resource Definitions (CRDs)

### Install Platform CRDs
```bash
# Download and install Exostellar CRDs
curl -L https://releases.exostellar.com/crds/latest/exostellar-crds.yaml | kubectl apply -f -

# Verify CRD installation
kubectl get crd | grep exostellar
```

### Expected CRDs
The following Custom Resource Definitions will be installed:
- `workspaces.exostellar.io` - Workspace management
- `projects.exostellar.io` - Project configuration
- `volumes.exostellar.io` - Volume management
- `nodegroups.exostellar.io` - Node group configuration
- `departments.exostellar.io` - Department management

## Network Policies

### Create Base Network Policies
```bash
# Platform namespace network policy
cat <<EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: exostellar-platform-netpol
  namespace: exostellar-system
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: exostellar-ingress
    - namespaceSelector:
        matchLabels:
          name: exostellar-monitoring
    - namespaceSelector:
        matchLabels:
          name: exostellar-workspaces
  egress:
  - {} # Allow all egress
EOF
```

### Workspace Network Policies
```bash
# Workspace isolation policy
cat <<EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: workspace-isolation
  namespace: exostellar-workspaces
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: exostellar-system
    - namespaceSelector:
        matchLabels:
          name: exostellar-ingress
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: exostellar-system
  - to: [] # Allow egress to internet
    ports:
    - protocol: TCP
      port: 443
    - protocol: TCP
      port: 80
    - protocol: UDP
      port: 53
EOF
```

## Pod Security Standards

### Configure Pod Security Policies
```bash
# Apply pod security standards to namespaces
kubectl label namespace exostellar-system pod-security.kubernetes.io/enforce=restricted
kubectl label namespace exostellar-system pod-security.kubernetes.io/audit=restricted
kubectl label namespace exostellar-system pod-security.kubernetes.io/warn=restricted

kubectl label namespace exostellar-workspaces pod-security.kubernetes.io/enforce=baseline
kubectl label namespace exostellar-workspaces pod-security.kubernetes.io/audit=baseline
kubectl label namespace exostellar-workspaces pod-security.kubernetes.io/warn=baseline
```

## Resource Quotas

### System Namespace Quotas
```bash
# Platform resource quota
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ResourceQuota
metadata:
  name: exostellar-system-quota
  namespace: exostellar-system
spec:
  hard:
    requests.cpu: "8"
    requests.memory: 16Gi
    limits.cpu: "16"
    limits.memory: 32Gi
    persistentvolumeclaims: "10"
    requests.storage: 100Gi
EOF
```

### Workspace Namespace Quotas
```bash
# Workspace resource quota (adjustable)
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ResourceQuota
metadata:
  name: exostellar-workspaces-quota
  namespace: exostellar-workspaces
spec:
  hard:
    requests.cpu: "100"
    requests.memory: 200Gi
    limits.cpu: "200"
    limits.memory: 400Gi
    persistentvolumeclaims: "50"
    requests.storage: 1Ti
    pods: "100"
EOF
```

## Priority Classes

### Create Priority Classes
```bash
# System critical priority class
cat <<EOF | kubectl apply -f -
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: exostellar-system-critical
value: 2000000000
globalDefault: false
description: "Priority class for Exostellar system components"
---
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: exostellar-workspace-high
value: 1000000000
globalDefault: false
description: "High priority class for workspace components"
---
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: exostellar-workspace-normal
value: 1000000
globalDefault: false
description: "Normal priority class for workspace components"
EOF
```

## Node Labeling

### Label Nodes for Scheduling
```bash
# Label nodes for system components (example)
kubectl label nodes node-1 exostellar.io/node-type=system
kubectl label nodes node-2 exostellar.io/node-type=system
kubectl label nodes node-3 exostellar.io/node-type=workspace

# Label nodes by zone (if not already labeled)
kubectl label nodes node-1 topology.kubernetes.io/zone=zone-a
kubectl label nodes node-2 topology.kubernetes.io/zone=zone-b
kubectl label nodes node-3 topology.kubernetes.io/zone=zone-c
```

## Storage Class Configuration

### Verify Storage Classes
```bash
# List available storage classes
kubectl get storageclass

# Check default storage class
kubectl get storageclass -o jsonpath='{.items[?(@.metadata.annotations.storageclass\.kubernetes\.io/is-default-class=="true")].metadata.name}'
```

### Create Exostellar Storage Classes (if needed)
```bash
# High-performance storage class
cat <<EOF | kubectl apply -f -
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: exostellar-ssd
  annotations:
    storageclass.kubernetes.io/is-default-class: "false"
provisioner: kubernetes.io/aws-ebs  # Adjust for your cloud provider
parameters:
  type: gp3
  iops: "3000"
  throughput: "125"
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Delete
EOF
```

## Monitoring Setup

### Create Monitoring ServiceMonitor
```bash
# ServiceMonitor for platform metrics
cat <<EOF | kubectl apply -f -
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: exostellar-platform
  namespace: exostellar-system
  labels:
    app: exostellar-platform
spec:
  selector:
    matchLabels:
      app: exostellar-controller
  endpoints:
  - port: metrics
    interval: 30s
    path: /metrics
EOF
```

## Validation

### Verify Kubernetes Setup
```bash
# Check namespaces
kubectl get namespaces | grep exostellar

# Verify RBAC
kubectl auth can-i "*" "*" --as=system:serviceaccount:exostellar-system:exostellar-platform

# Check CRDs
kubectl get crd | grep exostellar

# Verify network policies
kubectl get networkpolicy -A

# Check resource quotas
kubectl get resourcequota -A

# Verify priority classes
kubectl get priorityclass | grep exostellar
```

### Test Resource Creation
```bash
# Test pod creation in system namespace
kubectl run test-pod --image=nginx --restart=Never -n exostellar-system --dry-run=client -o yaml

# Test PVC creation
kubectl create -f - <<EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: test-pvc
  namespace: exostellar-system
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
EOF

# Clean up test resources
kubectl delete pvc test-pvc -n exostellar-system
```

## Troubleshooting

### Common Issues
- **RBAC permission errors**: Verify service account and role bindings
- **Network policy blocking**: Check ingress/egress rules
- **Resource quota exceeded**: Review and adjust quotas
- **CRD installation failures**: Check API server access and permissions

### Diagnostic Commands
```bash
# Check RBAC for service account
kubectl auth can-i --list --as=system:serviceaccount:exostellar-system:exostellar-platform

# Review network policies
kubectl describe networkpolicy -n exostellar-system

# Check resource usage against quotas
kubectl describe resourcequota -n exostellar-system
```

## Next Steps

After completing Kubernetes setup:
1. Proceed with [Helm Installation](helm-installation.md)
2. Configure [Storage Configuration](storage-configuration.md)
3. Complete [Platform Deployment](platform-deployment.md)
