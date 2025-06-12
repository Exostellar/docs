# Storage Configuration

Configure persistent storage for Exostellar Platform components and workspaces.

## Storage Overview

Exostellar Platform requires several types of storage:

- **Database Storage**: PostgreSQL data and backups
- **Workspace Storage**: User workspace persistent volumes
- **Registry Storage**: Container image registry data
- **Log Storage**: Application and audit logs
- **Backup Storage**: Platform backups and snapshots

## Storage Classes

### Verify Available Storage Classes
```bash
# List available storage classes
kubectl get storageclass

# Check default storage class
kubectl get storageclass -o jsonpath='{.items[?(@.metadata.annotations.storageclass\.kubernetes\.io/is-default-class=="true")].metadata.name}'
```

### Create Exostellar Storage Classes

#### High-Performance SSD Storage
```yaml
# exostellar-ssd.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: exostellar-ssd
  annotations:
    storageclass.kubernetes.io/is-default-class: "false"
provisioner: ebs.csi.aws.com  # Adjust for your cloud provider
parameters:
  type: gp3
  iops: "3000"
  throughput: "125"
  encrypted: "true"
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Delete
```

#### Standard Storage
```yaml
# exostellar-standard.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: exostellar-standard
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
  encrypted: "true"
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Delete
```

#### Backup Storage
```yaml
# exostellar-backup.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: exostellar-backup
provisioner: ebs.csi.aws.com
parameters:
  type: sc1  # Cold HDD for cost-effective backups
  encrypted: "true"
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Retain
```

### Apply Storage Classes
```bash
# Apply storage class configurations
kubectl apply -f exostellar-ssd.yaml
kubectl apply -f exostellar-standard.yaml
kubectl apply -f exostellar-backup.yaml

# Verify creation
kubectl get storageclass | grep exostellar
```

## Database Storage Configuration

### PostgreSQL Persistent Volume
```yaml
# database-pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: exostellar-database
  namespace: exostellar-system
  labels:
    app: exostellar-database
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: exostellar-ssd
  resources:
    requests:
      storage: 50Gi
```

### Database Backup Storage
```yaml
# database-backup-pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: exostellar-database-backup
  namespace: exostellar-system
  labels:
    app: exostellar-database-backup
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: exostellar-backup
  resources:
    requests:
      storage: 100Gi
```

## Workspace Storage Configuration

### Workspace Volume Templates
```yaml
# workspace-volume-template.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: workspace-volume-template
  namespace: exostellar-system
data:
  pvc-template.yaml: |
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: "workspace-{{ .WorkspaceID }}"
      namespace: exostellar-workspaces
      labels:
        app: exostellar-workspace
        workspace-id: "{{ .WorkspaceID }}"
        user-id: "{{ .UserID }}"
    spec:
      accessModes:
        - ReadWriteOnce
      storageClassName: exostellar-standard
      resources:
        requests:
          storage: "{{ .StorageSize | default "10Gi" }}"
```

### Shared Storage for Workspaces
```yaml
# shared-workspace-storage.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: shared-workspace-storage
  namespace: exostellar-workspaces
spec:
  accessModes:
    - ReadWriteMany
  storageClassName: efs-sc  # Use appropriate shared storage class
  resources:
    requests:
      storage: 100Gi
```

## Registry Storage Configuration

### Container Registry Storage
```yaml
# registry-pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: exostellar-registry
  namespace: exostellar-system
  labels:
    app: exostellar-registry
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: exostellar-standard
  resources:
    requests:
      storage: 200Gi
```

## Monitoring Storage Configuration

### Prometheus Storage
```yaml
# prometheus-pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: prometheus-storage
  namespace: exostellar-monitoring
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: exostellar-ssd
  resources:
    requests:
      storage: 100Gi
```

### Grafana Storage
```yaml
# grafana-pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: grafana-storage
  namespace: exostellar-monitoring
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: exostellar-standard
  resources:
    requests:
      storage: 10Gi
```

## Cloud Provider Specific Configuration

### AWS EBS Configuration
```yaml
# aws-ebs-storageclass.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: exostellar-aws-ssd
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
  iops: "4000"
  throughput: "250"
  encrypted: "true"
  kmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/12345678-1234-1234-1234-123456789012"
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Delete
```

### Azure Disk Configuration
```yaml
# azure-disk-storageclass.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: exostellar-azure-ssd
provisioner: disk.csi.azure.com
parameters:
  storageaccounttype: Premium_LRS
  kind: Managed
  diskEncryptionSetID: "/subscriptions/{sub-id}/resourceGroups/{rg}/providers/Microsoft.Compute/diskEncryptionSets/{des-name}"
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Delete
```

