import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Exostellar Docs',
  tagline: 'Intelligent GPU orchestration and fractionalization',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.exostellar.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'Exostellar', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl:
            'https://github.com/Exostellar/docs/tree/main/',
          lastVersion: 'v1.0.0',
          includeCurrentVersion: true,
          versions: {
            current: {
              label: 'v1.1.0-dev 🚧',
              banner: 'unreleased',
            },
            'v1.0.0': {
              label: 'v1.0.0',
              banner: 'none',
            },
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '',
      logo: {
        alt: 'Exostellar Logo',
        src: 'img/exostellar-logo.svg',
        href: 'https://exostellar.ai',
        target: '_self',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docsVersionDropdown',
          position: 'left',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              type: 'html',
              value: '<hr class="dropdown-separator">',
            },
            {
              type: 'html',
              className: 'dropdown-archived-versions',
              value: '<b>Archived versions</b>',
            },
            {
              to: '/versions',
              label: 'All versions',
            },
          ],
        },
        {
          href: 'https://github.com/Exostellar/docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Product',
          items: [
            {
              label: 'GPU Flex',
              to: '/gpu-flex/overview',
            },
            {
              label: 'ClusterOps',
              to: '/clusterops/overview',
            },
          ],
        },
        {
          title: 'Getting Started',
          items: [
            {
              label: 'Quickstart',
              to: '/getting-started/quickstart',
            },
            {
              label: 'AWS Installation',
              to: '/getting-started/install-aws',
            },
            {
              label: 'Troubleshooting',
              to: '/getting-started/troubleshooting',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'API Reference',
              to: '/api-reference/rest-api',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Exostellar/docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Exostellar, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
