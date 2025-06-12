# Installation Guide

![Exostellar Infrastructure](https://cdn.prod.website-files.com/682f16fda0a63d2b81f9abbc/683b5e5ca203281d54720e4a_layer-2.svg)

Welcome to the Exostellar Platform installation guide. This comprehensive guide will walk you through setting up Exostellar Platform in your environment.

## Installation Overview

Exostellar Platform installation involves several key steps:

1. **[Infrastructure Setup](infrastructure-setup.md)** - Prepare your cloud infrastructure
2. **[System Requirements](system-requirements.md)** - Verify prerequisites and dependencies  
3. **[Cloud Environment Preparation](cloud-environment-preparation.md)** - Configure your cloud provider
4. **[Platform Installation](platform/index.md)** - Deploy the core platform components
5. **[Configuration](configuration/index.md)** - Configure platform settings and integrations

## Supported Environments

- **Amazon Web Services (AWS)**
- **Microsoft Azure**
- **Google Cloud Platform (GCP)**
- **Self-hosted Kubernetes clusters**

## Installation Methods

### Standard Installation
Recommended for most deployments using Helm charts and automated scripts.

### Custom Installation
For advanced users requiring specific configurations or integrations.

## Before You Begin

Ensure you have:
- Administrative access to your target environment
- Required cloud provider credentials
- Kubernetes cluster access (v1.25+ recommended)
- Helm 3.x installed

## Quick Start

For a streamlined installation experience:
1. Review [System Requirements](system-requirements.md)
2. Follow [Cloud Environment Preparation](cloud-environment-preparation.md)
3. Execute [Platform Deployment](platform/platform-deployment.md)

## Next Steps

After successful installation:
- Configure [DNS Setup](configuration/dns-setup.md)
- Set up [Billing Integration](configuration/billing-integration.md)
- Review the [User Guide](../user-guide/index.md) to start using the platform

## Support

If you encounter issues during installation:
- Check [Known Issues](../known-issues.md)
- Consult [Troubleshooting](../troubleshooting.md)
- Contact [Support](../support.md)
