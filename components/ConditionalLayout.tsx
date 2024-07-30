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

  const showCategoriesHeader = pathname === '/blogs' || pathname.startsWith('/blogs/');

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      {/* Main Header */}
      <Header />
      
      {/* Conditionally render CategoriesHeader */}
      {showCategoriesHeader && (
        <div className="relative">
          <CategoriesHeader />
        </div>
      )}
      
      <main className={`flex-1 ${showCategoriesHeader ? 'pt-20' : ''}`}> {/* Add padding if CategoriesHeader is shown */}
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default ConditionalLayout;
