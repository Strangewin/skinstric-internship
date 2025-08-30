/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/camera',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'camera=*, microphone=*'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
