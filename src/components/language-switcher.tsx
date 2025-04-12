'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { FaGlobe } from 'react-icons/fa';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  // Use useEffect to ensure hydration is complete before rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Toggle between English and Arabic
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  // Only render once mounted to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div className={`flex items-center ${language === 'ar' ? 'mr-2' : 'ml-2'}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLanguage}
        className="text-white flex items-center gap-1"
        title={t('app.language')}
      >
        <FaGlobe className="mr-1" />
        <span>{language === 'en' ? 'العربية' : 'English'}</span>
      </Button>
    </div>
  );
}
