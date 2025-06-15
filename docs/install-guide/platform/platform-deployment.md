# Platform Deployment

Complete the Exostellar Platform deployment and verify all components are operational.

## Pre-Deployment Checklist

Ensure completion of previous steps:
- [ ] [Kubernetes Setup](kubernetes-setup.md) completed
- [ ] [Helm Installation](helm-installation.md) completed  
- [ ] [Storage Configuration](storage-configuration.md) completed
- [ ] DNS records configured
- [ ] TLS certificates available

## Deployment Verification

### Check Platform Status
```bash
# Verify all pods are running
kubectl get pods -n exostellar-system

# Check service status
kubectl get svc -n exostellar-system

# Verify ingress configuration
kubectl get ingress -n exostellar-system
```

### Platform Health Check
```bash
# Check platform health endpoint
kubectl port-forward -n exostellar-system svc/exostellar-api 8080:80 &
curl http://localhost:8080/health

# Check database connectivity
kubectl exec -n exostellar-system deployment/exostellar-controller -- \
  nc -z exostellar-database 5432 && echo "Database connection successful"
```

## Initial Configuration

### Create Admin User
```bash
# Create initial admin user
kubectl exec -n exostellar-system deployment/exostellar-controller -- \
  exostellar-cli user create \
  --username admin \
  --email admin@example.com \
  --role platform-admin \
  --password-stdin <<< "secure-admin-password"
```

### Configure Platform Settings
```bash
# Set platform configuration
kubectl create configmap platform-config \
  --from-literal=platform-name="Exostellar Platform" \
  --from-literal=platform-url="https://platform.example.com" \
  --from-literal=support-email="support@example.com" \
  -n exostellar-system
```

## Component Verification

### API Gateway
```bash
# Test API Gateway health
curl -k https://platform.example.com/api/v1/health

# Verify authentication endpoint
curl -k https://platform.example.com/api/v1/auth/info
```

### Database
```bash
# Check database connection
kubectl exec -n exostellar-system deployment/exostellar-database -- \
  psql -U exostellar -d exostellar -c "SELECT version();"

# Verify database schema
kubectl exec -n exostellar-system deployment/exostellar-database -- \
  psql -U exostellar -d exostellar -c "\dt"
```

### Controller
```bash
# Check controller logs
kubectl logs -n exostellar-system deployment/exostellar-controller --tail=50

# Verify controller metrics
kubectl port-forward -n exostellar-system svc/exostellar-controller 9090:9090 &
curl http://localhost:9090/metrics | grep exostellar
```

### Workspace Manager
```bash
# Check workspace manager status
kubectl get pods -n exostellar-workspaces -l app=workspace-manager

# Verify workspace CRDs
kubectl get crd | grep workspace
```

## Security Configuration

### Enable TLS
```bash
# Verify TLS certificates
kubectl get certificates -n exostellar-system

# Check certificate status
kubectl describe certificate platform-tls -n exostellar-system
```

### Configure Authentication
```bash
# Apply authentication configuration
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: auth-config
  namespace: exostellar-system
data:
  auth.yaml: |
    providers:
      local:
        enabled: true
      oauth:
        enabled: false
        providers: []
    session:
      timeout: 3600
      renewalThreshold: 300
    password:
      minLength: 8
      requireUppercase: true
      requireLowercase: true
      requireNumbers: true
      requireSymbols: false
EOF
```

### Network Policies
```bash
# Apply production network policies
kubectl apply -f - <<EOF
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: exostellar-production-netpol
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
    ports:
    - protocol: TCP
      port: 8080
  - from:
    - namespaceSelector:
        matchLabels:
          name: exostellar-monitoring
    ports:
    - protocol: TCP
      port: 9090
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: kube-system
    ports:
    - protocol: TCP
      port: 53
    - protocol: UDP
      port: 53
  - to: []
    ports:
    - protocol: TCP
      port: 443
EOF
```

## Monitoring Setup

### Enable Platform Monitoring
```bash
# Create monitoring configuration
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: monitoring-config
  namespace: exostellar-system
data:
  prometheus.yml: |
    global:
      scrape_interval: 30s
    scrape_configs:
    - job_name: 'exostellar-platform'
      kubernetes_sd_configs:
      - role: pod
        namespaces:
          names:
          - exostellar-system
      relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
EOF
```

