import Link from 'next/link';
import React, { ReactNode } from 'react';
import config from '../config';
import { BankAppAPI } from '../helpers/BankAPI';

export const BankAppApiContext = React.createContext({
  BankAppAPI: BankAppAPI,
});

export default function Index() {
  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold underline">{config.appName}</h1>

        <ul>
          <li>
            <MenuLink href="/account">Account Details</MenuLink>
          </li>
          <li>
            <MenuLink href="/login">Login</MenuLink>
          </li>
          <li>
            <MenuLink href="/SampleLoginForm">SampleLoginForm</MenuLink>
          </li>
          <li>
            <MenuLink href="/test">Test</MenuLink>
          </li>
        </ul>
      </div>
    </>
  );
}

interface MenuLinkProps {
  href: string;
  children: ReactNode;
}
function MenuLink({ children, href }: MenuLinkProps) {
  return (
    <Link href={href} passHref>
      <a className="inline-block hover:underline">{children}</a>
    </Link>
  );
}
