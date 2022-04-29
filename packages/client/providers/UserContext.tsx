import { createContext } from 'react';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

interface UserContextProps {
  getSession: () => Promise<Session>;
  isLoggedIn: () => Promise<boolean>;
}

export const UserContext = createContext<UserContextProps>({
  getSession: async () => {
    return await getSession();
  },
  isLoggedIn: async () => {
    const session = await getSession();
    return Boolean(session);
  },
});

export default UserContext;
