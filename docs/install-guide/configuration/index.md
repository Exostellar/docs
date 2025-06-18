# Configuration

Configure Exostellar Platform settings and integrations after successful installation.

## Configuration Overview

Post-installation configuration includes:

1. **[Billing Integration](billing-integration.md)** - Set up billing and cost management
2. **[DNS Setup](dns-setup.md)** - Configure domain name resolution and routing

## Prerequisites

Before starting configuration:
- Platform deployment completed successfully
- Administrative access to the platform
- Required external service credentials available

## Configuration Categories

### Core Platform Settings
- Platform identity and branding
- Authentication and authorization
- Resource quotas and limits
- Security policies

### External Integrations
- Cloud provider billing APIs
- DNS management services
- Identity providers (OAuth/SSO)
- Monitoring and alerting systems

### Operational Settings
- Backup and recovery policies
- Audit logging configuration
- Performance optimization
- Maintenance schedules

## Basic Configuration

### Platform Identity
```bash
# Configure platform identity
kubectl create configmap platform-identity \
  --from-literal=name="Exostellar Platform" \
  --from-literal=description="Container Orchestration Platform" \
  --from-literal=version="1.0.0" \
  --from-literal=organization="Your Organization" \
  -n exostellar-system
```

### Global Settings
```bash
# Apply global configuration
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: global-config
  namespace: exostellar-system
data:
  config.yaml: |
    platform:
      name: "Exostellar Platform"
      url: "https://platform.example.com"
      timezone: "UTC"
      locale: "en-US"
    
    features:
      workspaces: true
      monitoring: true
      backups: true
      multitenancy: true
    
    defaults:
      workspace:
        timeout: "8h"
        idleTimeout: "1h"
        resources:
          cpu: "2"
          memory: "4Gi"
          storage: "20Gi"
      
      project:
        quotas:
          workspaces: 10
          storage: "500Gi"
          compute: "50 cores"
EOF
```

## Security Configuration

### Authentication Settings
```bash
# Configure authentication
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: auth-config
  namespace: exostellar-system
data:
  auth.yaml: |
    authentication:
      providers:
        local:
          enabled: true
          passwordPolicy:
            minLength: 8
            requireUppercase: true
            requireLowercase: true
            requireNumbers: true
            requireSymbols: false
        
        oauth:
          enabled: false
          providers: []
    
    session:
      timeout: 3600
      renewalThreshold: 300
    
    authorization:
      rbac:
        enabled: true
      defaultRole: "user"
EOF
```

### Network Security
```bash
# Configure network security policies
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: network-security-config
  namespace: exostellar-system
data:
  security.yaml: |
    networkPolicies:
      enabled: true
      defaultDeny: true
      
    firewallRules:
      ingress:
        - port: 80
          protocol: TCP
          source: "0.0.0.0/0"
        - port: 443
          protocol: TCP
          source: "0.0.0.0/0"
      
      egress:
        - port: 443
          protocol: TCP
          destination: "0.0.0.0/0"
        - port: 53
          protocol: UDP
          destination: "0.0.0.0/0"
    
    tls:
      minVersion: "1.2"
      cipherSuites:
        - "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
        - "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
EOF
```

## Resource Management

### Default Quotas
```bash
# Configure default resource quotas
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: resource-quotas
  namespace: exostellar-system
data:
  quotas.yaml: |
    department:
      default:
        storage: "1Ti"
        compute: "100 cores"
        memory: "500Gi"
        workspaces: 50
    
    project:
      default:
        storage: "100Gi"
        compute: "20 cores"
        memory: "100Gi"
        workspaces: 10
    
    workspace:
      default:
        cpu: "2"
        memory: "4Gi"
        storage: "20Gi"
        timeout: "8h"
      
      limits:
        maxCpu: "16"
        maxMemory: "64Gi"
        maxStorage: "500Gi"
EOF
```

### Performance Settings
```bash
# Configure performance settings
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: performance-config
  namespace: exostellar-system
data:
  performance.yaml: |
    scheduler:
      enabled: true
      strategy: "balanced"
      nodeSelector: true
      
    autoscaling:
      enabled: true
      minReplicas: 1
      maxReplicas: 10
      targetCPU: 70
      targetMemory: 80
    
    caching:
      enabled: true
      ttl: 300
      maxSize: "1Gi"
    
    database:
      poolSize: 20
      maxConnections: 100
      queryTimeout: 30
EOF
```

## Monitoring Configuration

