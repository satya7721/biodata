'use client';

import { useSearchParams } from 'next/navigation';
import BiodataForm from '@/components/BiodataForm';

export default function CanvasPage() {
  const searchParams = useSearchParams();
  const theme = searchParams.get('theme');
  const showShree = searchParams.get('showShree') !== 'false'; // Convert to boolean

  return (
    <div className="container mx-auto p-4">
      <div 
        className={`bg-white shadow-lg mx-auto w-[210mm] min-h-[297mm] ${
          theme === 'theme1' ? 'theme1-background' : ''
        }`}
        style={{
          ...(theme === 'theme1' ? {
            backgroundImage: 'url(/pro1.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          } : {}),
          padding: '15mm',
        }}
      >
        <BiodataForm theme={theme} showShree={showShree} />
      </div>
    </div>
  );
} 