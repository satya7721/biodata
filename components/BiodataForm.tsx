'use client';
import { useState } from 'react';
import Modal from './Modal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Image from 'next/image';

interface BiodataFormData {
  fullName: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  religion: string;
  caste: string;
  kuldevta: string;
  rashi: string;
  nakshatra: string;
  gan: string;
  nadi: string;
  manglik: string;
  gotra: string;
  height: string;
  complexion: string;
  bloodGroup: string;
  education: string;
  occupation: string;
  income: string;
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  siblings: string;
  maternalUncle: string;
  relatives: string;
  expectations: string;
  address: string;
  mobile: string;
  showOptionalFields: {
    birthTime: boolean;
    birthPlace: boolean;
    kuldevta: boolean;
    gan: boolean;
    nadi: boolean;
    manglik: boolean;
    gotra: boolean;
    bloodGroup: boolean;
    maternalUncle: boolean;
    relatives: boolean;
    expectations: boolean;
    nakshatra: boolean;
    rashi: boolean;
    height: boolean;
    complexion: boolean;
    education: boolean;
    occupation: boolean;
    income: boolean;
    siblings: boolean;
    address: boolean;
  };
  shreeLogo: string;
  showShreeLogo: boolean;
}

const defaultFormData: BiodataFormData = {
  // वैयक्तिक माहिती
  fullName: 'राहुल राजेश पाटील',
  birthDate: '1995-06-15',
  birthTime: '14:30',
  birthPlace: 'पुणे, महाराष्ट्र',
  religion: 'हिंदू',
  caste: 'मराठा',
  kuldevta: 'श्री खंडोबा',
  rashi: 'मिथुन',
  nakshatra: 'मृगशीर्ष',
  gan: 'देव',
  nadi: 'आदि',
  manglik: 'नाही',
  gotra: 'कश्यप',
  height: '5 फूट 9 इंच',
  complexion: 'गोरा',
  bloodGroup: 'O+',

  // शिक्षण आणि व्यवसाय
  education: 'B.E. (Computer Engineering)',
  occupation: 'Software Engineer - ABC Technologies',
  income: '12 लाख वार्षिक',

  // कौटुंबिक माहिती
  fatherName: 'राजेश रामचंद्र पाटील',
  fatherOccupation: 'सेवानिवृत्त बँक मॅनेजर',
  motherName: 'सुनीता राजेश पाटील',
  motherOccupation: 'गृहिणी',
  siblings: '1 बहीण (विवाहित), 1 भाऊ (अविवाहित)',
  maternalUncle: 'विजय राघव देशमुख',
  relatives: 'पाटील, देशमुख, जाधव',

  // अपेक्षा
  expectations: 'शिक्षित, सुसंस्कृत, नोकरी करणारी मुलगी.\nकुटुंबातील मूल्ये जपणारी.\nवय: 23-27 वर्षे\nशिक्षण: किमान पदवीधर',

  // संपर्क माहिती
  address: '४०१, श्री समर्थ अपार्टमेंट,\nगणेश नगर, पुणे - ४११०५२\nमहाराष्ट्र',
  mobile: '9876543210',

  showOptionalFields: {
    birthTime: true,
    birthPlace: true,
    kuldevta: true,
    gan: true,
    nadi: true,
    manglik: true,
    gotra: true,
    bloodGroup: true,
    maternalUncle: true,
    relatives: true,
    expectations: true,
    nakshatra: true,
    rashi: true,
    height: true,
    complexion: true,
    education: true,
    occupation: true,
    income: true,
    siblings: true,
    address: true,
  },

  shreeLogo: '|| श्री गणेशाय नम: ||',
  showShreeLogo: true,
};

const RASHI_OPTIONS = [
  'मेष',
  'वृषभ',
  'मिथुन',
  'कर्क',
  'सिंह',
  'कन्या',
  'तुला',
  'वृश्चिक',
  'धनु',
  'मकर',
  'कुंभ',
  'मीन',
];

