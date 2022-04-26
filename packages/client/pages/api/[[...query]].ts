import { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { getSession } from 'next-auth/react';

export class Proxy {
  public get() {
    return createProxyMiddleware({
      target: process.env.API_URL,
      changeOrigin: true,
      secure: false,
    });
  }
}

const runMiddleware = (
  req: Request,
  res: Response,
  fn: (req: Request, res: Response, fn: NextFunction) => void
) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });

const proxy = new Proxy();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handler(req: any, res: any) {
  const session = await getSession({ req });
  if (session) {
    console.log(session);
    req.headers['Authorization'] = `Bearer ${session.accessToken}`;
  }
  await runMiddleware(req, res, proxy.get());
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
