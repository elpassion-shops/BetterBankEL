const IS_BROWSER = typeof window !== 'undefined';

export const setupMocks = async () => {
  if (IS_BROWSER) {
    const { mswWorker } = require('./mswWorker');
    await mswWorker.start();
  } else {
    const { mswServer } = require('./mswServer');
    mswServer.listen();
  }
};
