# Uninstall Instructions

![Uninstall Process](https://cdn.prod.website-files.com/682f16fda0a63d2b81f9abbc/683c2ab57feb6e9564226e13_a26769c87f18c242862efbf056d70883_built-1.svg)

Complete guide for safely removing the Exostellar platform from your infrastructure.

## Overview

This guide provides step-by-step instructions for completely removing the Exostellar platform while preserving important data and configurations as needed.

## Pre-Uninstall Checklist

Before beginning the uninstall process:

- [ ] **Backup Critical Data** - Export important workspaces and project data
- [ ] **Terminate Active Workloads** - Stop all running computational tasks
- [ ] **Export Configuration** - Save configuration files for future reference
- [ ] **Notify Users** - Inform all platform users of the planned removal
- [ ] **Document Dependencies** - List any external systems that depend on Exostellar

## Data Backup

### Export Workspace Data

Backup workspace configurations and data:

```bash
# Export all workspace configurations
exostellar workspace export --all --output-dir /backup/workspaces

# Backup persistent volumes
exostellar volume backup --all --destination /backup/volumes

# Export project configurations
exostellar project export --all --output-file /backup/projects.json
```

### Export User and Permission Data

Preserve user access configurations:

```bash
# Export user accounts
exostellar users export --output-file /backup/users.json

# Export department configurations
exostellar department export --all --output-file /backup/departments.json

# Backup RBAC policies
exostellar rbac export --output-file /backup/rbac-policies.json
```

## Shutdown Active Resources

### Stop All Workloads

Gracefully terminate running workloads:

```bash
# List all active workloads
exostellar workload list --status running

# Stop individual workloads
exostellar workload stop <workload-id>

# Force stop all workloads (if needed)
exostellar workload stop --all --force
```

### Terminate Workspaces

Stop all active workspaces:

```bash
# List active workspaces
exostellar workspace list --status active

# Stop workspaces gracefully
exostellar workspace stop --all

# Wait for termination
exostellar workspace wait-for-termination --timeout 600s
```

## Uninstall Platform Components

### Management Components

Remove management plane components:

```bash
# Stop management services
sudo systemctl stop exostellar-manager
sudo systemctl stop exostellar-scheduler
sudo systemctl stop exostellar-api-gateway

# Disable services
sudo systemctl disable exostellar-manager
sudo systemctl disable exostellar-scheduler
sudo systemctl disable exostellar-api-gateway

# Remove service files
sudo rm /etc/systemd/system/exostellar-*.service
sudo systemctl daemon-reload
```

### Compute Node Components

Remove components from compute nodes:

```bash
# Stop node agents on each compute node
sudo systemctl stop exostellar-node-agent
sudo systemctl disable exostellar-node-agent

# Remove container runtime components
sudo systemctl stop containerd
sudo systemctl disable containerd

# Clean up container images
sudo ctr images rm $(sudo ctr images list -q)
```

### Database and Storage

Remove persistent data (⚠️ **IRREVERSIBLE**):

```bash
# Stop database services
sudo systemctl stop postgresql
sudo systemctl stop etcd

# Remove database files (CAUTION: This deletes all data)
sudo rm -rf /var/lib/postgresql/data/exostellar
sudo rm -rf /var/lib/etcd/exostellar

# Remove storage mount points
sudo umount /mnt/exostellar-storage
```

## Remove Software Packages

### Package Removal by Platform

#### Ubuntu/Debian

```bash
# Remove Exostellar packages
sudo apt remove --purge exostellar-platform exostellar-cli
sudo apt autoremove

# Remove repository
sudo rm /etc/apt/sources.list.d/exostellar.list
sudo apt update
```

#### CentOS/RHEL

```bash
# Remove Exostellar packages
sudo yum remove exostellar-platform exostellar-cli

# Remove repository
sudo rm /etc/yum.repos.d/exostellar.repo
sudo yum clean all
```

#### Kubernetes Deployment

```bash
# Remove Helm deployment
helm uninstall exostellar -n exostellar-system

# Remove namespace
kubectl delete namespace exostellar-system

# Remove custom resources
kubectl delete crd $(kubectl get crd | grep exostellar | awk '{print $1}')
```

## Clean Up Configuration Files

### Remove Configuration Directories

```bash
# Remove main configuration
sudo rm -rf /etc/exostellar

# Remove log files
sudo rm -rf /var/log/exostellar

# Remove cache and temporary files
sudo rm -rf /var/cache/exostellar
sudo rm -rf /tmp/exostellar*
```

### Remove User Data

```bash
# Remove user-specific configurations
rm -rf ~/.exostellar
rm -rf ~/.config/exostellar

# Remove CLI configuration
rm ~/.exostellar-cli-config
```

## Network and Security Cleanup

### Firewall Rules

Remove firewall configurations:

```bash
# Remove iptables rules (save existing rules first)
sudo iptables-save > /backup/iptables-before-exostellar-removal.rules

# Remove Exostellar-specific rules
sudo iptables -D INPUT -p tcp --dport 8080 -j ACCEPT
sudo iptables -D INPUT -p tcp --dport 8443 -j ACCEPT

# Save updated rules
sudo iptables-save > /etc/iptables/rules.v4
```

### DNS Cleanup

Remove DNS records:

```bash
# Remove DNS entries (adjust for your DNS provider)
# - portal.exostellar.company.com
# - *.workspace.exostellar.company.com
# - api.exostellar.company.com
```

### SSL Certificates

Remove SSL certificates:

```bash
# Remove Let's Encrypt certificates
sudo certbot delete --cert-name exostellar.company.com

# Remove custom certificates
sudo rm /etc/ssl/certs/exostellar.*
sudo rm /etc/ssl/private/exostellar.*
```

## Verification

Verify complete removal:

```bash
# Check for running processes
ps aux | grep exostellar

# Check for remaining files
find / -name "*exostellar*" 2>/dev/null

# Check for open ports
netstat -tulpn | grep -E "(8080|8443|9090)"

# Verify service removal
systemctl list-units | grep exostellar
```

## Post-Uninstall Tasks

### Infrastructure Cleanup

- Remove cloud resources (VMs, load balancers, storage volumes)
- Cancel any cloud provider subscriptions related to Exostellar
- Update network security groups and access controls
- Remove monitoring and alerting configurations

### Documentation Updates

- Update internal documentation
- Notify relevant teams of the platform removal
- Archive configuration backups
- Update disaster recovery procedures

## Recovery Information

If you need to reinstall Exostellar:

- Configuration backups are stored in `/backup/`
- User data backups are available for import
- Review the [Installation Guide](index.md) for fresh deployment
- Contact [Support](../support.md) for restoration assistance

## Related Documentation

- [Installation Guide](index.md)
- [Configuration Overview](configuration/index.md)
- [Troubleshooting](../troubleshooting.md)
- [Support](../support.md)

## Support

For assistance with the uninstall process:

- Review [Troubleshooting Guide](../troubleshooting.md)
- Check [Known Issues](../known-issues.md)
- Contact [Support Team](../support.md)