### Configure Alerting
```bash
# Create alerting rules
cat <<EOF | kubectl apply -f -
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: exostellar-alerts
  namespace: exostellar-system
spec:
  groups:
  - name: exostellar.rules
    rules:
    - alert: ExostellarControllerDown
      expr: up{job="exostellar-controller"} == 0
      for: 5m
      labels:
        severity: critical
      annotations:
        summary: "Exostellar Controller is down"
        description: "Exostellar Controller has been down for more than 5 minutes"
    
    - alert: DatabaseConnectionFailed
      expr: exostellar_database_connection_failures_total > 0
      for: 2m
      labels:
        severity: warning
      annotations:
        summary: "Database connection failures detected"
        description: "Database connection failures: {{ $value }}"
EOF
```

## Load Testing

### Basic Load Test
```bash
# Create load test pod
kubectl run load-test --image=busybox --rm -it --restart=Never -- \
  /bin/sh -c "
  for i in \$(seq 1 100); do
    wget -q -O- https://platform.example.com/api/v1/health && echo ' - Request \$i successful' || echo ' - Request \$i failed'
    sleep 1
  done
  "
```

### Performance Baseline
```bash
# Run performance test
kubectl apply -f - <<EOF
apiVersion: batch/v1
kind: Job
metadata:
  name: performance-test
  namespace: exostellar-system
spec:
  template:
    spec:
      containers:
      - name: perf-test
        image: alpine/curl
        command:
        - /bin/sh
        - -c
        - |
          echo "Running performance baseline test..."
          for i in \$(seq 1 1000); do
            start=\$(date +%s%N)
            curl -s -k https://platform.example.com/api/v1/health > /dev/null
            end=\$(date +%s%N)
            duration=\$(( (end - start) / 1000000 ))
            echo "Request \$i: \${duration}ms"
          done
      restartPolicy: Never
EOF
```

## Backup Configuration

### Enable Automated Backups
```bash
# Create backup configuration
cat <<EOF | kubectl apply -f -
apiVersion: batch/v1
kind: CronJob
metadata:
  name: platform-backup
  namespace: exostellar-system
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: postgres:15
            command:
            - /bin/bash
            - -c
            - |
              pg_dump -h exostellar-database -U exostellar exostellar | \
              gzip > /backup/exostellar-\$(date +%Y%m%d-%H%M%S).sql.gz
            env:
            - name: PGPASSWORD
              valueFrom:
                secretKeyRef:
                  name: exostellar-database-secret
                  key: password
            volumeMounts:
            - name: backup-storage
              mountPath: /backup
          volumes:
          - name: backup-storage
            persistentVolumeClaim:
              claimName: exostellar-database-backup
          restartPolicy: OnFailure
EOF
```

## High Availability Setup

### Configure Multi-Zone Deployment
```bash
# Update deployment for HA
kubectl patch deployment exostellar-controller -n exostellar-system -p '
{
  "spec": {
    "replicas": 3,
    "template": {
      "spec": {
        "affinity": {
          "podAntiAffinity": {
            "requiredDuringSchedulingIgnoredDuringExecution": [
              {
                "labelSelector": {
                  "matchLabels": {
                    "app": "exostellar-controller"
                  }
                },
                "topologyKey": "topology.kubernetes.io/zone"
              }
            ]
          }
        }
      }
    }
  }
}'
```

### Database High Availability
```bash
# Configure database replication (if using PostgreSQL HA)
kubectl apply -f - <<EOF
apiVersion: postgresql.cnpg.io/v1
kind: Cluster
metadata:
  name: exostellar-database-ha
  namespace: exostellar-system
spec:
  instances: 3
  primaryUpdateStrategy: unsupervised
  
  postgresql:
    parameters:
      max_parallel_workers: "8"
      max_parallel_workers_per_gather: "2"
      max_worker_processes: "8"
      shared_preload_libraries: "pg_stat_statements"
  
  bootstrap:
    initdb:
      database: exostellar
      owner: exostellar
      secret:
        name: exostellar-database-secret
  
  storage:
    size: 50Gi
    storageClass: exostellar-ssd
EOF
```

## Post-Deployment Tasks

