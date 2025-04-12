import type React from 'react';
import { TaskProvider } from '@/context/task-context';
import { NoteProvider } from '@/context/note-context';
import { PomodoroProvider } from '@/context/pomodoro-context';
import { LanguageProvider } from '@/context/language-context';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <LanguageProvider>
      <TaskProvider>
        <NoteProvider>
          <PomodoroProvider>
            {children}
          </PomodoroProvider>
        </NoteProvider>
      </TaskProvider>
    </LanguageProvider>
  );
}
