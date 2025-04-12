'use client';

import MainLayout from '@/components/layout/main-layout';
import TaskManager from '@/components/task-manager/task-manager';
import Providers from '@/providers';

export default function Home() {
  return (
    <Providers>
      <MainLayout>
        <TaskManager />
      </MainLayout>
    </Providers>
  );
}
