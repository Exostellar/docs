---
title: Documentation Versioning
description: Guide to managing documentation versions
---

# Documentation Versioning

This guide explains how Exostellar documentation versioning works and how to manage versions.

## Overview

Exostellar documentation uses Docusaurus versioning to maintain multiple versions of documentation that correspond to different product releases.

## Version Strategy

- **Latest (current)**: Development version with latest features
- **Stable versions**: Released versions (v0.1.0, v0.2.0, etc.)
- **Version naming**: Follows semantic versioning (SemVer)

## Current Versions

- **v0.2.0-dev (Latest)**: Current development version
- **v0.1.0**: First stable release

## Creating a New Version

When releasing a new version of Exostellar:

### 1. Prepare the Documentation

Ensure all documentation for the release is complete and reviewed.

### 2. Create the Version

```bash
npm run docusaurus docs:version v0.2.0
```

This command:
- Creates a snapshot of current docs in `versioned_docs/version-v0.2.0/`
- Creates versioned sidebars in `versioned_sidebars/version-v0.2.0-sidebars.json`
- Updates `versions.json`

### 3. Update Version Configuration

Update `docusaurus.config.ts` to include the new version:

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

### 4. Update Current Version

After creating a version, update the current docs to reflect the next development version.

## Version Structure

```
docs/                          # Current/latest docs
versioned_docs/
├── version-v0.1.0/           # v0.1.0 documentation
└── version-v0.2.0/           # v0.2.0 documentation (when created)
versioned_sidebars/
├── version-v0.1.0-sidebars.json
└── version-v0.2.0-sidebars.json
versions.json                  # List of available versions
```

## Editing Versioned Documentation

### Current Version
Edit files directly in the `docs/` directory.

### Released Versions
Edit files in `versioned_docs/version-X.X.X/` directory.

**Important**: Changes to versioned docs should be minimal and only for critical fixes.

## Version Navigation

Users can switch between versions using the version dropdown in the navbar.

## Best Practices

### Documentation Workflow

1. **Feature Development**: Update docs in `docs/` directory
2. **Pre-Release**: Review and finalize documentation
3. **Release**: Create version snapshot
4. **Post-Release**: Update current docs for next version

### Version Maintenance

- **Keep 3-4 recent versions** maximum
- **Archive old versions** after major releases
- **Only critical fixes** to released versions
- **Redirect deprecated versions** to latest

### Content Guidelines

- **Version-specific features**: Document version requirements
- **Breaking changes**: Clearly mark in version notes
- **Migration guides**: Provide upgrade instructions
- **API changes**: Document version compatibility

## Managing Versions

### Listing Versions

```bash
npm run docusaurus docs:version --list
```

### Deleting a Version

1. Remove from `versions.json`
2. Delete `versioned_docs/version-X.X.X/`
3. Delete `versioned_sidebars/version-X.X.X-sidebars.json`
4. Update `docusaurus.config.ts`

### Setting Default Version

The `lastVersion` config determines which version is shown by default:

```typescript
lastVersion: 'current', // Shows latest development version
// or
lastVersion: 'v0.1.0', // Shows specific stable version
```

## Deployment Considerations

### Branch Strategy

- **main branch**: Latest stable documentation
- **develop branch**: Development documentation
- **release branches**: Version-specific documentation

### Build Configuration

Ensure your build process includes all necessary versions:

```bash
# Build all versions
npm run build

# Verify versions in build
ls build/
```

## Troubleshooting

### Common Issues

**Version not appearing in dropdown**
- Check `versions.json` includes the version
- Verify version config in `docusaurus.config.ts`
- Ensure versioned files exist

**Build failures with versions**
- Check for broken links in versioned docs
- Verify sidebar configurations
- Ensure all referenced files exist

**Version paths not working**
- Check path configuration in version config
- Verify deployment configuration
- Test locally with `npm run serve`

## Examples

### Creating v0.2.0 Release

```bash
# 1. Ensure current docs are ready
npm run build

# 2. Create version snapshot
npm run docusaurus docs:version v0.2.0

# 3. Update config for next development version
# Edit docusaurus.config.ts

# 4. Commit changes
git add .
git commit -m "docs: create v0.2.0 documentation version"
```

### Hotfix for Released Version

```bash
# 1. Edit versioned documentation
vim versioned_docs/version-v0.1.0/getting-started/troubleshooting.md

# 2. Test build
npm run build

# 3. Deploy hotfix
git add versioned_docs/version-v0.1.0/
git commit -m "docs(v0.1.0): fix installation command"
```

## Resources

- [Docusaurus Versioning Guide](https://docusaurus.io/docs/versioning)
- [Semantic Versioning](https://semver.org/)
- [Exostellar Release Process](/release-notes/v0.1.0)
