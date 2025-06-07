# Documentation Versioning Guide

## Quick Reference

### Current Versions
- **Latest (current)**: v0.2.0-dev at `/`
- **v0.1.0**: Stable release at `/v0.1.0`

### Create New Version

```bash
# 1. Finalize current documentation
npm run build

# 2. Create version snapshot
npm run version v0.2.0

# 3. Update docusaurus.config.ts version labels
# 4. Commit changes
git add .
git commit -m "docs: create v0.2.0 documentation version"
```

### Common Commands

```bash
npm run version:list           # List versions
npm run build                  # Build all versions
ls versioned_docs/            # View version folders
cat versions.json             # Check version registry
```

### File Structure

```
docs/                         # Latest documentation
versioned_docs/
├── version-v0.1.0/          # v0.1.0 documentation
└── version-v0.2.0/          # v0.2.0 documentation (when created)
versioned_sidebars/
├── version-v0.1.0-sidebars.json
└── version-v0.2.0-sidebars.json
versions.json                 # Version registry
```

### Configuration

Update `docusaurus.config.ts` after creating new versions:

```typescript
versions: {
  current: {
    label: 'v0.3.0-dev (Latest)',
    path: '/',
  },
  'v0.2.0': {
    label: 'v0.2.0',
    path: '/v0.2.0',
  },
  'v0.1.0': {
    label: 'v0.1.0',
    path: '/v0.1.0',
  },
},
```

### Editing Content

| Version | Edit Location | Purpose |
|---------|---------------|---------|
| Latest | `docs/` | Development version |
| v0.1.0 | `versioned_docs/version-v0.1.0/` | Critical fixes only |
| v0.2.0 | `versioned_docs/version-v0.2.0/` | Critical fixes only |

### Best Practices

1. **Before Release**: Ensure current docs are complete and accurate
2. **Version Creation**: Use semantic versioning (v1.0.0, v1.1.0, etc.)
3. **Post-Release**: Only make critical fixes to versioned docs
4. **Maintenance**: Keep 3-4 recent versions maximum

### Troubleshooting

**Build errors**: Check for broken links in versioned docs
**Version not showing**: Verify versions.json and config
**Missing content**: Ensure all files exist in versioned directories

For detailed information, see [Contributing > Versioning](/contributing/versioning).
