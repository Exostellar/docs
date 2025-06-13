# OAuth / SSO Integration

Configure OAuth and Single Sign-On integration with your identity provider.

## Overview

OAuth and SSO integration enables secure, seamless authentication by delegating user authentication to your organization's identity provider.

## Prerequisites

Before configuring OAuth/SSO integration:

- Administrative access to your identity provider
- Exostellar platform administrator permissions
- Network connectivity between systems
- SSL/TLS certificates properly configured

## Configuration Steps

### 1. Identity Provider Setup

#### Register Exostellar Application
```
Application Name: Exostellar Platform
Redirect URI: https://your-exostellar-domain.com/auth/callback
Grant Types: Authorization Code, Refresh Token
Scopes: openid, profile, email, groups
```

#### Gather Configuration Details
- Client ID
- Client Secret
- Authorization Endpoint
- Token Endpoint
- User Info Endpoint
- Logout URL

### 2. Exostellar Platform Configuration

#### Configure OAuth Settings
```yaml
oauth:
  provider: "your-provider"
  client_id: "your-client-id"
  client_secret: "your-client-secret"
  discovery_url: "https://your-provider.com/.well-known/openid-configuration"
  scopes: ["openid", "profile", "email", "groups"]
```

#### User Attribute Mapping
```yaml
user_mapping:
  username: "preferred_username"
  email: "email"
  first_name: "given_name"
  last_name: "family_name"
  groups: "groups"
```

## Provider-Specific Configurations

### Azure Active Directory
```yaml
oauth:
  provider: "azure"
  tenant_id: "your-tenant-id"
  client_id: "your-application-id"
  client_secret: "your-client-secret"
  authority: "https://login.microsoftonline.com/your-tenant-id"
```

### Google Workspace
```yaml
oauth:
  provider: "google"
  client_id: "your-client-id.apps.googleusercontent.com"
  client_secret: "your-client-secret"
  hosted_domain: "your-company.com"
```

### Okta
```yaml
oauth:
  provider: "okta"
  domain: "your-company.okta.com"
  client_id: "your-client-id"
  client_secret: "your-client-secret"
```

## Testing Integration

### 1. Test Authentication Flow
1. Navigate to Exostellar login page
2. Click "Sign in with SSO"
3. Complete authentication with identity provider
4. Verify successful login and user profile

### 2. Validate User Attributes
- Check user profile information
- Verify group/role mappings
- Test permission assignments

### 3. Test Logout Process
- Initiate logout from Exostellar
- Verify logout from identity provider
- Confirm session termination

## Troubleshooting

### Common Issues

#### Authentication Failures
- Verify client ID and secret
- Check redirect URI configuration
- Validate network connectivity

#### User Attribute Issues
- Review attribute mapping configuration
- Check identity provider claims
- Verify scope permissions

#### Permission Problems
- Validate group mappings
- Check role assignments
- Review access control policies

## Security Considerations

### Best Practices
- Use HTTPS for all communications
- Regularly rotate client secrets
- Implement proper session management
- Monitor authentication logs

### Compliance
- Ensure GDPR/privacy compliance
- Implement audit logging
- Regular security assessments
- Access review procedures

## Related Sections

- [User Access Control](../user-access-control.md)
- [Identity Providers Overview](index.md)
