# DNS Setup Configuration

![Network Configuration](https://cdn.prod.website-files.com/682f16fda0a63d2b81f9abbc/683b5e5ca203281d54720e4a_layer-2.svg)

Configure DNS settings for your Exostellar platform deployment to ensure proper service discovery and external access.

## Overview

DNS configuration is essential for Exostellar platform operation, enabling service discovery, load balancing, and external access to workspaces and management interfaces.

## Prerequisites

- Administrative access to your DNS infrastructure
- Valid domain name for the Exostellar deployment
- SSL/TLS certificates for secure connections

## DNS Requirements

### Primary Domain Configuration

Configure the primary domain for your Exostellar platform:

```yaml
dns:
  domain: "exostellar.company.com"
  subdomain_pattern: "*.exostellar.company.com"
  management_portal: "portal.exostellar.company.com"
```

### Service Discovery

Configure internal service discovery:

```yaml
service_discovery:
  enabled: true
  cluster_domain: "cluster.local"
  dns_servers:
    - "10.96.0.10"
    - "8.8.8.8"
```

## DNS Records Configuration

### Required DNS Records

Create the following DNS records for your deployment:

| Type | Name | Value | Purpose |
|------|------|-------|---------|
| A | portal.exostellar.company.com | 192.168.1.100 | Management Portal |
| CNAME | *.workspace.exostellar.company.com | portal.exostellar.company.com | Workspace Access |
| A | api.exostellar.company.com | 192.168.1.101 | API Gateway |
| TXT | _exostellar.company.com | "v=exo1 verify=abc123" | Domain Verification |

### Load Balancer Integration

Configure DNS for load balancers:

```yaml
load_balancer:
  type: "nginx"  # nginx, haproxy, aws-alb
  dns_integration:
    auto_update: true
    health_check_path: "/health"
    failover_enabled: true
```

## SSL/TLS Configuration

### Certificate Management

Configure SSL certificates for secure connections:

```yaml
ssl:
  enabled: true
  certificate_source: "letsencrypt"  # letsencrypt, custom, cert-manager
  auto_renewal: true
  domains:
    - "*.exostellar.company.com"
    - "exostellar.company.com"
```

### Custom Certificate Setup

For custom certificates:

```yaml
ssl:
  certificate_file: "/etc/ssl/certs/exostellar.crt"
  private_key_file: "/etc/ssl/private/exostellar.key"
  ca_bundle_file: "/etc/ssl/certs/ca-bundle.crt"
```

## External DNS Integration

### Cloud Provider DNS

Configure cloud provider DNS services:

```yaml
external_dns:
  provider: "route53"  # route53, cloudflare, azure-dns
  credentials_file: "/etc/dns/credentials"
  zone_id: "Z1234567890ABC"
  auto_sync: true
```

### Corporate DNS Integration

For enterprise DNS systems:

```yaml
corporate_dns:
  servers:
    - "dns1.company.com"
    - "dns2.company.com"
  forward_zones:
    - "company.com"
  search_domains:
    - "company.com"
    - "exostellar.company.com"
```

## Workspace DNS Configuration

### Dynamic Workspace URLs

Configure dynamic DNS for workspace access:

```yaml
workspace_dns:
  pattern: "{workspace-id}.workspace.exostellar.company.com"
  auto_create: true
  cleanup_policy: "on_termination"
  ttl: 300
```

### Port Configuration

Configure ports for different services:

```yaml
ports:
  management_portal: 443
  api_gateway: 443
  workspace_access: 443
  monitoring: 3000
```

## Verification

Verify DNS configuration:

```bash
# Test DNS resolution
nslookup portal.exostellar.company.com

# Check certificate validity
openssl s_client -connect portal.exostellar.company.com:443

# Verify service discovery
exostellar dns test-resolution

# Test workspace DNS pattern
curl -I https://test-workspace.workspace.exostellar.company.com
```

## Troubleshooting

Common DNS issues and solutions:

### DNS Resolution Failures

```bash
# Check DNS servers
dig @8.8.8.8 portal.exostellar.company.com

# Verify DNS propagation
nslookup portal.exostellar.company.com 8.8.8.8
```

### Certificate Issues

```bash
# Check certificate expiration
openssl x509 -in /etc/ssl/certs/exostellar.crt -text -noout

# Verify certificate chain
openssl s_client -showcerts -connect portal.exostellar.company.com:443
```

## Related Documentation

- [Configuration Overview](index.md)
- [Billing Integration](billing-integration.md)
- [Infrastructure Setup](../infrastructure-setup.md)
- [System Requirements](../system-requirements.md)

## Support

For DNS configuration issues, refer to:

- [Troubleshooting Guide](../../troubleshooting.md)
- [Known Issues](../../known-issues.md)
- [Support](../../support.md)