### Create Sample Resources
```bash
# Create sample department
kubectl apply -f - <<EOF
apiVersion: exostellar.io/v1
kind: Department
metadata:
  name: engineering
  namespace: exostellar-system
spec:
  displayName: "Engineering Department"
  description: "Software Engineering Team"
  quotas:
    storage: "1Ti"
    compute: "100 cores"
    memory: "500Gi"
  nodeGroups:
  - name: "standard-nodes"
EOF
```

### Configure Default Policies
```bash
# Apply default workspace policies
kubectl apply -f - <<EOF
apiVersion: v1
kind: ConfigMap
metadata:
  name: default-workspace-policies
  namespace: exostellar-system
data:
  policies.yaml: |
    default:
      resources:
        cpu: "2"
        memory: "4Gi"
        storage: "20Gi"
      timeout: "8h"
      idleTimeout: "1h"
    limits:
      maxCpu: "16"
      maxMemory: "64Gi"
      maxStorage: "500Gi"
      maxWorkspaces: 10
EOF
```

## Validation Tests

### End-to-End Test
```bash
# Run comprehensive platform test
kubectl apply -f - <<EOF
apiVersion: batch/v1
kind: Job
metadata:
  name: e2e-test
  namespace: exostellar-system
spec:
  template:
    spec:
      containers:
      - name: e2e-test
        image: exostellar/e2e-test:latest
        env:
        - name: PLATFORM_URL
          value: "https://platform.example.com"
        - name: ADMIN_USERNAME
          value: "admin"
        - name: ADMIN_PASSWORD
          valueFrom:
            secretKeyRef:
              name: admin-credentials
              key: password
        command:
        - /bin/bash
        - -c
        - |
          echo "Running end-to-end tests..."
          
          # Test API accessibility
          curl -f \$PLATFORM_URL/api/v1/health
          
          # Test authentication
          TOKEN=\$(curl -X POST \$PLATFORM_URL/api/v1/auth/login \
            -d "username=\$ADMIN_USERNAME&password=\$ADMIN_PASSWORD" | \
            jq -r '.token')
          
          # Test workspace creation
          curl -X POST \$PLATFORM_URL/api/v1/workspaces \
            -H "Authorization: Bearer \$TOKEN" \
            -d '{"name":"test-workspace","image":"ubuntu:20.04"}'
          
          echo "End-to-end tests completed successfully"
      restartPolicy: Never
EOF
```

### Performance Verification
```bash
# Check resource utilization
kubectl top pods -n exostellar-system

# Monitor response times
kubectl logs -n exostellar-system deployment/exostellar-controller | \
  grep "response_time" | tail -20
```

## Troubleshooting

### Common Deployment Issues

#### Pod Startup Failures
```bash
# Check pod status and events
kubectl describe pod -n exostellar-system -l app=exostellar-controller

# Review logs
kubectl logs -n exostellar-system deployment/exostellar-controller --previous
```

#### Service Discovery Issues
```bash
# Check service endpoints
kubectl get endpoints -n exostellar-system

# Test service connectivity
kubectl run debug --image=busybox --rm -it --restart=Never -- \
  nslookup exostellar-api.exostellar-system.svc.cluster.local
```

#### TLS Certificate Problems
```bash
# Check certificate status
kubectl describe certificate -n exostellar-system

# Review cert-manager logs
kubectl logs -n cert-manager deployment/cert-manager
```

### Recovery Procedures

#### Database Recovery
```bash
# Restore from backup
kubectl exec -n exostellar-system deployment/exostellar-database -- \
  psql -U exostellar -d exostellar < /backup/latest-backup.sql
```

#### Configuration Reset
```bash
# Reset to default configuration
helm upgrade exostellar-platform exostellar/exostellar-platform \
  --namespace exostellar-system \
  --reset-values \
  --values default-values.yaml
```

## Next Steps

After successful deployment:
1. Configure [DNS Setup](../configuration/dns-setup.md)
2. Set up [Billing Integration](../configuration/billing-integration.md)
3. Review [User Guide](../../user-guide/index.md)
4. Configure [Identity Providers](../../admin-guide/identity-providers/index.md)
5. Set up monitoring dashboards
6. Plan backup and disaster recovery procedures

## Support

For deployment assistance:
- Check [Troubleshooting Guide](../../troubleshooting.md)
- Review [Known Issues](../../known-issues.md)
- Contact [Support](../../support.md)