### GCP Persistent Disk Configuration
```yaml
# gcp-pd-storageclass.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: exostellar-gcp-ssd
provisioner: pd.csi.storage.gke.io
parameters:
  type: pd-ssd
  replication-type: regional-pd
  encryption-key: "projects/{project-id}/locations/{location}/keyRings/{ring-name}/cryptoKeys/{key-name}"
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Delete
```

## Storage Optimization

### Performance Tuning
```yaml
# high-performance-storageclass.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: exostellar-high-perf
provisioner: ebs.csi.aws.com
parameters:
  type: io2
  iops: "10000"
  throughput: "1000"
  encrypted: "true"
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Delete
```

### Cost Optimization
```yaml
# cost-optimized-storageclass.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: exostellar-cost-optimized
provisioner: ebs.csi.aws.com
parameters:
  type: st1  # Throughput Optimized HDD
  encrypted: "true"
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Delete
```

## Backup and Snapshot Configuration

### Snapshot Classes
```yaml
# snapshot-class.yaml
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: exostellar-snapshot-class
driver: ebs.csi.aws.com
deletionPolicy: Delete
parameters:
  encrypted: "true"
```

### Backup Policies
```yaml
# backup-policy.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: backup-policy
  namespace: exostellar-system
data:
  policy.yaml: |
    schedule:
      database: "0 2 * * *"      # Daily at 2 AM
      workspaces: "0 3 * * 0"    # Weekly on Sunday at 3 AM
      registry: "0 4 * * 0"      # Weekly on Sunday at 4 AM
    retention:
      daily: 7
      weekly: 4
      monthly: 12
    encryption:
      enabled: true
      kmsKey: "exostellar-backup-key"
```

## Storage Monitoring

### Storage Metrics
```yaml
# storage-monitoring.yaml
apiVersion: v1
kind: ServiceMonitor
metadata:
  name: storage-metrics
  namespace: exostellar-system
spec:
  selector:
    matchLabels:
      app: csi-driver
  endpoints:
  - port: metrics
    interval: 30s
    path: /metrics
```

### Disk Usage Alerts
```yaml
# storage-alerts.yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: storage-alerts
  namespace: exostellar-system
spec:
  groups:
  - name: storage
    rules:
    - alert: DiskSpaceUsageHigh
      expr: (node_filesystem_size_bytes - node_filesystem_free_bytes) / node_filesystem_size_bytes > 0.85
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: "Disk space usage is high"
        description: "Disk space usage is above 85% on {{ $labels.instance }}"
```

## Validation and Testing

### Test Storage Performance
```bash
# Create test pod with PVC
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: storage-test
  namespace: default
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: exostellar-ssd
  resources:
    requests:
      storage: 10Gi
---
apiVersion: v1
kind: Pod
metadata:
  name: storage-test
  namespace: default
spec:
  containers:
  - name: test
    image: busybox
    command: ["sleep", "3600"]
    volumeMounts:
    - name: test-volume
      mountPath: /data
  volumes:
  - name: test-volume
    persistentVolumeClaim:
      claimName: storage-test
EOF
```

### Performance Testing
```bash
# Test write performance
kubectl exec storage-test -- dd if=/dev/zero of=/data/testfile bs=1M count=1000

# Test read performance
kubectl exec storage-test -- dd if=/data/testfile of=/dev/null bs=1M

# Clean up test resources
kubectl delete pod storage-test
kubectl delete pvc storage-test
```

### Verify Volume Expansion
```bash
# Expand PVC
kubectl patch pvc storage-test -p '{"spec":{"resources":{"requests":{"storage":"20Gi"}}}}'

# Check expansion status
kubectl get pvc storage-test -w
```

## Troubleshooting

### Common Storage Issues

#### PVC Stuck in Pending
```bash
# Check PVC status
kubectl describe pvc <pvc-name> -n <namespace>

# Check storage class
kubectl describe storageclass <storage-class-name>

# Verify CSI driver
kubectl get pods -n kube-system | grep csi
```

#### Volume Mount Failures
```bash
# Check pod events
kubectl describe pod <pod-name> -n <namespace>

# Check node capacity
kubectl describe node <node-name>

# Verify volume attachment
kubectl get volumeattachment
```

#### Performance Issues
```bash
# Check IOPS limits
kubectl get storageclass <storage-class> -o yaml

# Monitor disk metrics
kubectl top nodes

# Check for throttling
kubectl logs -n kube-system <csi-driver-pod>
```

## Next Steps

After configuring storage:
1. Proceed with [Platform Deployment](platform-deployment.md)
2. Configure [DNS Setup](../configuration/dns-setup.md)
3. Set up monitoring and alerting
4. Test backup and recovery procedures
