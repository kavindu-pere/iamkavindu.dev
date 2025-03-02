import fs from 'fs';
import path from 'path';

interface SocialLinks {
  linkedin: string;
  github: string;
  medium: string;
}

export function getSocialLinks(): SocialLinks {
  try {
    // Make sure this runs on the server side only
    if (typeof window === 'undefined') {
      const filePath = path.join(process.cwd(), 'public/data/social-links.md');
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Extract content between --- markers
      const match = fileContent.match(/---\n([\s\S]*?)\n---/);
      
      if (!match) {
        console.error("No match found in social-links.md");
        return getDefaultLinks();
      }
      
      const content = match[1];
      const lines = content.split('\n');
      
      const socialLinks: Partial<SocialLinks> = {};
      
      lines.forEach(line => {
        // More robust splitting to handle URLs that might contain colons
        const colonIndex = line.indexOf(': ');
        if (colonIndex > -1) {
          const key = line.substring(0, colonIndex).trim();
          const value = line.substring(colonIndex + 2).trim();
          if (key && value) {
            socialLinks[key as keyof SocialLinks] = value;
          }
        }
      });
      
      return {
        linkedin: socialLinks.linkedin || getDefaultLinks().linkedin,
        github: socialLinks.github || getDefaultLinks().github,
        medium: socialLinks.medium || getDefaultLinks().medium
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