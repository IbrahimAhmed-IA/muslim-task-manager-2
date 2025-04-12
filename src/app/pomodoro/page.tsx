'use client';

import MainLayout from '@/components/layout/main-layout';
import PomodoroTimer from '@/components/pomodoro/pomodoro-timer';
import Providers from '@/providers';

export default function PomodoroPage() {
  return (
    <Providers>
      <MainLayout>
        <PomodoroTimer />
      </MainLayout>
    </Providers>
  );
}
