// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  rewrites: [
    {
      source: '/login',
      destination: 'http://localhost:3333/api/login',
    },
    {
      source: '/me',
      destination: 'http://localhost:3333/api/me',
    },
  ],
};

module.exports = withNx(nextConfig);
