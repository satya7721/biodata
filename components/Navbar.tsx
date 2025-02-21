'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, Palette, Info, Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const { t, language, toggleLanguage } = useLanguage();

  const navItems = [
    { name: t('nav.home'), href: '/', icon: Home },
    { name: t('nav.themes'), href: '/themes', icon: Palette },
    { name: t('nav.about'), href: '/about', icon: Info },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4">
      <nav className="flex items-center justify-between px-4 py-2 bg-white/80 backdrop-blur-md border-3 border-white rounded-full shadow-sm max-w-2xl w-full">
        <div className="flex items-center space-x-2">
          {/* Logo */}
          <Link href="/" className="p-2">
            <span className="text-xl font-bold">:k</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="flex items-center gap-2"
                    size="sm"
                  >
                    <Icon className="w-4 h-4" />
                    {item.name} ok
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Language Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLanguage}
          className="w-8 h-8"
        >
          <Languages className="w-4 h-4" />
          <span className="sr-only">
            {language === 'en' ? 'Switch to Marathi' : 'Switch to English'}
          </span>
        </Button>
      </nav>
    </div>
  );
} 