/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
        {
          protocol: 'https',
          hostname: 'www.ephremtube.com',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
        {
          protocol: 'https',
          hostname: 'cdn.gamma.app',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
        {
          protocol: 'https',
          hostname: 'example.com',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
        {
          protocol: 'https',
          hostname: 'assets.aceternity.com',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
        {
          protocol: 'https',
          hostname: 'www.welana.com',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
        {
          protocol: 'https',
          hostname: 'www.rumispice.com',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
        {
          protocol: 'https',
          hostname: 'cdn.britannica.com',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
        {
          protocol: 'https',
          hostname: 'artincontext.org',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
        {
          protocol: 'https',
          hostname: 'thumbs.dreamstime.com',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
        {
          protocol: 'https',
          hostname: 'upload.wikimedia.org',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
        {
          protocol: 'https',
          hostname: 'c7.alamy.com',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
        {
          protocol: 'https',
          hostname: 'cdn.shopify.com',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
        {
          protocol: 'https',
          hostname: 'i.pinimg.com',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
        {
          protocol: 'https',
          hostname: 'pageaucarvings.com',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
        {
          protocol: 'https',
          hostname: 'i.pravatar.cc',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
      ],
    },
  };
  
 export default nextConfig;
  