'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CategoriesHeader from './CategoriesHeader';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const isBlogsPage = pathname.startsWith('/blogs');

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      {/* Main Header */}
      <Header />

      {/* CategoriesHeader conditionally rendered */}
      {isBlogsPage && <CategoriesHeader />}

      {/* Main content area with appropriate top margin */}
      <main className={`${isBlogsPage ? 'mt-28' : 'mt-16'} flex-1`}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default ConditionalLayout;
