module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://gancle-studio.tech/:path*'
      }
    ];
  }
};
