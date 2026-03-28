'use client';

import { useRouter } from 'next/navigation';
import { useReservation } from '@/app/context/ReservationContext';
import { buildRebookPatch } from '@/lib/rebookFromHistory';
import { needsOptionalAddons } from '@/lib/reservationTotals';
import type { PastReservation } from '@/types';

/**
 * 予約履歴1件を選び、同じメニュー・担当で予約フローを再開する（日時は未選択のまま）。
 */
export function useRebookFromHistory() {
  const router = useRouter();
  const { dispatch } = useReservation();

  return (reservation: PastReservation, options?: { customerName?: string; onError?: (message: string) => void }) => {
    const built = buildRebookPatch(reservation.menuName, reservation.staffName);
    if (!built.ok) {
      options?.onError?.(built.message);
      if (!options?.onError) {
        window.alert(built.message);
      }
      return;
    }

    dispatch({
      type: 'APPLY_REBOOK_PATCH',
      payload: {
        ...built.patch,
        customerName: options?.customerName,
      },
    });

    if (needsOptionalAddons(built.patch.selectedMenu)) {
      router.push('/reservation/step1-options');
    } else {
      router.push('/reservation/step2');
    }
  };
}
