# Exostellar Documentation

This repository contains the documentation website for Exostellar, built with [Docusaurus](https://docusaurus.io/).

## Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Exostellar/docs.git
   cd docs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

   This command starts a local development server and opens a browser window. Most changes are reflected live without having to restart the server.

4. **Open your browser**
   The site will be available at `http://localhost:3000`

## Project Structure

```
docs/
├── docs/                          # Documentation markdown files
│   ├── index.md                   # Homepage
│   ├── getting-started/           # Installation and setup guides
│   ├── gpu-flex/                  # GPU fractionalization features
│   ├── clusterops/                # Multi-cluster orchestration
│   ├── workloads/                 # Workload optimization guides
│   ├── api-reference/             # API documentation
│   ├── observability/             # Monitoring and metrics
│   ├── support/                   # Support and troubleshooting
│   ├── release-notes/             # Version releases
│   └── roadmap.md                 # Product roadmap
├── src/
│   ├── css/
│   │   └── custom.css             # Custom styling with Exostellar theme
│   └── pages/                     # React pages (optional)
├── static/
│   └── img/                       # Static images and assets
├── docusaurus.config.ts           # Docusaurus configuration
├── sidebars.ts                    # Sidebar navigation structure
└── package.json
```

## Theming

The documentation uses Exostellar's custom color palette:

- **Primary Blue**: `#0000EE` - Main brand color
- **Purple**: `#8C6BEF` - Secondary accent
- **Dark Purple**: `#796684` - Supporting color
- **Light Purple**: `#8C6BEF` - Highlights
- **Black**: `#000000` - Dark theme base
- **Dark Navy**: `#100019` - Dark backgrounds
- **Light Green**: `#D6FF7C` - Success states
- **Pale Green**: `#DFFF9A` - Warning states
- **Light Mint**: `#E8FFB6` - Info states

## Writing Documentation

### Creating New Pages

1. Create a new `.md` file in the appropriate `docs/` subdirectory
2. Add frontmatter at the top:
   ```markdown
   ---
   title: Page Title
   description: Brief description for SEO
   ---

   # Page Title

   Your content here...
   ```

3. Update `sidebars.ts` to include the new page in navigation

### Markdown Features

Docusaurus supports extended Markdown features:

- **Code blocks** with syntax highlighting
- **Admonitions** (:::tip, :::warning, :::danger)
- **Tabs** for multi-option content
- **MDX components** for interactive content

### Code Blocks

\`\`\`bash
# Example command
kubectl get pods -n exostellar-system
\`\`\`

### Admonitions

:::tip Pro Tip
Use fractional GPUs to optimize costs by up to 70%!
:::

:::warning Important
Always backup your configurations before upgrading.
:::

## Available Scripts

### Development

```bash
npm start              # Start development server
npm run build          # Build for production
npm run serve          # Serve production build locally
npm run clear          # Clear Docusaurus cache
```

### Linting and Formatting

```bash
npm run lint           # Lint markdown and code
npm run format         # Format code with Prettier
npm run typecheck      # TypeScript type checking
```

### Deployment

```bash
npm run deploy         # Deploy to GitHub Pages (if configured)
```

## Deployment

### Netlify Deployment

The documentation is configured for automatic deployment on Netlify:

1. **Connect Repository**: Link your GitHub repository to Netlify
2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: `18` (set in `.nvmrc`)

3. **Environment Variables**: None required for basic setup

4. **Deploy**: Push to main branch triggers automatic deployment

### Manual Netlify Deployment

```bash
# Build the site
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir build
```

### Other Deployment Options

- **Vercel**: Connect repository and deploy automatically
- **GitHub Pages**: Configure in `docusaurus.config.ts` and use `npm run deploy`
- **Docker**: Use the included Dockerfile for containerized deployment

## SEO and Performance

The site is optimized for:

- **Search Engine Optimization** with proper meta tags
- **Fast Loading** with static site generation
- **Mobile Responsiveness** with responsive design
- **Accessibility** following WCAG guidelines

## Contributing

### Content Guidelines

1. **Write Clear Headlines**: Use descriptive, action-oriented titles
2. **Structure Content**: Use headings, lists, and code blocks effectively
3. **Include Examples**: Provide practical code examples and use cases
4. **Link Related Content**: Cross-reference related documentation
5. **Keep Updated**: Ensure information matches current product features

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes and test locally
3. Ensure all links work and pages render correctly
4. Submit a pull request with a clear description
5. Request review from the documentation team

### Style Guide

- Use **active voice** and **present tense**
- Keep sentences **concise** and **clear**
- Use **consistent terminology** throughout
- Include **screenshots** for UI-heavy procedures
- Test all **code examples** before publishing

## Support

- **Documentation Issues**: Open an issue in this repository
- **Product Support**: Visit our [support portal](https://support.exostellar.io)
- **Community**: Join our [Discord community](https://discord.gg/exostellar)

## License

This documentation is licensed under [MIT License](LICENSE).

---

Built with love by the Exostellar team using [Docusaurus](https://docusaurus.io/).
