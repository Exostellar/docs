# Create Workspace

Learn how to create a new workspace in the Exostellar platform.

## Prerequisites

Before creating a workspace, ensure you have:
- Access to a project with workspace creation permissions
- Understanding of your compute and storage requirements
- Selected the appropriate workspace template for your needs

## Creating a Workspace

### Step 1: Navigate to Workspace Creation

1. Log into the Exostellar platform
2. Select your project from the dashboard
3. Click on "Workspaces" in the navigation menu
4. Click the "Create Workspace" button

### Step 2: Configure Basic Settings

#### Workspace Details
```
Workspace Name: my-data-science-workspace
Description: Python environment for machine learning projects
Template: Python Data Science
```

#### Compute Resources
```
CPU: 4 cores
Memory: 16 GB
GPU: Optional (NVIDIA Tesla V100)
```

#### Storage Configuration
```
Boot Volume: 50 GB SSD
Data Volumes: 
  - my-project-data (100 GB)
  - shared-datasets (500 GB, read-only)
```

### Step 3: Select Workspace Template

#### Available Templates
- **Python Data Science** - Jupyter, NumPy, Pandas, Scikit-learn
- **R Analytics** - RStudio, tidyverse, statistical packages
- **Machine Learning** - TensorFlow, PyTorch, CUDA support
- **Web Development** - Node.js, React, development tools
- **Custom** - Build from your own Docker image

#### Template Configuration
```yaml
template: python-datascience:latest
environment_variables:
  JUPYTER_TOKEN: auto-generated
  PYTHON_PATH: /opt/conda/bin/python
custom_packages:
  - tensorflow>=2.0
  - scikit-learn
  - matplotlib
```

### Step 4: Configure Advanced Settings

#### Network Configuration
```
Port Forwarding:
  - 8888 (Jupyter Lab)
  - 8080 (Custom application)
External Access: Enabled
Load Balancer: Auto
```

#### Security Settings
```
SSH Access: Enabled
VPN Required: Optional
Multi-factor Authentication: Required
Session Timeout: 8 hours
```

#### Collaboration Settings
```
Shared Access: Enabled
Maximum Users: 5
Default Permissions: Read/Write
Guest Access: Disabled
```

### Step 5: Review and Create

1. Review all configuration settings
2. Verify resource quotas and limits
3. Check estimated costs
4. Click "Create Workspace"

## Post-Creation Steps

### Workspace Initialization
- Wait for workspace to start (typically 2-5 minutes)
- Monitor initialization progress in the dashboard
- Check for any startup errors or warnings

### Initial Configuration
1. **Connect to workspace** using provided URL or SSH
2. **Verify mounted volumes** are accessible
3. **Test software stack** and installed packages
4. **Configure personal settings** and preferences

### Validation Checklist
- [ ] Workspace is running and accessible
- [ ] All required software is installed and working
- [ ] Storage volumes are mounted correctly
- [ ] Network access and port forwarding working
- [ ] Performance meets requirements

## Configuration Examples

### Python Data Science Workspace
```yaml
name: ml-research-workspace
template: python-datascience:3.9
resources:
  cpu: 8
  memory: 32GB
  gpu: nvidia-v100
volumes:
  - name: research-data
    size: 1TB
    mount: /data
  - name: models
    size: 500GB
    mount: /models
environment:
  CUDA_VISIBLE_DEVICES: "0"
  JUPYTER_ENABLE_LAB: "yes"
```

### R Analytics Workspace
```yaml
name: statistical-analysis
template: r-studio:4.1
resources:
  cpu: 4
  memory: 16GB
volumes:
  - name: analysis-data
    size: 200GB
    mount: /home/rstudio/data
packages:
  - tidyverse
  - ggplot2
  - caret
  - randomForest
```

## Troubleshooting

### Common Issues

#### Workspace Won't Start
- Check resource availability in project
- Verify template compatibility
- Review error logs in workspace dashboard

#### Storage Mount Issues
- Verify volume exists and has correct permissions
- Check mount path configurations
- Ensure sufficient storage quota

#### Network Access Problems
- Verify port forwarding configuration
- Check firewall and security group settings
- Test network connectivity

### Getting Help
- Check workspace logs for error messages
- Review [Troubleshooting Guide](../../troubleshooting.md)
- Contact [Support](../../support.md) for assistance

## Best Practices

### Resource Planning
- Start with smaller resources and scale up as needed
- Monitor resource usage to optimize costs
- Use auto-shutdown for development workspaces

### Security
- Use strong passwords and enable MFA
- Regularly update workspace templates
- Follow data handling best practices

### Organization
- Use descriptive workspace names
- Document workspace purpose and configuration
- Regular cleanup of unused workspaces

## Related Sections

- [Connect to Workspace](connect-to-workspace.md)
- [Monitor Workspace](monitor-workspace.md)
- [Storage Volume Management](../storage-volume-management.md)
