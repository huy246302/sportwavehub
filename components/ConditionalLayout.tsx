'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import CategoriesHeader from './CategoriesHeader';
import ScrollToTopButton from './ScrollToTopButton'; // Import the ScrollToTopButton

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const isBlogsPage = pathname.startsWith('/blogs');
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isHomePage = pathname === '/';

  const categoriesHeaderRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isBlogsPage || !categoriesHeaderRef.current || !headerRef.current) return;

    const headerHeight = headerRef.current.offsetHeight;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          categoriesHeaderRef.current?.classList.remove('sticky');
        } else {
          categoriesHeaderRef.current?.classList.add('sticky');
        }
      },
      { rootMargin: `-${headerHeight}px 0px 0px 0px` }
    );

    observer.observe(headerRef.current);

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
    };
  }, [isBlogsPage]);

  if (isAuthPage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        {children}
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      {/* Main Header */}
      <div ref={headerRef}>
        <Header isHomePage={isHomePage} />
      </div>

      {/* CategoriesHeader conditionally rendered */}
      {isBlogsPage && <CategoriesHeader ref={categoriesHeaderRef} />}

      {/* Main content area with appropriate top margin */}
      <main className={`${isBlogsPage ? 'mt-28' : 'mt-16'} flex-1 relative`}>
        {children}
        <ScrollToTopButton /> {/* Move ScrollToTopButton inside main */}
      </main>

      <Footer />
    </div>
  );
};

export default ConditionalLayout;
