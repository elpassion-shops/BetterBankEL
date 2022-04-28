import { createContext } from 'react';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

interface UserContextProps {
  getSession: () => Promise<Session>;
}

export const UserContext = createContext<UserContextProps>({
  getSession: async () => {
    return await getSession();
  },
});

export default UserContext;
