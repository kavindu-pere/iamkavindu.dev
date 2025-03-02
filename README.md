# Personal Portfolio Website

This is the personal portfolio website for Kavindu Perera, built with Next.js and deployed on GitHub Pages.

## Security Features

- Content Security Policy (CSP) implementation
- Secure external link handling
- URL sanitization for social media links
- Image loading security measures
- HTTP security headers
- GitHub Actions workflow security

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Type checking
npm run typecheck

# Build for production
npm run build
```

## Security Considerations

### Environment Variables
All sensitive information should be managed through GitHub Secrets and not committed to the repository.

### External Links
All external links are sanitized and restricted to allowed domains (LinkedIn, GitHub, Medium).

### Content Security
The site implements a strict Content Security Policy to prevent XSS attacks and other security vulnerabilities.

## Deployment

The site is automatically deployed to GitHub Pages through GitHub Actions when changes are pushed to the main branch.

### Deployment Security
- All dependencies are automatically audited during build
- TypeScript type checking is enforced
- Secure headers are automatically applied
- Image optimization is handled by Next.js

## Contributing

1. Create a feature branch
2. Make your changes
3. Run type checking and build
4. Submit a pull request

## Security Reporting

If you discover any security-related issues, please email directly instead of using the issue tracker.

## License

All rights reserved. This source code is the property of Kavindu Perera.
