import { useSession, signIn, signOut } from 'next-auth/react';

export default function Test() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="pt-6 flex flex-row justify-center text-green-700">
        <div className="flex flex-row items-center">
          Signed in as {session.user.email} <br />
          <button
            className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="pt-6 flex flex-row justify-center text-red-700">
      <div className="flex flex-row items-center">
        Not signed in <br />
        <button
          className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