const NAKSHATRA_OPTIONS = [
  'अश्विनी',
  'भरणी',
  'कृत्तिका',
  'रोहिणी',
  'मृगशीर्ष',
  'आर्द्रा',
  'पुनर्वसु',
  'पुष्य',
  'आश्लेषा',
  'मघा',
  'पूर्वा फाल्गुनी',
  'उत्तरा फाल्गुनी',
  'हस्त',
  'चित्रा',
  'स्वाती',
  'विशाखा',
  'अनुराधा',
  'ज्येष्ठा',
  'मूल',
  'पूर्वाषाढा',
  'उत्तराषाढा',
  'श्रवण',
  'धनिष्ठा',
  'शतभिषा',
  'पूर्वा भाद्रपद',
  'उत्तरा भाद्रपद',
  'रेवती',
];

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const GAN_OPTIONS = ['देव', 'मनुष्य', 'राक्षस'];

const NADI_OPTIONS = ['आदि', 'मध्य', 'अंत्य'];

const COMPLEXION_OPTIONS = ['गोरा', 'गहू वर्ण', 'सावळा'];

const SHREE_LOGOS = [
  '|| श्री गणेशाय नम: ||',
  '॥ श्री गणेशाय नमः ॥',
  'श्री गणेशाय नमः',
  '|| जय श्री राम ||',
  '॥ जय श्री राम ॥',
  'जय श्री राम',
  '|| श्री ||',
  '॥ श्री ॥',
  'श्री'
];

interface BiodataFormProps {
  theme?: string | null;
  showShree?: boolean;
}

const getThemeContent = (theme: string | null) => {
  switch (theme) {
    case 'theme1':
      return {
        headerImage: null,
        containerStyles: `bg-[url('/themes/pro1.png')] bg-cover bg-center min-h-screen w-full`,
        contentStyles: 'p-8 pt-24',
        headerStyles: 'text-2xl font-bold text-center mb-8 text-orange-800',
        sectionStyles: 'mb-8',
        sectionTitleStyles: 'text-lg font-semibold mb-4 pb-2 border-b-2 border-orange-800/50',
        textStyles: 'text-gray-900',
      };
    case 'theme2':
      return {
        headerImage: null,
        containerStyles: 'bg-white border-2 border-neutral-300 rounded-lg p-8',
        headerStyles: 'text-2xl font-bold text-center mb-8',
      };
    case 'theme3':
      return {
        headerImage: null,
        containerStyles: 'bg-white border-2 border-red-600 rounded-lg p-8',
        headerStyles: 'text-2xl font-bold text-center mb-8',
      };
    case 'theme4':
      return {
        headerImage: null,
        containerStyles: 'bg-red-50 border-2 border-red-800 rounded-lg p-8',
        headerStyles: 'text-2xl font-bold text-center mb-8',
      };
    case 'theme5':
      return {
        headerImage: null,
        containerStyles: 'bg-purple-50 border-2 border-purple-800 rounded-lg p-8',
        headerStyles: 'text-2xl font-bold text-center mb-8',
      };
    case 'theme6':
      return {
        headerImage: null,
        containerStyles: 'bg-amber-50 border-2 border-amber-800 rounded-lg p-8',
        headerStyles: 'text-2xl font-bold text-center mb-8',
      };
    case 'theme7':
      return {
        headerImage: null,
        containerStyles: 'bg-green-50 border-2 border-green-800 rounded-lg p-8',
        headerStyles: 'text-2xl font-bold text-center mb-8',
      };
    case 'theme8':
      return {
        headerImage: null,
        containerStyles: 'bg-white border-2 border-gray-300 rounded-lg p-8',
        headerStyles: 'text-2xl font-bold text-center mb-8',
      };
    default:
      return {
        headerImage: null,
        containerStyles: 'bg-white border-2 border-gray-300 rounded-lg p-8',
        contentStyles: '',
        headerStyles: 'text-2xl font-bold text-center mb-8',
        sectionStyles: 'mb-8',
        sectionTitleStyles: 'text-lg font-semibold mb-4 pb-2 border-b-2 border-gray-200',
        textStyles: 'text-gray-900',
      };
  }
};

