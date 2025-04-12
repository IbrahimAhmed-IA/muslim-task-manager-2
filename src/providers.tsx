import type React from 'react';
import { TaskProvider } from '@/context/task-context';
import { NoteProvider } from '@/context/note-context';
import { PomodoroProvider } from '@/context/pomodoro-context';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <TaskProvider>
      <NoteProvider>
        <PomodoroProvider>
          {children}
        </PomodoroProvider>
      </NoteProvider>
    </TaskProvider>
  );
}
