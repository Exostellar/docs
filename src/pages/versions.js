import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const versions = require('../../versions.json');

function Version() {
  const {siteConfig} = useDocusaurusContext();
  const currentVersion = versions.length > 0 ? versions[0] : null;
  const pastVersions = versions.filter(version => version !== currentVersion);

  return (
    <Layout
      title="Versions"
      description="Exostellar Documentation Versions">
      <main className="container margin-vert--lg">
        <h1>Exostellar Documentation Versions</h1>
        
        <div className="margin-bottom--lg">
          <h2>Current Version (Stable)</h2>
          <table className="table">
            <tbody>
              <tr>
                <th>v1.0.0</th>
                <td>
                  Latest stable release
                  {' '}
                  <Link to="/">Documentation</Link>
                  {' '}
                  <Link to="https://github.com/Exostellar/docs/releases/tag/v1.0.0">
                    Release Notes
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="margin-bottom--lg">
          <h2>Development Version</h2>
          <table className="table">
            <tbody>
              <tr>
                <th>v1.1.0-dev</th>
                <td>
                  Latest development version with upcoming features
                  {' '}
                  <Link to="/next/">Documentation</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="margin-bottom--lg">
          <h2>Past Versions</h2>
          <table className="table">
            <tbody>
              <tr>
                <th>v0.3.0</th>
                <td>
                  <Link to="/v0.3.0/">Documentation</Link>
                  {' '}
                  <Link to="/v0.3.0/release-notes/v0.1.0">Release Notes</Link>
                </td>
              </tr>
              <tr>
                <th>v0.2.0</th>
                <td>
                  <Link to="/v0.2.0/">Documentation</Link>
                  {' '}
                  <Link to="/v0.2.0/release-notes/v0.1.0">Release Notes</Link>
                </td>
              </tr>
              <tr>
                <th>v0.1.0</th>
                <td>
                  Initial release
                  {' '}
                  <Link to="/v0.1.0/">Documentation</Link>
                  {' '}
                  <Link to="/v0.1.0/release-notes/v0.1.0">Release Notes</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="margin-bottom--lg">
          <h2>Version Support</h2>
          <p>
            We maintain documentation for the current stable release and the development version.
            Past versions are archived for reference but may not receive updates.
          </p>
          
          <h3>Support Policy</h3>
          <ul>
            <li><strong>Current Stable (v1.0.0)</strong>: Full support with regular updates</li>
            <li><strong>Development (v1.1.0-dev)</strong>: Latest features, may be unstable</li>
            <li><strong>Previous Versions</strong>: Archived for reference, no active updates</li>
          </ul>
        </div>

        <div>
          <h2>Help</h2>
          <p>
            If you're looking for a specific version or having trouble finding documentation:
          </p>
          <ul>
            <li>Use the version dropdown in the navbar</li>
            <li>Check our <Link to="/support/faq">FAQ</Link> for common questions</li>
            <li>Join our <a href="https://discord.gg/exostellar">Discord community</a></li>
          </ul>
        </div>
      </main>
    </Layout>
  );
}

export default Version;
