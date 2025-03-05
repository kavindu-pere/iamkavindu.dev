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
      
      // Parse markdown list items with format: "- Platform: [url](url)"
      const socialLinks: Partial<SocialLinks> = {};
      
      // Match for LinkedIn
      const linkedinMatch = fileContent.match(/- LinkedIn:[^\[]*\[([^\]]+)\]/i);
      if (linkedinMatch && linkedinMatch[1]) {
        socialLinks.linkedin = sanitizeUrl(linkedinMatch[1]);
      }
      
      // Match for GitHub
      const githubMatch = fileContent.match(/- GitHub:[^\[]*\[([^\]]+)\]/i);
      if (githubMatch && githubMatch[1]) {
        socialLinks.github = sanitizeUrl(githubMatch[1]);
      }
      
      // Match for Medium
      const mediumMatch = fileContent.match(/- Medium:[^\[]*\[([^\]]+)\]/i);
      if (mediumMatch && mediumMatch[1]) {
        socialLinks.medium = sanitizeUrl(mediumMatch[1]);
      }
      
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