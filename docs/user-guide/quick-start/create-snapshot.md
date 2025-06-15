# Create Workspace Snapshot

![Snapshot Creation](https://cdn.prod.website-files.com/682f16fda0a63d2b81f9abbc/683b5e5c9266cccd399d1691_layer-3.svg)

Learn how to create snapshots of your workspaces to save configurations, installed packages, and project states.

## Overview

Workspace snapshots capture the complete state of your development environment, including:

- Installed packages and dependencies
- Configuration files and settings
- Code and project files
- System customizations
- Environment variables

## Prerequisites

- Active workspace with desired configuration
- Sufficient storage quota for snapshot creation
- Appropriate permissions to create snapshots

## Creating Your First Snapshot

### Step 1: Access Workspace Management

Navigate to the workspace you want to snapshot:

1. Log in to the management portal
2. Go to **Workspaces** → **My Workspaces**
3. Select the workspace to snapshot

### Step 2: Initiate Snapshot Creation

Create a snapshot through the web interface:

1. Click **Actions** → **Create Snapshot**
2. Provide snapshot details:
   - **Name**: `my-first-snapshot`
   - **Description**: `Initial development environment setup`
   - **Tags**: `python`, `ml-setup`, `v1.0`

### Step 3: Configure Snapshot Options

Choose snapshot configuration:

```yaml
snapshot_config:
  include_data: true      # Include user data files
  include_packages: true  # Include installed packages
  include_config: true    # Include configuration files
  compression: "gzip"     # Compression method
  exclude_patterns:       # Files to exclude
    - "*.log"
    - "tmp/*"
    - ".cache/*"
```

### Step 4: Monitor Snapshot Creation

Track the snapshot creation process:

1. View progress in the **Snapshots** tab
2. Monitor resource usage during creation
3. Wait for completion confirmation

## Using the CLI

Create snapshots using the command line:

```bash
# Create a basic snapshot
exostellar workspace snapshot create my-workspace \
  --name "dev-environment-v1" \
  --description "Python ML development setup"

# Create snapshot with custom options
exostellar workspace snapshot create my-workspace \
  --name "production-ready" \
  --include-data true \
  --exclude "*.log,tmp/*" \
  --tags "production,ml,python"

# Create snapshot with metadata
exostellar workspace snapshot create my-workspace \
  --name "experiment-baseline" \
  --metadata '{"version":"1.0","author":"data-scientist"}' \
  --wait
```

## Snapshot Best Practices

### Naming Conventions

Use descriptive names for snapshots:

- `project-baseline-v1.0` - Initial project setup
- `pre-deployment-2024-01` - Before deployment changes
- `experiment-results-20240315` - After completing experiments
- `feature-branch-snapshot` - Feature development checkpoint

### Regular Snapshot Schedule

Create snapshots at key milestones:

- **Daily**: Active development environments
- **Weekly**: Stable configurations
- **Before major changes**: System updates, package installations
- **After successful experiments**: ML model training, data analysis

### Snapshot Organization

Organize snapshots with tags and descriptions:

```bash
# Tag snapshots by purpose
exostellar workspace snapshot create my-workspace \
  --name "ml-pipeline-v2" \
  --tags "ml,pipeline,production" \
  --description "Production ML pipeline with optimized hyperparameters"

# Tag snapshots by environment
exostellar workspace snapshot create my-workspace \
  --name "dev-env-2024-03" \
  --tags "development,python,jupyter" \
  --description "Development environment with Jupyter and ML libraries"
```

## Managing Snapshots

### List Available Snapshots

View all snapshots for a workspace:

```bash
# List snapshots
exostellar workspace snapshot list my-workspace

# List snapshots with details
exostellar workspace snapshot list my-workspace --verbose

# Filter snapshots by tags
exostellar workspace snapshot list my-workspace --tags "production"
```

### Snapshot Information

Get detailed snapshot information:

```bash
# Show snapshot details
exostellar workspace snapshot describe my-workspace snapshot-name

# Show snapshot metadata
exostellar workspace snapshot metadata my-workspace snapshot-name

# Show snapshot size and storage usage
exostellar workspace snapshot usage my-workspace snapshot-name
```

## Restoring from Snapshots

### Create Workspace from Snapshot

Launch a new workspace from an existing snapshot:

```bash
# Create workspace from snapshot
exostellar workspace create from-snapshot \
  --snapshot my-workspace/dev-environment-v1 \
  --name "restored-workspace" \
  --nodegroup cpu-nodes

# Create workspace with custom configuration
exostellar workspace create from-snapshot \
  --snapshot my-workspace/production-ready \
  --name "prod-workspace" \
  --instance-type "m5.xlarge" \
  --volume my-data-volume
```

### Restore Workspace State

Restore an existing workspace to a previous snapshot:

```bash
# Restore workspace to snapshot state
exostellar workspace restore my-workspace \
  --snapshot dev-environment-v1 \
  --confirm

# Restore with backup of current state
exostellar workspace restore my-workspace \
  --snapshot production-ready \
  --backup-current \
  --backup-name "before-restore"
```

## Snapshot Sharing

### Export Snapshots

Export snapshots for sharing or backup:

```bash
# Export snapshot to file
exostellar workspace snapshot export my-workspace/dev-env-v1 \
  --output-file dev-environment.tar.gz

# Export with metadata
exostellar workspace snapshot export my-workspace/ml-setup \
  --output-file ml-environment.tar.gz \
  --include-metadata
```

### Import Snapshots

Import snapshots from other environments:

```bash
# Import snapshot from file
exostellar workspace snapshot import \
  --file dev-environment.tar.gz \
  --name "imported-dev-env"

# Import to specific workspace
exostellar workspace snapshot import \
  --file ml-environment.tar.gz \
  --workspace target-workspace \
  --name "ml-baseline"
```

## Automated Snapshots

### Scheduled Snapshots

Set up automatic snapshot creation:

```yaml
# scheduled-snapshots.yaml
apiVersion: exostellar.io/v1
kind: SnapshotSchedule
metadata:
  name: daily-dev-snapshots
spec:
  workspace: "my-dev-workspace"
  schedule: "0 2 * * *"  # Daily at 2 AM
  retention: 7           # Keep 7 snapshots
  naming_pattern: "auto-{timestamp}"
  tags:
    - "automated"
    - "daily"
```

Apply the schedule:

```bash
exostellar apply -f scheduled-snapshots.yaml
```

### Event-Triggered Snapshots

Create snapshots based on events:

```yaml
# event-snapshots.yaml
apiVersion: exostellar.io/v1
kind: SnapshotTrigger
metadata:
  name: pre-deployment-snapshots
spec:
  workspace: "production-workspace"
  triggers:
    - event: "before_package_install"
    - event: "before_system_update"
  naming_pattern: "pre-change-{event}-{timestamp}"
  retention: 5
```

## Monitoring and Cleanup

### Snapshot Storage Usage

Monitor snapshot storage consumption:

```bash
# Check snapshot storage usage
exostellar workspace snapshot usage --summary

# List snapshots by size
exostellar workspace snapshot list --sort-by size --reverse

# Show storage quota usage
exostellar quota show --type snapshots
```

### Cleanup Old Snapshots

Remove unnecessary snapshots:

```bash
# Delete specific snapshot
exostellar workspace snapshot delete my-workspace snapshot-name

# Delete snapshots older than 30 days
exostellar workspace snapshot cleanup \
  --older-than 30d \
  --workspace my-workspace

# Delete snapshots by tag
exostellar workspace snapshot delete \
  --tags "temporary,test" \
  --confirm
```

## Troubleshooting

### Snapshot Creation Issues

Common problems and solutions:

**Storage quota exceeded:**
```bash
# Check storage usage
exostellar quota show --type storage

# Clean up old snapshots
exostellar workspace snapshot cleanup --older-than 14d
```

**Snapshot creation timeout:**
```bash
# Create snapshot with extended timeout
exostellar workspace snapshot create my-workspace \
  --name "large-snapshot" \
  --timeout 1800s
```

### Restoration Issues

**Snapshot compatibility:**
```bash
# Check snapshot compatibility
exostellar workspace snapshot validate my-workspace/snapshot-name

# Show snapshot requirements
exostellar workspace snapshot requirements my-workspace/snapshot-name
```

## Next Steps

After creating your first snapshot:

1. **[Manage Workloads](manage-workloads.md)** - Learn to run computational tasks
2. **[Workspace Management](../workspace/index.md)** - Explore advanced workspace features
3. **[Volume Creation](volume-creation.md)** - Create additional storage resources

## Related Documentation

- [Workspace Management](../workspace/index.md)
- [Storage Volume Management](../storage-volume-management.md)
- [Quick Start Overview](index.md)

## Support

Need help with snapshots?

- [FAQ](../../faq.md) - Common questions
- [Troubleshooting](../../troubleshooting.md) - Problem resolution
- [Support](../../support.md) - Contact support team
