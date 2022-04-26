import Link from 'next/link';
import React from 'react';
import AccountDetails from '../components/AccountDetails';
import config from '../config';

export function Index() {
  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold underline">{config.appName}</h1>

        <AccountDetails />
        <ul>
          <li>
            <Link href="/account">Account Details</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Index;