const personalFields: { key: keyof BiodataFormData; label: string }[] = [
  { key: 'fullName', label: 'नाव' },
  { key: 'birthDate', label: 'जन्म तारीख' },
  { key: 'birthTime', label: 'जन्म वेळ' },
  { key: 'birthPlace', label: 'जन्म स्थळ' },
  { key: 'religion', label: 'धर्म' },
  { key: 'caste', label: 'जात' },
  { key: 'kuldevta', label: 'कुलदैवत' },
  { key: 'rashi', label: 'राशी' },
  { key: 'nakshatra', label: 'नक्षत्र' },
  { key: 'gan', label: 'गण' },
  { key: 'nadi', label: 'नाडी' },
  { key: 'manglik', label: 'मांगलिक' },
  { key: 'gotra', label: 'गोत्र' },
  { key: 'height', label: 'ऊंची' },
  { key: 'complexion', label: 'वर्ण' },
  { key: 'bloodGroup', label: 'रक्तगट' },
];

const educationFields: { key: keyof BiodataFormData; label: string }[] = [
  { key: 'education', label: 'शिक्षण' },
  { key: 'occupation', label: 'नोकरी/व्यवसाय' },
  { key: 'income', label: 'वेतन/उत्पन्न' },
];

const familyFields: { key: keyof BiodataFormData; label: string }[] = [
  { key: 'fatherName', label: 'वडिलांचे नाव' },
  { key: 'fatherOccupation', label: 'वडिलांचा व्यवसाय' },
  { key: 'motherName', label: 'आईचे नाव' },
  { key: 'motherOccupation', label: 'आईचा व्यवसाय' },
  { key: 'siblings', label: 'भावंडे' },
  { key: 'maternalUncle', label: 'मामा' },
  { key: 'relatives', label: 'नातेसंबंध' },
];

const contactFields: { key: keyof BiodataFormData; label: string }[] = [
  { key: 'address', label: 'पत्ता' },
  { key: 'mobile', label: 'मोबाईल नंबर' },
];

const PreviewContent = ({ theme, data }: { 
  theme: string | null,
  data: BiodataFormData,
}) => {
  const themeContent = getThemeContent(theme);
  
  return (
    <div className={`${themeContent.containerStyles} h-[297mm] w-[210mm]`}>
      <div className={`${themeContent.contentStyles} p-[15mm] space-y-4`}>
        {data.showShreeLogo && (
          <div className={`${themeContent.headerStyles} text-2xl`}>
            {data.shreeLogo}
          </div>
        )}
        
        <PreviewSection 
          title="वैयक्तिक माहिती" 
          data={data} 
          fields={personalFields}
          themeContent={themeContent}
        />
        <PreviewSection 
          title="शिक्षण आणि व्यवसाय" 
          data={data} 
          fields={educationFields}
          themeContent={themeContent}
        />
        <PreviewSection 
          title="कौटुंबिक माहिती" 
          data={data} 
          fields={familyFields}
          themeContent={themeContent}
        />
        
        {data.expectations && (
          <div className="space-y-2">
            <h5 className="font-semibold text-lg border-b pb-1">अपेक्षा</h5>
            <p className="whitespace-pre-wrap text-sm">{data.expectations}</p>
          </div>
        )}
        
        <PreviewSection 
          title="संपर्क माहिती" 
          data={data} 
          fields={contactFields}
          themeContent={themeContent}
        />
      </div>
    </div>
  );
};

const PreviewSection = ({ title, data, fields, themeContent }: { 
  title: string, 
  data: BiodataFormData,
  fields: { key: keyof BiodataFormData, label: string }[],
  themeContent: any
}) => (
  <div className="space-y-2">
    <h5 className={`${themeContent.sectionTitleStyles} text-lg`}>{title}</h5>
    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
      {fields
        .filter(({ key }) => 
          data.showOptionalFields[key as keyof typeof data.showOptionalFields] ?? true
        )
        .map(({ key, label }) => (
          <div key={key} className="flex justify-between border-b border-gray-200 pb-1">
            <span className={`font-medium ${themeContent.textStyles}`}>{label}:</span>
            <span className={themeContent.textStyles}>{String(data[key] ?? '-')}</span>
          </div>
        ))}
    </div>
  </div>
);

