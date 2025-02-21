'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const themes = [
  {
    id: 'traditional',
    name: 'पारंपारिक',
    color: 'bg-orange-600',
    border: 'border-4 border-orange-300',
    pattern: 'bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]',
    image: '/pro1.png'
  },
  {
    id: 'modern',
    name: 'आधुनिक',
    color: 'bg-blue-600',
    border: 'border-2 border-dashed border-blue-300',
    pattern: 'bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]'
  },
  {
    id: 'elegant',
    name: 'अभिजात',
    color: 'bg-purple-600',
    border: 'border-4 border-double border-purple-300',
    pattern: 'bg-[linear-gradient(135deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%)]'
  },
  {
    id: 'simple',
    name: 'साधे',
    color: 'bg-green-600',
    border: 'border-2 border-dotted border-green-300',
    pattern: 'bg-[repeating-radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,rgba(255,255,255,0.1)_10px,transparent_10px,transparent_20px)]'
  },
];

export default function ThemeSelector() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState('traditional');

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    // Navigate to the form page with the selected theme
    router.push(`/canvas?theme=${themeId}`);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">थीम निवडा</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeSelect(theme.id)}
            className={`
              relative
              overflow-hidden
              text-white 
              p-4 
              rounded-lg 
              transition-all 
              duration-300 
              hover:scale-105
              min-h-[120px]
              ${theme.border}
              ${selectedTheme === theme.id 
                ? 'ring-4 ring-offset-2 shadow-lg transform scale-105' 
                : 'hover:shadow-md'
              }
            `}
          >
            {theme.id === 'traditional' ? (
              <>
                <div className="absolute inset-0">
                  <Image
                    src={theme.image || ''}
                    alt={theme.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-black/30" />
              </>
            ) : (
              <div className={`absolute inset-0 ${theme.color} ${theme.pattern}`} />
            )}
            <span className="relative z-10">{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
} 