import config from '../config';

export function Index() {
  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl dark:text-white font-bold underline">
          {config.appName}
        </h1>
      </div>
    </>
  );
}

export default Index;
