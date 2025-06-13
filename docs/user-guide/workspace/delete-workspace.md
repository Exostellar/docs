# Delete Workspace

Learn how to safely delete workspaces when they're no longer needed.

## Before You Delete

### Data Backup
- Save important files to persistent storage volumes
- Export notebooks, code, and results
- Ensure all data is backed up or no longer needed

### Check Dependencies
- Verify no other users are actively using the workspace
- Confirm no running jobs or processes depend on the workspace
- Review shared resources and collaborations

## Deletion Process

### Via Web Interface
1. Navigate to your workspace dashboard
2. Select the workspace to delete
3. Click "Delete" or "Remove"
4. Confirm deletion by typing workspace name
5. Click "Confirm Delete"

### Via CLI
```bash
exostellar workspace delete workspace-name --confirm
```

## What Gets Deleted

### Workspace Components
- Container and all installed software
- Temporary files and cache
- Personal configurations and settings
- Session data and history

### Preserved Data
- Persistent storage volumes (remain intact)
- Project data and shared resources
- Backup snapshots
- Audit logs and usage history

## Recovery Options

### Immediate Recovery
- Deleted workspaces may be recoverable for 24-48 hours
- Contact support for emergency recovery requests
- Additional charges may apply for recovery services

### Backup Restoration
- Restore from previous snapshots
- Recreate workspace from templates
- Import data from storage volumes

## Best Practices

### Before Deletion
- Create final backup of important work
- Document workspace configuration for future reference
- Notify collaborators of planned deletion
- Complete any pending work or experiments

### Regular Cleanup
- Delete unused development workspaces regularly
- Archive completed project workspaces
- Monitor workspace costs and usage
- Use auto-deletion policies for temporary workspaces

## Related Sections

- [Create Workspace](create-workspace.md)
- [Monitor Workspace](monitor-workspace.md)
- [Storage Volume Management](../storage-volume-management.md)
