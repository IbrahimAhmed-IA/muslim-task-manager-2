'use client';

import MainLayout from '@/components/layout/main-layout';
import TaskManager from '@/components/task-manager/task-manager';
import PrayerTimes from '@/components/prayer-times';
import Providers from '@/providers';

export default function Home() {
  return (
    <Providers>
      <MainLayout>
        <div className="p-6">
          <div className="mb-4">
            <PrayerTimes />
          </div>
          <TaskManager />
        </div>
      </MainLayout>
    </Providers>
  );
}
