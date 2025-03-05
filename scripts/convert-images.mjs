import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const sizes = [256, 384, 512, 640, 768, 1024, 1280];
const quality = 85;

async function convertToWebP() {
  try {
    const inputFile = path.join(publicDir, 'profilepicture.png');
    
    // Generate different sizes
    for (const width of sizes) {
      await sharp(inputFile)
        .resize(width, width, { fit: 'contain' })
        .webp({ quality })
        .toFile(path.join(publicDir, `profilepicture-${width}w-q${quality}.webp`));
    }
    
    console.log('Successfully converted images to WebP in multiple sizes');
  } catch (error) {
    console.error('Error converting images:', error);
  }
}

convertToWebP();