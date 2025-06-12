# Exostellar Documentation

This repository contains the official documentation for Exostellar's Software Defined GPU™ platform.

## Prerequisites

Before running the documentation locally, ensure you have the following installed:

- **Python 3.8+** - Required for MkDocs
- **pip** - Python package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Exostellar/docs.git
   cd docs
   ```

2. **Install dependencies**
   ```bash
   pip install -r docs/requirements.txt
   ```

   This will install:
   - `mkdocs-material` - Material theme for MkDocs
   - `mkdocs-git-revision-date-localized-plugin` - Git revision dates
   - `mkdocs-mermaid2-plugin` - Mermaid diagram support
   - `neoteroi-mkdocs` - Additional MkDocs features

## Running Locally

### Development Server

To start the development server with live reload:

```bash
mkdocs serve
```

The documentation will be available at: **http://localhost:8000**

### Alternative Port

If port 8000 is already in use, specify a different port:

```bash
mkdocs serve --dev-addr=127.0.0.1:8001
```

### Build Static Site

To build the static site for production:

```bash
mkdocs build
```

The built site will be generated in the `site/` directory.

## Development

### Adding New Pages

1. Create a new `.md` file in the appropriate directory under `docs/`
2. Add the page to the navigation in `mkdocs.yml`
3. The page will automatically appear in the live reload

### Modifying Styles

Custom styles are in `docs/stylesheets/extra.css`. Changes will be reflected immediately with live reload.

### Custom Components

Theme overrides are in the `overrides/` directory for customizing the base Material theme.

## Troubleshooting

### Port Already in Use
```bash
# Kill process using port 8000
lsof -ti:8000 | xargs kill -9

# Or use a different port
mkdocs serve --dev-addr=127.0.0.1:8001
```

### Missing Dependencies
```bash
# Reinstall all dependencies
pip install -r docs/requirements.txt --force-reinstall
```

### Build Errors
```bash
# Check for missing files or broken links
mkdocs build --strict
```

## Contributing

1. Create a new branch for your changes
2. Make your modifications
3. Test locally with `mkdocs serve`
4. Submit a pull request

## Support

For questions or issues with the documentation:

- Check the [Troubleshooting](docs/troubleshooting.md) guide
- Review [Known Issues](docs/known-issues.md)
- Contact the documentation team

---

**Copyright © Exostellar, Inc. Built by MkDocs**
