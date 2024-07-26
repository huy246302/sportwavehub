'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  if (pathname === '/login') {
    return (
      <div className="bg-login-background text-login-foreground min-h-screen flex flex-col items-center justify-center">
        {children}
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="min-h-screen flex flex-col items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default ConditionalLayout;