### Metrics Collection
```bash
# Configure metrics collection
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: monitoring-config
  namespace: exostellar-system
data:
  monitoring.yaml: |
    metrics:
      enabled: true
      interval: 30
      retention: "30d"
      
    alerts:
      enabled: true
      channels:
        - type: "email"
          address: "admin@example.com"
        - type: "slack"
          webhook: "https://hooks.slack.com/services/..."
    
    dashboards:
      enabled: true
      customDashboards: []
    
    logging:
      level: "info"
      retention: "7d"
      aggregation: true
EOF
```

## Backup Configuration

### Backup Policies
```bash
# Configure backup policies
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: backup-config
  namespace: exostellar-system
data:
  backup.yaml: |
    schedule:
      database:
        full: "0 2 * * 0"    # Weekly full backup
        incremental: "0 2 * * 1-6"  # Daily incremental
      
      workspaces:
        enabled: true
        schedule: "0 3 * * *"  # Daily workspace backup
        retention: "30d"
      
      configuration:
        enabled: true
        schedule: "0 1 * * *"  # Daily config backup
        retention: "90d"
    
    storage:
      location: "s3://exostellar-backups"
      encryption: true
      compression: true
    
    retention:
      daily: 7
      weekly: 4
      monthly: 12
      yearly: 3
EOF
```

## Maintenance Configuration

### Maintenance Windows
```bash
# Configure maintenance windows
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: maintenance-config
  namespace: exostellar-system
data:
  maintenance.yaml: |
    windows:
      - name: "weekly-maintenance"
        schedule: "0 2 * * 0"  # Sunday 2 AM
        duration: "2h"
        timezone: "UTC"
        notifications:
          advance: "24h"
          reminder: "1h"
    
    tasks:
      - name: "system-updates"
        enabled: true
        schedule: "monthly"
      
      - name: "database-maintenance"
        enabled: true
        schedule: "weekly"
      
      - name: "cleanup-old-workspaces"
        enabled: true
        schedule: "daily"
        retention: "30d"
    
    notifications:
      channels:
        - type: "email"
          recipients: ["admin@example.com"]
        - type: "platform"
          broadcast: true
EOF
```

## Validation

### Configuration Testing
```bash
# Test configuration changes
kubectl get configmap -n exostellar-system

# Verify configuration syntax
kubectl exec -n exostellar-system deployment/exostellar-controller -- \
  exostellar-cli config validate

# Check configuration changes
kubectl logs -n exostellar-system deployment/exostellar-controller | \
  grep "configuration"
```

### Health Checks
```bash
# Run platform health check
kubectl exec -n exostellar-system deployment/exostellar-controller -- \
  exostellar-cli health check

# Test external integrations
kubectl exec -n exostellar-system deployment/exostellar-controller -- \
  exostellar-cli integration test --all
```

## Configuration Management

### Version Control
```bash
# Export current configuration
kubectl get configmap -n exostellar-system -o yaml > platform-config-backup.yaml

# Create configuration snapshot
kubectl create configmap config-snapshot-$(date +%Y%m%d) \
  --from-file=platform-config-backup.yaml \
  -n exostellar-system
```

### Configuration Updates
```bash
# Update configuration
kubectl apply -f updated-config.yaml

# Restart affected services
kubectl rollout restart deployment/exostellar-controller -n exostellar-system

# Verify configuration reload
kubectl logs -n exostellar-system deployment/exostellar-controller | \
  grep "configuration reloaded"
```

## Troubleshooting

### Configuration Issues
```bash
# Check configuration syntax
kubectl describe configmap global-config -n exostellar-system

# Validate configuration
kubectl exec -n exostellar-system deployment/exostellar-controller -- \
  exostellar-cli config validate --verbose

# Check configuration errors
kubectl logs -n exostellar-system deployment/exostellar-controller | \
  grep -i "config\|error"
```

### Recovery
```bash
# Restore previous configuration
kubectl apply -f config-backup.yaml

# Reset to defaults
kubectl delete configmap global-config -n exostellar-system
kubectl apply -f default-config.yaml
```

## Next Steps

After completing basic configuration:
1. Set up [Billing Integration](billing-integration.md)
2. Configure [DNS Setup](dns-setup.md)
3. Review [Admin Guide](../../admin-guide/index.md)
4. Configure [Identity Providers](../../admin-guide/identity-providers/index.md)
5. Set up monitoring and alerting
6. Test backup and recovery procedures

## Support

For configuration assistance:
- Review [Troubleshooting Guide](../../troubleshooting.md)
- Check [Known Issues](../../known-issues.md)
- Contact [Support](../../support.md)
