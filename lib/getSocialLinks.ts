import fs from 'fs';
import path from 'path';

interface SocialLinks {
  linkedin: string;
  github: string;
  medium: string;
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function sanitizeUrl(url: string): string {
  if (!url) return '#';
  if (!isValidUrl(url)) return '#';
  
  // Only allow specific domains for security
  const allowedDomains = [
    'linkedin.com',
    'github.com',
    'medium.com'
  ];
  
  try {
    const urlObj = new URL(url);
    if (!allowedDomains.some(domain => urlObj.hostname.endsWith(domain))) {
      console.warn(`Invalid domain detected: ${urlObj.hostname}`);
      return '#';
    }
    return url;
  } catch {
    return '#';
  }
}

export function getSocialLinks(): SocialLinks {
  try {
    // Make sure this runs on the server side only
    if (typeof window === 'undefined') {
      const filePath = path.join(process.cwd(), 'public/data/social-links.md');
      
      if (!fs.existsSync(filePath)) {
        console.error("social-links.md not found");
        return getDefaultLinks();
      }

      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Extract content between --- markers
      const match = fileContent.match(/---\n([\s\S]*?)\n---/);
      
      if (!match) {
        console.error("Invalid markdown format in social-links.md");
        return getDefaultLinks();
      }
      
      const content = match[1];
      const lines = content.split('\n');
      
      const socialLinks: Partial<SocialLinks> = {};
      
      lines.forEach(line => {
        const colonIndex = line.indexOf(': ');
        if (colonIndex > -1) {
          const key = line.substring(0, colonIndex).trim();
          const value = line.substring(colonIndex + 2).trim();
          if (key && value) {
            socialLinks[key as keyof SocialLinks] = sanitizeUrl(value);
          }
        }
      });
      
      const links = {
        linkedin: socialLinks.linkedin || getDefaultLinks().linkedin,
        github: socialLinks.github || getDefaultLinks().github,
        medium: socialLinks.medium || getDefaultLinks().medium
      };

      // Final validation of all URLs
      return {
        linkedin: sanitizeUrl(links.linkedin),
        github: sanitizeUrl(links.github),
        medium: sanitizeUrl(links.medium)
      };
    }
  } catch (error) {
    console.error("Error reading social links:", error);
  }
  
  return getDefaultLinks();
}

function getDefaultLinks(): SocialLinks {
  return {
    linkedin: 'https://linkedin.com/in/iamkavindu',
    github: 'https://github.com/kavindu-pere',
    medium: 'https://medium.com/@kavindu-pere'
  };
}