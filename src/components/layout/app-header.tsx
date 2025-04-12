'use client';

import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/language-context';
import LanguageSwitcher from '@/components/language-switcher';

export default function AppHeader() {
  const pathname = usePathname();
  const { t } = useLanguage();

  // Determine title based on current path
  const getTitle = () => {
    switch (pathname) {
      case '/':
        return t('page.home');
      case '/pomodoro':
        return t('page.pomodoro');
      case '/notes':
        return t('page.notes');
      case '/worship':
        return t('page.worship');
      default:
        return t('page.home');
    }
  };

  return (
    <header className="py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold">{getTitle()}</h1>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
