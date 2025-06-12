# Known Issues

This page documents known issues and limitations in the current version of Exostellar Platform.

## Installation Issues

### Network Connectivity
- **Issue**: Installation may fail in environments with restrictive network policies
- **Workaround**: Ensure required ports and endpoints are accessible as documented in [System Requirements](install-guide/system-requirements.md)

### Storage Configuration
- **Issue**: Some storage backends may require additional configuration steps
- **Status**: Being addressed in next release
- **Workaround**: Contact support for manual configuration assistance

## Runtime Issues

### Workspace Management
- **Issue**: Large workspaces may take longer to provision in certain cloud regions
- **Impact**: Increased startup time for workspaces with significant resource requirements
- **Status**: Performance optimizations planned for future release

### Monitoring & Observability
- **Issue**: Metrics collection may be delayed during high load periods
- **Impact**: Dashboard updates may lag by 1-2 minutes
- **Workaround**: Refresh dashboards manually if needed

## Compatibility Notes

### Kubernetes Versions
- Kubernetes 1.24 and earlier: Limited support
- Kubernetes 1.25+: Full support recommended

### Browser Support
- Chrome 90+: Full support
- Firefox 88+: Full support
- Safari 14+: Basic support
- Edge 90+: Full support

## Reporting Issues

If you encounter issues not listed here, please:
1. Check the [Troubleshooting](troubleshooting.md) guide
2. Contact [Support](support.md) with detailed information
