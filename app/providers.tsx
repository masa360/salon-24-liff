'use client';

import { LiffProvider } from '@/app/context/LiffContext';
import { ReservationProvider } from '@/app/context/ReservationContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LiffProvider>
      <ReservationProvider>{children}</ReservationProvider>
    </LiffProvider>
  );
}
