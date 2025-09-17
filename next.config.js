/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  
  eslint: {
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },
  
  // ... rest of your config
};

module.exports = nextConfig;