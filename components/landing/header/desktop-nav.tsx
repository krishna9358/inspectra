'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from './nav-items';
import { useEffect, useState } from 'react';

export default function DesktopNav() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    // Get initial hash
    setActiveHash(window.location.hash);

    // Listen for hash changes
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Check if a nav item is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' && !activeHash;
    }
    if (href.includes('#')) {
      const hash = href.split('#')[1];
      return activeHash === `#${hash}`;
    }
    return pathname === href;
  };

  return (
    <nav className="hidden lg:flex lg:items-center bg-[#F9FAFB] dark:bg-white/3 rounded-full p-1 max-h-fit">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => {
            if (item.href.includes('#')) {
              setActiveHash(`#${item.href.split('#')[1]}`);
            } else {
              setActiveHash('');
            }
          }}
          className={cn(
            'text-gray-500 dark:text-gray-400 text-sm px-4 py-1.5 rounded-full hover:text-primary-500 font-medium',
            {
              'bg-white dark:bg-white/5 font-medium text-gray-800 dark:text-white/90 shadow-xs':
                isActive(item.href),
            }
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
