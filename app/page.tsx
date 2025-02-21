import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Palette, Download, Languages } from 'lucide-react';

const features = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'सुंदर बायोडाटा',
    description: 'व्यावसायिक दिसणारा बायोडाटा तयार करा',
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'विविध थीम्स',
    description: 'तुमच्या आवडीनुसार थीम निवडा',
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: 'PDF डाउनलोड',
    description: 'बायोडाटा PDF स्वरूपात डाउनलोड करा',
  },
  {
    icon: <Languages className="w-6 h-6" />,
    title: 'द्विभाषिक',
    description: 'मराठी आणि इंग्रजी भाषेत उपलब्ध',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">मराठी बायोडाटा मेकर</h1>
          <p className="text-xl text-gray-600 mb-8">सुंदर आणि व्यावसायिक बायोडाटा तयार करा</p>
          <Link href="/themes">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              बायोडाटा तयार करा
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="text-orange-500 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
