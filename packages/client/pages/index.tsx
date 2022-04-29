import React, { useContext, useEffect } from 'react';
import UserContext from '../providers/UserContext';

export default function Index() {
  const { getSession } = useContext(UserContext);

  useEffect(() => {
    fetch();

    async function fetch() {
      const data = await getSession();
      if (data) {
        console.log('Hello user');
      } else {
        console.log('Hello guest');
      }
    }
  }, [getSession]);

  return (
    <>
      <p>Home page</p>
    </>
  );
}
