'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Get the initial language from localStorage or default to English
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);

  // Initialize translations
  useEffect(() => {
    // Combined translations object
    const translationsData = {
      en: {
        // General
        'app.title': 'Muslim Task Manager',
        'app.language': 'Language',

        // Page titles
        'page.home': 'Muslim Task Manager',
        'page.pomodoro': 'Pomodoro Timer',
        'page.notes': 'Notes',
        'page.worship': 'Muslim\'s Worship Tasks',

        // Navigation
        'nav.taskManager': 'Task Manager',
        'nav.pomodoro': 'Pomodoro Timer',
        'nav.notes': 'Notes',
        'nav.worship': 'Worship Tasks',

        // Worship page
        'worship.description': 'Add daily worship tasks to your task list',
        'worship.prayerTimes': 'Prayer Times',
        'worship.loadingPrayer': 'Loading prayer times...',
        'worship.allowLocation': 'Please allow location access to see prayer times',
        'worship.tasks': 'Available Worship Tasks',
        'worship.addToTasks': 'Add to Tasks',

        // Prayer names
        'prayer.fajr': 'Fajr',
        'prayer.dhuhr': 'Dhuhr',
        'prayer.asr': 'Asr',
        'prayer.maghrib': 'Maghrib',
        'prayer.isha': 'Isha',

        // Task management
        'tasks.progress': 'Complete',
        'tasks.addTask': 'Add Task',
        'tasks.title': 'Task title',
        'tasks.description': 'Description',
        'tasks.priority': 'Priority',
        'tasks.day': 'Day',
        'tasks.copySelected': 'Copy Selected Tasks',
        'tasks.uncheckAll': 'Uncheck All Tasks',
        'tasks.sort': 'Sort Tasks',

        // Priorities
        'priority.low': 'Low',
        'priority.medium': 'Medium',
        'priority.high': 'High',

        // Days
        'day.saturday': 'Saturday',
        'day.sunday': 'Sunday',
        'day.monday': 'Monday',
        'day.tuesday': 'Tuesday',
        'day.wednesday': 'Wednesday',
        'day.thursday': 'Thursday',
        'day.friday': 'Friday',
      },
      ar: {
        // General
        'app.title': 'منظم مهام المسلم',
        'app.language': 'اللغة',

        // Page titles
        'page.home': 'منظم مهام المسلم',
        'page.pomodoro': 'مؤقت بومودورو',
        'page.notes': 'ملاحظات',
        'page.worship': 'مهام العبادة للمسلم',

        // Navigation
        'nav.taskManager': 'منظم المهام',
        'nav.pomodoro': 'مؤقت بومودورو',
        'nav.notes': 'ملاحظات',
        'nav.worship': 'مهام العبادة',

        // Worship page
        'worship.description': 'أضف مهام العبادة اليومية إلى قائمة مهامك',
        'worship.prayerTimes': 'أوقات الصلاة',
        'worship.loadingPrayer': 'جاري تحميل أوقات الصلاة...',
        'worship.allowLocation': 'يرجى السماح بالوصول للموقع لرؤية أوقات الصلاة',
        'worship.tasks': 'مهام العبادة المتاحة',
        'worship.addToTasks': 'أضف إلى المهام',

        // Prayer names
        'prayer.fajr': 'الفجر',
        'prayer.dhuhr': 'الظهر',
        'prayer.asr': 'العصر',
        'prayer.maghrib': 'المغرب',
        'prayer.isha': 'العشاء',

        // Task management
        'tasks.progress': 'مكتمل',
        'tasks.addTask': 'إضافة مهمة',
        'tasks.title': 'عنوان المهمة',
        'tasks.description': 'الوصف',
        'tasks.priority': 'الأولوية',
        'tasks.day': 'اليوم',
        'tasks.copySelected': 'نسخ المهام المحددة',
        'tasks.uncheckAll': 'إلغاء تحديد جميع المهام',
        'tasks.sort': 'ترتيب المهام',

        // Priorities
        'priority.low': 'منخفضة',
        'priority.medium': 'متوسطة',
        'priority.high': 'عالية',

        // Days
        'day.saturday': 'السبت',
        'day.sunday': 'الأحد',
        'day.monday': 'الاثنين',
        'day.tuesday': 'الثلاثاء',
        'day.wednesday': 'الأربعاء',
        'day.thursday': 'الخميس',
        'day.friday': 'الجمعة',
      }
    };

    setTranslations(translationsData);

    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguageState(savedLanguage);
    }

    setLoading(false);
  }, []);

  // Update language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);

    // Set document direction based on language
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  };

  // Translation function
  const t = (key: string): string => {
    const currentTranslations = translations[language] || {};
    return currentTranslations[key] || key;
  };

  if (loading) {
    return <>{children}</>; // Return children while loading
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
