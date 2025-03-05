export default function imageLoader({ src, width, quality = 85 }: { src: string, width: number, quality?: number }) {
  const imageUrl = new URL(src, 'https://iamkavindu.dev');
  const extension = imageUrl.pathname.split('.').pop();
  
  // For local images, return optimized WebP version
  if (src.startsWith('/')) {
    const basePath = src.replace(`.${extension}`, '');
    return `${basePath}-${width}w-q${quality}.webp`;
  }

  return src;
}