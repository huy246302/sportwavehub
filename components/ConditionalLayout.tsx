'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import CategoriesHeader from './CategoriesHeader';
import ScrollToTopButton from './ScrollToTopButton';

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
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (!isBlogsPage || !categoriesHeaderRef.current || !headerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.bottom <= 0) {
          categoriesHeaderRef.current?.classList.add('fixed');
          categoriesHeaderRef.current!.style.top = '0px';
        } else {
          categoriesHeaderRef.current?.classList.remove('fixed');
          categoriesHeaderRef.current!.style.top = `${headerHeight}px`;
        }
      },
      { rootMargin: `0px 0px 0px 0px` }
    );

    observer.observe(headerRef.current);

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
    };
  }, [headerHeight, isBlogsPage]);

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
      {isBlogsPage && (
        <div ref={categoriesHeaderRef} style={{ top: `${headerHeight}px` }}>
          <CategoriesHeader />
        </div>
      )}

      {/* Main content area with appropriate top margin */}
      <main className={`${isBlogsPage ? 'mt-28' : 'mt-16'} flex-1 relative`}>
        {children}
        <ScrollToTopButton />
      </main>

      <Footer />
    </div>
  );
};

export default ConditionalLayout;
