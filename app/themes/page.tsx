'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ThemeSelector from '@/components/ThemeSelector';
import { useState } from 'react';

const themes = [
  {
    id: 'theme1',
    name: 'भगवा किनार',
    image: '/pro1.png',
    previewStyle: {
      backgroundImage: 'url(/pro1.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    },
    printStyle: `
      @media print {
        .theme1-background {
          background-image: url(/pro1.png) !important;
          background-size: cover !important;
          background-position: center !important;
          background-repeat: no-repeat !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `,
    border: 'border-orange-500',
    borderWidth: 'border-[3px]',
    showShree: true
  },
  {
    id: 'theme2',
    name: 'साधे पांढरे',
    color: 'bg-neutral-50',
    image: '/themes/theme2.png',
    border: 'border-neutral-300'
  },
  {
    id: 'theme3',
    name: 'लाल किनार',
    color: 'bg-white',
    image: '/themes/theme3.png',
    border: 'border-red-600'
  },
  {
    id: 'theme4',
    name: 'हत्ती डिझाईन',
    color: 'bg-red-50',
    image: '/themes/theme4.png',
    border: 'border-red-800'
  },
  {
    id: 'theme5',
    name: 'जांभळी किनार',
    color: 'bg-purple-50',
    image: '/themes/theme5.png',
    border: 'border-purple-800'
  },
  {
    id: 'theme6',
    name: 'सोनेरी किनार',
    color: 'bg-amber-50',
    image: '/themes/theme6.png',
    border: 'border-amber-800'
  },
  {
    id: 'theme7',
    name: 'हिरवी किनार',
    color: 'bg-green-50',
    image: '/themes/theme7.png',
    border: 'border-green-800'
  },
  {
    id: 'theme8',
    name: 'साधे सुंदर',
    color: 'bg-white',
    image: '/themes/theme8.png',
    border: 'border-gray-300'
  },
];

export default function ThemesPage() {
  const router = useRouter();
  const [showShree, setShowShree] = useState(true);

  const selectTheme = (themeId: string) => {
    if (themeId === 'theme1') {
      const styleElement = document.createElement('style');
      const theme = themes.find(t => t.id === themeId);
      if (theme?.printStyle) {
        styleElement.innerHTML = theme.printStyle;
        document.head.appendChild(styleElement);
      }
    }
    router.push(`/canvas?theme=${themeId}&showShree=${showShree}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">थीम सेटिंग्ज</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <ThemeSelector />
          
          <div className="mb-6 flex items-center space-x-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showShree}
                onChange={(e) => setShowShree(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-orange-500"
              />
              <span className="text-sm font-medium">श्री दाखवा</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className="flex flex-col items-center"
              >
                <div 
                  className="relative w-full aspect-[3/4] mb-4 group cursor-pointer"
                  onClick={() => selectTheme(theme.id)}
                >
                  <div 
                    className={`absolute inset-0 border-2 ${theme.border} rounded-lg overflow-hidden ${
                      theme.id === 'theme1' ? 'theme1-background' : ''
                    }`}
                    style={theme.id === 'theme1' ? theme.previewStyle : undefined}
                  >
                    {theme.id !== 'theme1' && (
                      <Image
                        src={theme.image}
                        alt={theme.name}
                        fill
                        className="object-cover p-1"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg" />
                </div>
                <h3 className="text-lg font-medium text-center mb-2">{theme.name}</h3>
                <Button
                  onClick={() => selectTheme(theme.id)}
                  variant="outline"
                  className="w-32"
                >
                  निवडा
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 