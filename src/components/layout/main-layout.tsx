import type React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaList, FaClock, FaStickyNote, FaPrayingHands } from 'react-icons/fa';
import AppHeader from './app-header';
import { useLanguage } from '@/context/language-context';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const { language, t } = useLanguage();
  const isRtl = language === 'ar';

  return (
    <div className={`flex min-h-screen ${isRtl ? 'flex-row-reverse' : ''}`}>
      {/* Sidebar */}
      <div className="w-16 bg-gradient-to-b from-purple-600 to-blue-600 flex flex-col items-center py-4">
        <Link href="/">
          <button
            className={`sidebar-btn w-12 h-12 rounded-md mb-4 flex items-center justify-center text-white ${
              pathname === '/' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
            aria-label={t('nav.taskManager')}
          >
            <FaList size={24} />
          </button>
        </Link>

        <Link href="/pomodoro">
          <button
            className={`sidebar-btn w-12 h-12 rounded-md mb-4 flex items-center justify-center text-white ${
              pathname === '/pomodoro' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
            aria-label={t('nav.pomodoro')}
          >
            <FaClock size={24} />
          </button>
        </Link>

        <Link href="/notes">
          <button
            className={`sidebar-btn w-12 h-12 rounded-md mb-4 flex items-center justify-center text-white ${
              pathname === '/notes' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
            aria-label={t('nav.notes')}
          >
            <FaStickyNote size={24} />
          </button>
        </Link>

        <Link href="/worship">
          <button
            className={`sidebar-btn w-12 h-12 rounded-md mb-4 flex items-center justify-center text-white ${
              pathname === '/worship' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
            aria-label={t('nav.worship')}
          >
            <FaPrayingHands size={24} />
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 flex flex-col">
        <AppHeader />
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
