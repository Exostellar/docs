# Helm Installation

Install Exostellar Platform using Helm package manager.

## Prerequisites

- Kubernetes cluster prepared (see [Kubernetes Setup](kubernetes-setup.md))
- Helm 3.8+ installed
- kubectl configured with cluster access
- Appropriate RBAC permissions

## Helm Repository Setup

### Add Exostellar Repository
```bash
# Add the official Exostellar Helm repository
helm repo add exostellar https://charts.exostellar.com

# Update repository index
helm repo update

# Verify repository
helm repo list | grep exostellar
```

### Search Available Charts
```bash
# List available Exostellar charts
helm search repo exostellar

# Show chart information
helm show chart exostellar/exostellar-platform

# View chart values
helm show values exostellar/exostellar-platform
```

## Configuration

### Download Default Values
```bash
# Download default configuration values
helm show values exostellar/exostellar-platform > exostellar-values.yaml
```

### Basic Configuration
Edit `exostellar-values.yaml` for your environment:

```yaml
# Basic platform configuration
global:
  # Domain for platform access
  domain: "platform.example.com"
  
  # Storage class for persistent volumes
  storageClass: "exostellar-ssd"
  
  # Image registry configuration
  imageRegistry: "registry.exostellar.com"
  
  # TLS configuration
  tls:
    enabled: true
    issuer: "letsencrypt-prod"

# Controller configuration
controller:
  replicas: 3
  resources:
    requests:
      cpu: "500m"
      memory: "1Gi"
    limits:
      cpu: "2"
      memory: "4Gi"

# Database configuration
database:
  type: "postgresql"
  storage: "20Gi"
  backup:
    enabled: true
    schedule: "0 2 * * *"

# Ingress configuration
ingress:
  enabled: true
  className: "nginx"
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
```

### Advanced Configuration
For production environments, consider:

```yaml
# High availability configuration
controller:
  replicas: 3
  affinity:
    podAntiAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchLabels:
            app: exostellar-controller
        topologyKey: kubernetes.io/hostname

# Database high availability
database:
  ha:
    enabled: true
    replicas: 3
  resources:
    requests:
      cpu: "1"
      memory: "2Gi"
    limits:
      cpu: "4"
      memory: "8Gi"

# Monitoring configuration
monitoring:
  enabled: true
  prometheus:
    enabled: true
  grafana:
    enabled: true
    adminPassword: "secure-password"

# Security configuration
security:
  podSecurityStandards:
    enforce: "restricted"
  networkPolicies:
    enabled: true
```

## Installation Process

### Dry Run Installation
```bash
# Perform dry run to validate configuration
helm install exostellar-platform exostellar/exostellar-platform \
  --namespace exostellar-system \
  --values exostellar-values.yaml \
  --dry-run --debug
```

### Install Platform
```bash
# Install Exostellar Platform
helm install exostellar-platform exostellar/exostellar-platform \
  --namespace exostellar-system \
  --values exostellar-values.yaml \
  --wait --timeout=30m

# Verify installation
helm status exostellar-platform -n exostellar-system
```

### Installation with Custom Options
```bash
# Install with custom settings via command line
helm install exostellar-platform exostellar/exostellar-platform \
  --namespace exostellar-system \
  --set global.domain=platform.mycompany.com \
  --set controller.replicas=3 \
  --set database.storage=50Gi \
  --wait --timeout=30m
```

## Post-Installation Verification

### Check Pod Status
```bash
# Verify all pods are running
kubectl get pods -n exostellar-system

# Check pod details
kubectl describe pods -n exostellar-system -l app=exostellar-controller
```

### Verify Services
```bash
# List services
kubectl get services -n exostellar-system

# Check ingress
kubectl get ingress -n exostellar-system

# Test service connectivity
kubectl port-forward -n exostellar-system svc/exostellar-api 8080:80
```

### Check Persistent Volumes
```bash
# List persistent volume claims
kubectl get pvc -n exostellar-system

# Verify volume binding
kubectl describe pvc -n exostellar-system
```

## Configuration Updates

### Update Configuration
```bash
# Modify exostellar-values.yaml with changes

# Upgrade installation
helm upgrade exostellar-platform exostellar/exostellar-platform \
  --namespace exostellar-system \
  --values exostellar-values.yaml \
  --wait --timeout=20m
```

### Rolling Updates
```bash
# Force rolling update of deployments
kubectl rollout restart deployment/exostellar-controller -n exostellar-system

# Check rollout status
kubectl rollout status deployment/exostellar-controller -n exostellar-system
```

