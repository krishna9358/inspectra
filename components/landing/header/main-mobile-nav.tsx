'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from './nav-items';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
}

export default function MainMobileNav({ isOpen }: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="lg:hidden h-screen absolute top-full bg-white dark:bg-dark-primary w-full border-b border-gray-200 dark:border-gray-800">
      <div className="flex flex-col justify-between">
        <div className="flex-1 overflow-y-auto">
          <div className="pt-2 pb-3 space-y-1 px-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-3 py-2 rounded-md text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
                  {
                    'text-gray-800 dark:text-white': pathname === item.href,
                  }
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col pt-2 pb-3 space-y-3 px-8">
          <Link
            href="/login"
            className="text-sm block w-full border h-11 border-gray-200 px-5 py-3 rounded-full text-center font-medium text-gray-700 dark:text-gray-400 hover:text-primary-500"
          >
            Sign In
          </Link>

          <Link
            href="/login"
            className="flex items-center px-5 py-3 gradient-btn justify-center text-sm text-white rounded-full button-bg h-11"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
}
