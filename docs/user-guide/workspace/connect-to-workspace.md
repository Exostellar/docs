# Connect to Workspace

Learn how to access and connect to your workspaces in the Exostellar platform.

## Connection Methods

### Web Browser Access
Most common method for accessing workspace applications:

1. Navigate to your workspace dashboard
2. Click on the workspace name
3. Select the application/service to access:
   - Jupyter Lab
   - RStudio
   - VS Code
   - Custom applications

### SSH Connection
For command-line access:

```bash
# Connect via SSH
ssh username@workspace-hostname

# Using SSH key authentication
ssh -i ~/.ssh/exostellar_key username@workspace-hostname

# Port forwarding for local access
ssh -L 8888:localhost:8888 username@workspace-hostname
```

### Desktop Access
For GUI applications requiring desktop environment:

1. Access through web-based VNC
2. Use remote desktop protocols
3. X11 forwarding for specific applications

## Authentication

### Single Sign-On (SSO)
- Automatic authentication using organization credentials
- No additional passwords required
- Session management and timeout policies

### API Keys
For programmatic access:

```bash
# Set environment variable
export EXOSTELLAR_API_KEY="your-api-key"

# Use in API calls
curl -H "Authorization: Bearer $EXOSTELLAR_API_KEY" \
     https://api.exostellar.com/workspace/status
```

## Application Access

### Jupyter Lab
- URL: `https://workspace-name.exostellar.com/jupyter`
- Features: Notebooks, terminal, file manager
- Extensions: Git, data visualization, collaboration

### RStudio
- URL: `https://workspace-name.exostellar.com/rstudio`
- Features: R console, script editor, plots
- Integration: Git, packages, markdown

### VS Code
- URL: `https://workspace-name.exostellar.com/vscode`
- Features: Full IDE experience in browser
- Extensions: Language support, debugging, Git

## File Management

### Accessing Files
```bash
# Navigate to mounted volumes
cd /mnt/volumes/my-data-volume

# List workspace files
ls -la /workspace

# Access shared project data
cd /mnt/shared/project-data
```

### File Transfer
```bash
# Upload files via SCP
scp local-file.txt username@workspace:/workspace/

# Download files
scp username@workspace:/workspace/results.csv ./

# Sync directories
rsync -av local-dir/ username@workspace:/workspace/project/
```

## Environment Setup

### Personalizing Your Workspace
```bash
# Install additional packages
pip install custom-package
conda install -c conda-forge special-tool

# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your.email@company.com"

# Set up SSH keys
ssh-keygen -t rsa -b 4096 -C "your.email@company.com"
```

### Environment Variables
```bash
# Set temporary variables
export MY_PROJECT_PATH="/mnt/volumes/project-data"
export CUDA_VISIBLE_DEVICES="0,1"

# Make permanent in ~/.bashrc
echo 'export MY_PROJECT_PATH="/mnt/volumes/project-data"' >> ~/.bashrc
```

## Collaboration

### Shared Sessions
- Multiple users can access the same workspace
- Real-time collaboration in supported applications
- Session management and conflict resolution

### Screen Sharing
```bash
# Start shared screen session
screen -S shared-session

# Join existing session
screen -x shared-session

# Detach from session (Ctrl+A, D)
# List sessions
screen -ls
```

## Troubleshooting

### Connection Issues
- Verify workspace is running
- Check network connectivity
- Clear browser cache and cookies
- Try different browser or incognito mode

### Authentication Problems
- Ensure SSO is properly configured
- Check API key validity
- Verify user permissions

### Performance Issues
- Check workspace resource utilization
- Monitor network latency
- Optimize browser settings

## Security Best Practices

### Connection Security
- Always use HTTPS connections
- Enable MFA when available
- Use VPN when required by policy

### Session Management
- Log out properly when finished
- Don't leave sensitive data in shared sessions
- Monitor active sessions regularly

## Related Sections

- [Create Workspace](create-workspace.md)
- [Monitor Workspace](monitor-workspace.md)
- [Delete Workspace](delete-workspace.md)
