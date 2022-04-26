import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

export default (req: NextApiRequest, res: NextApiResponse) =>
  httpProxyMiddleware(req, res, {
    target: 'http://localhost:4200',
    pathRewrite: {
      '^/api/login': 'http://localhost:3333/api/login',
      '^/api/me': 'http://localhost:3333/api/me',
    },
  });
