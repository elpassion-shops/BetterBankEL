import React, { ReactNode } from 'react';
import Link from 'next/link';
import Container from '../components/Container';
import config from '../config';
import { useSession } from 'next-auth/react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { status } = useSession();

  return (
    <>
      <header>
        <Container>
          <h1 className="text-3xl font-bold underline">{config.appName}</h1>

          <ul className="flex space-x-6">
            <li>
              <MenuLink href="/">Home</MenuLink>
            </li>
            {status == 'authenticated' && (
              <li>
                <MenuLink href="/account">Account Details</MenuLink>
              </li>
            )}
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
        </Container>
      </header>

      <main className="py-4">
        <Container>{children}</Container>
      </main>
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
