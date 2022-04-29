import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../components/Container';
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
          <div className="flex justify-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_CLIENT}/logo.png`}
              width={300}
              height={300}
              alt="logo"
            />
          </div>

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
