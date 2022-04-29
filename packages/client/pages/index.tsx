import React, { useContext, useEffect } from 'react';
import UserContext from '../providers/UserContext';

export default function Index() {
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    fetch();

    async function fetch() {
      if (await isLoggedIn()) {
        console.log('Hello user');
      } else {
        console.log('Hello guest');
      }
    }
  }, [isLoggedIn]);

  return (
    <>
      <p>Home page</p>
    </>
  );
}