## Backup and Recovery

### Create Backup
```bash
# Backup Helm values and secrets
kubectl get secret -n exostellar-system -o yaml > exostellar-secrets-backup.yaml

# Export Helm configuration
helm get values exostellar-platform -n exostellar-system > exostellar-values-backup.yaml
```

### Database Backup
```bash
# Create database backup (if using built-in PostgreSQL)
kubectl exec -n exostellar-system deployment/exostellar-database -- \
  pg_dump -U exostellar exostellar > database-backup.sql
```

## Monitoring and Observability

### Enable Monitoring
```yaml
# Add to exostellar-values.yaml
monitoring:
  enabled: true
  serviceMonitor:
    enabled: true
    interval: 30s
  prometheusRule:
    enabled: true
```

### Custom Dashboards
```bash
# Import Grafana dashboards
kubectl create configmap exostellar-dashboards \
  --from-file=dashboards/ \
  -n exostellar-system
```

## Troubleshooting

### Common Installation Issues

#### Chart Not Found
```bash
# Update repository index
helm repo update

# Verify repository
helm repo list
helm search repo exostellar
```

#### Resource Constraints
```bash
# Check cluster resources
kubectl top nodes
kubectl describe nodes

# Review resource requests in values file
helm show values exostellar/exostellar-platform | grep -A 5 resources
```

#### Database Connection Issues
```bash
# Check database pod logs
kubectl logs -n exostellar-system -l app=exostellar-database

# Verify database service
kubectl get svc -n exostellar-system -l app=exostellar-database

# Test database connectivity
kubectl exec -n exostellar-system deployment/exostellar-controller -- \
  nc -z exostellar-database 5432
```

#### TLS Certificate Problems
```bash
# Check cert-manager status
kubectl get pods -n cert-manager

# Verify certificate issuers
kubectl get clusterissuer

# Check certificate status
kubectl get certificates -n exostellar-system
kubectl describe certificate -n exostellar-system
```

### Diagnostic Commands
```bash
# Get Helm release history
helm history exostellar-platform -n exostellar-system

# Check Helm values
helm get values exostellar-platform -n exostellar-system

# View generated manifests
helm get manifest exostellar-platform -n exostellar-system

# Check release status
helm status exostellar-platform -n exostellar-system
```

### Recovery Procedures

#### Rollback Installation
```bash
# List release history
helm history exostellar-platform -n exostellar-system

# Rollback to previous version
helm rollback exostellar-platform 1 -n exostellar-system
```

#### Reinstall Platform
```bash
# Uninstall platform (preserves PVCs)
helm uninstall exostellar-platform -n exostellar-system

# Wait for cleanup
kubectl wait --for=delete pods -l app=exostellar-controller -n exostellar-system --timeout=300s

# Reinstall platform
helm install exostellar-platform exostellar/exostellar-platform \
  --namespace exostellar-system \
  --values exostellar-values.yaml \
  --wait --timeout=30m
```

## Security Considerations

### Image Security
```yaml
# Configure image pull secrets
imagePullSecrets:
  - name: exostellar-registry-secret

# Enable image scanning
security:
  imageSecurity:
    scanEnabled: true
    allowUnsigned: false
```

### Network Security
```yaml
# Enable network policies
networkPolicies:
  enabled: true
  ingressRules:
    - from:
      - namespaceSelector:
          matchLabels:
            name: exostellar-ingress
  egressRules:
    - to: []
      ports:
      - protocol: TCP
        port: 443
```

## Performance Tuning

### Resource Optimization
```yaml
# Optimize resource allocation
controller:
  resources:
    requests:
      cpu: "1"
      memory: "2Gi"
    limits:
      cpu: "4"
      memory: "8Gi"
  
  # JVM tuning for Java applications
  javaOpts: "-Xms2g -Xmx6g -XX:+UseG1GC"
```

### Database Performance
```yaml
database:
  postgresql:
    postgresql.conf:
      shared_buffers: "256MB"
      effective_cache_size: "1GB"
      max_connections: "200"
```

## Next Steps

After successful Helm installation:
1. Configure [Storage Configuration](storage-configuration.md)
2. Complete [Platform Deployment](platform-deployment.md)
3. Set up [DNS Configuration](../configuration/dns-setup.md)
4. Configure [Billing Integration](../configuration/billing-integration.md)
