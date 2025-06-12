# Quick Start Guide

![Quick Start](https://cdn.prod.website-files.com/682f16fda0a63d2b81f9abbc/683b5e5d75179f701baae83b_layer-1.svg)

Get started with Exostellar in minutes. This guide walks you through the essential steps to launch your first workspace and run your first workload.

## Overview

The Quick Start guide provides step-by-step tutorials to help you:

1. **[Set up your project structure](project-setup.md)** - Create departments and projects
2. **[Configure node groups](node-group-configuration.md)** - Set up compute resources
3. **[Create storage volumes](volume-creation.md)** - Establish persistent storage
4. **[Set up departments](department-setup.md)** - Organize users and resources
5. **[Launch your first workspace](launch-workspace.md)** - Create development environments
6. **[Manage workloads](manage-workloads.md)** - Run computational tasks
7. **[Create snapshots](create-snapshot.md)** - Save workspace states

## Prerequisites

Before starting, ensure you have:

- Access to the Exostellar platform with appropriate permissions
- Basic understanding of cloud computing concepts
- Login credentials for the management portal

## Getting Started

### 1. Access the Platform

Log in to the Exostellar management portal:

```
https://portal.exostellar.company.com
```

### 2. Complete Initial Setup

Follow these tutorials in order:

1. **[Project Setup](project-setup.md)** - Create your first project
2. **[Department Setup](department-setup.md)** - Organize your team
3. **[Node Group Configuration](node-group-configuration.md)** - Configure compute resources

### 3. Create Resources

Set up your development environment:

4. **[Volume Creation](volume-creation.md)** - Create persistent storage
5. **[Launch Workspace](launch-workspace.md)** - Start your development environment

### 4. Run Workloads

Start using the platform:

6. **[Manage Workloads](manage-workloads.md)** - Run your first computational task
7. **[Create Snapshot](create-snapshot.md)** - Save your workspace state

## Quick Start Checklist

Track your progress through the quick start process:

- [ ] Log in to the management portal
- [ ] Create your first project
- [ ] Set up a department
- [ ] Configure a node group
- [ ] Create a storage volume
- [ ] Launch a workspace
- [ ] Submit a workload
- [ ] Create a workspace snapshot

## Common First Steps

Once you complete the quick start:

### Explore Advanced Features

- **[Workload Management](../workload-management.md)** - Advanced job scheduling
- **[Storage Volume Management](../storage-volume-management.md)** - Advanced storage options
- **[Workspace Management](../workspace/index.md)** - Advanced workspace features

### Administration Tasks

- **[Admin Guide](../../admin-guide/index.md)** - Platform administration
- **[User Management](../../admin-guide/user-management.md)** - Manage platform users
- **[Cluster Operations](../../clusterops/index.md)** - Manage compute clusters

## Estimated Time

Complete tutorial times:

| Tutorial | Estimated Time |
|----------|---------------|
| Project Setup | 5 minutes |
| Department Setup | 5 minutes |
| Node Group Configuration | 10 minutes |
| Volume Creation | 5 minutes |
| Launch Workspace | 10 minutes |
| Manage Workloads | 15 minutes |
| Create Snapshot | 5 minutes |
| **Total** | **55 minutes** |

## Sample Workflow

Here's a typical first workflow:

```bash
# 1. Create a project
exostellar project create "My First Project" --description "Learning Exostellar"

# 2. Create a department
exostellar department create "Development Team" --project "My First Project"

# 3. Configure node group
exostellar nodegroup create "cpu-nodes" --instance-type "m5.large" --count 2

# 4. Create storage volume
exostellar volume create "my-data" --size 100GB --type persistent

# 5. Launch workspace
exostellar workspace create "dev-workspace" --template "python-ml" --volume "my-data"

# 6. Submit workload
exostellar workload submit training-job.yaml

# 7. Create snapshot
exostellar workspace snapshot create "dev-workspace" --name "initial-setup"
```

## Troubleshooting

Common issues during quick start:

### Permission Errors

If you encounter permission errors:

1. Verify your user account has appropriate roles
2. Check department membership
3. Contact your administrator

### Resource Limits

If you hit resource limits:

1. Check your organization's quotas
2. Review node group configurations
3. Verify storage allocations

### Connection Issues

If you can't connect to workspaces:

1. Check network connectivity
2. Verify DNS resolution
3. Test firewall settings

## Next Steps

After completing the quick start:

1. **Explore the [User Guide](../index.md)** for comprehensive platform features
2. **Review [Best Practices](../../admin-guide/best-practices.md)** for optimal usage
3. **Join the community** for tips and support

## Support

Need help with the quick start?

- **[FAQ](../../faq.md)** - Common questions and answers
- **[Troubleshooting](../../troubleshooting.md)** - Problem resolution
- **[Support](../../support.md)** - Contact our support team

## Feedback

We'd love to hear about your quick start experience! Share feedback through:

- Platform feedback feature
- Support channels
- Community forums

---

**Ready to begin?** Start with [Project Setup](project-setup.md) to create your first project.