const FormField = ({ 
    label, 
    name, 
    type = "text", 
    value, 
    onChange,
    options,
    showOptionalFields,
    onToggleOptional,
    isOptional = false
  }: {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    options?: string[];
    showOptionalFields?: Record<string, boolean>;
    onToggleOptional?: (field: string, value: boolean) => void;
    isOptional?: boolean;
  }) => {
    const [showPassword, setShowPassword] = useState(false);
    
    if (isOptional && !showOptionalFields?.[name]) {
      return null;
    }
    
    return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium">{label}</label>
        {isOptional && onToggleOptional && (
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={showOptionalFields?.[name] ?? false}
              onChange={(e) => onToggleOptional(name, e.target.checked)}
              className="rounded border-gray-300"
            />
            <span>दाखवा</span>
          </label>
        )}
      </div>
      <div className="relative">
        {options ? (
          <select
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">निवडा</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <>
            <input
              type={type === "password" ? (showPassword ? "text" : "password") : type}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
            {type === "password" && (
              <button
                type="button"
                className="absolute right-2 top-2.5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )};

export default function BiodataForm({ theme = 'theme1', showShree = true }: BiodataFormProps) {
  const [formData, setFormData] = useState<BiodataFormData>(defaultFormData);
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const content = document.getElementById('preview-content');
      if (!content) return;

      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`biodata-${formData.fullName || 'document'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('PDF तयार करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    generatePDF();
  };

  return (
    <div className="max-w-[180mm] mx-auto">
      {showShree && (
        <h1 className="text-3xl font-bold text-center mb-6">श्री</h1>
      )}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="flex items-center gap-4">
            <select
              className="w-64 p-2 border rounded text-center text-xl font-bold focus:ring-2 focus:ring-blue-500"
              value={formData.shreeLogo}
              onChange={(e) => setFormData({...formData, shreeLogo: e.target.value})}
            >
              {SHREE_LOGOS.map((logo) => (
                <option key={logo} value={logo}>
                  {logo}
                </option>
              ))}
            </select>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.showShreeLogo}
                onChange={(e) => setFormData({...formData, showShreeLogo: e.target.checked})}
                className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-orange-500"
              />
              <span className="text-sm font-medium">दाखवा</span>
            </label>
          </div>
        </div>

        {/* वैयक्तिक माहिती */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="नाव"
              name="fullName"
              value={formData.fullName}
              onChange={(value) => setFormData({...formData, fullName: value})}
            />
            <FormField
              label="जन्म तारीख"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(value) => setFormData({...formData, birthDate: value})}
            />
            <FormField
              label="धर्म"
              name="religion"
              value={formData.religion}
              onChange={(value) => setFormData({...formData, religion: value})}
            />
            <FormField
              label="जात"
              name="caste"
              value={formData.caste}
              onChange={(value) => setFormData({...formData, caste: value})}
            />
            <FormField
              label="कुलदैवत"
              name="kuldevta"
              value={formData.kuldevta}
              onChange={(value) => setFormData({...formData, kuldevta: value})}
            />
            <FormField
              label="राशी"
              name="rashi"
              value={formData.rashi}
              onChange={(value) => setFormData({...formData, rashi: value})}
              options={RASHI_OPTIONS}
            />
            <FormField
              label="नक्षत्र"
              name="nakshatra"
              value={formData.nakshatra}
              onChange={(value) => setFormData({...formData, nakshatra: value})}
              options={NAKSHATRA_OPTIONS}
            />
            <FormField
              label="गण"
              name="gan"
              value={formData.gan}
              onChange={(value) => setFormData({...formData, gan: value})}
              options={GAN_OPTIONS}
            />
            <FormField
              label="नाडी"
              name="nadi"
              value={formData.nadi}
              onChange={(value) => setFormData({...formData, nadi: value})}
              options={NADI_OPTIONS}
            />
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">मांगलिक</label>
              <select
                className="w-full p-2 border rounded"
                value={formData.manglik || ''}
                onChange={(e) => setFormData({...formData, manglik: e.target.value})}
              >
                <option value="">निवडा</option>
                <option value="होय">होय</option>
                <option value="नाही">नाही</option>
              </select>
            </div>
            <FormField
              label="गोत्र"
              name="gotra"
              value={formData.gotra}
              onChange={(value) => setFormData({...formData, gotra: value})}
            />
            <FormField
              label="ऊंची"
              name="height"
              value={formData.height}
              onChange={(value) => setFormData({...formData, height: value})}
            />
            <FormField
              label="वर्ण"
              name="complexion"
              value={formData.complexion}
              onChange={(value) => setFormData({...formData, complexion: value})}
              options={COMPLEXION_OPTIONS}
            />
            <FormField
              label="रक्तगट"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={(value) => setFormData({...formData, bloodGroup: value})}
              options={BLOOD_GROUPS}
            />
          </div>
        </section>

        {/* शिक्षण आणि व्यवसाय */}
        <section>
          <h3 className="text-lg font-semibold mb-4 bg-gray-100 p-2 rounded">शिक्षण आणि व्यवसाय</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="शिक्षण"
              name="education"
              value={formData.education}
              onChange={(value) => setFormData({...formData, education: value})}
            />
            <FormField
              label="नोकरी/व्यवसाय"
              name="occupation"
              value={formData.occupation}
              onChange={(value) => setFormData({...formData, occupation: value})}
            />
            <FormField
              label="वेतन/उत्पन्न"
              name="income"
              value={formData.income}
              onChange={(value) => setFormData({...formData, income: value})}
            />
          </div>
        </section>

        {/* कौटुंबिक माहिती */}
        <section>
          <h3 className="text-lg font-semibold mb-4 bg-gray-100 p-2 rounded">कौटुंबिक माहिती</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="वडिलांचे नाव"
              name="fatherName"
              value={formData.fatherName}
              onChange={(value) => setFormData({...formData, fatherName: value})}
            />
            <FormField
              label="वडिलांचा व्यवसाय"
              name="fatherOccupation"
              value={formData.fatherOccupation}
              onChange={(value) => setFormData({...formData, fatherOccupation: value})}
            />
            <FormField
              label="आईचे नाव"
              name="motherName"
              value={formData.motherName}
              onChange={(value) => setFormData({...formData, motherName: value})}
            />
            <FormField
              label="आईचा व्यवसाय"
              name="motherOccupation"
              value={formData.motherOccupation}
              onChange={(value) => setFormData({...formData, motherOccupation: value})}
            />
            <FormField
              label="बहीण"
              name="siblings"
              value={formData.siblings}
              onChange={(value) => setFormData({...formData, siblings: value})}
            />
            <FormField
              label="भाऊ"
              name="siblings"
              value={formData.siblings}
              onChange={(value) => setFormData({...formData, siblings: value})}
            />
            <FormField
              label="मामा"
              name="maternalUncle"
              value={formData.maternalUncle}
              onChange={(value) => setFormData({...formData, maternalUncle: value})}
            />
            <FormField
              label="नातेसंबंध"
              name="relatives"
              value={formData.relatives}
              onChange={(value) => setFormData({...formData, relatives: value})}
            />
          </div>
        </section>

        {/* अपेक्षा */}
        <section>
          <h3 className="text-lg font-semibold mb-4 bg-gray-100 p-2 rounded">अपेक्षा</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">स्थळाकडून अपेक्षा</label>
              <textarea
                className="w-full p-2 border rounded h-24"
                value={formData.expectations || ''}
                onChange={(e) => setFormData({...formData, expectations: e.target.value})}
              />
            </div>
          </div>
        </section>

        {/* संपर्क माहिती */}
        <section>
          <h3 className="text-lg font-semibold mb-4 bg-gray-100 p-2 rounded">संपर्क माहिती</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">पत्ता</label>
              <textarea
                className="w-full p-2 border rounded h-24"
                value={formData.address || ''}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <FormField
              label="मोबाईल नंबर"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={(value) => setFormData({...formData, mobile: value})}
            />
          </div>
        </section>

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={isGenerating}
          >
            प्रीव्ह्यू पहा
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                तयार करत आहे...
              </>
            ) : (
              'PDF तयार करा'
            )}
          </button>
        </div>
      </form>

      <Modal 
        isOpen={showPreview} 
        onClose={() => setShowPreview(false)}
        title="बायोडाटा प्रीव्ह्यू"
      >
        <PreviewContent theme={theme} data={formData} />
      </Modal>

      {/* Hidden preview content for PDF generation */}
      <div id="preview-content" style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <PreviewContent theme={theme} data={formData} />
      </div>
    </div>
  );
} 