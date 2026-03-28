import type { TimeSlot } from '@/types';

type AvailabilityApiResponse = {
  success: boolean;
  slots?: TimeSlot[];
  error?: string;
};

type ReservationApiResponse = {
  success: boolean;
  assignedStaffName?: string;
  error?: string;
};

async function callApi<T>(body: Record<string, unknown>) {
  const res = await fetch('/api/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as T;
  return { ok: res.ok, data };
}

export async function fetchAvailability(params: {
  date: string;
  staffId: string;
  durationMinutes: number;
}): Promise<{ ok: true; slots: TimeSlot[] } | { ok: false; error: string }> {
  const { ok, data } = await callApi<AvailabilityApiResponse>({
    action: 'getAvailability',
    date: params.date,
    staffId: params.staffId,
    durationMinutes: params.durationMinutes,
  });

  if (ok && data.success && Array.isArray(data.slots)) {
    return { ok: true, slots: data.slots };
  }
  return { ok: false, error: data.error || '空き状況の取得に失敗しました。' };
}

export async function createReservation(params: {
  customerName: string;
  menuName: string;
  durationMinutes: number;
  price: number;
  staffId: string;
  staffName: string;
  date: string;
  time: string;
  notes: string;
  lineUserId?: string;
  lineDisplayName?: string;
}): Promise<{ success: boolean; assignedStaffName?: string; error?: string }> {
  const { ok, data } = await callApi<ReservationApiResponse>({
    action: 'createReservation',
    customerName: params.customerName,
    menuName: params.menuName,
    durationMinutes: params.durationMinutes,
    price: params.price,
    staffId: params.staffId,
    staffName: params.staffName,
    date: params.date,
    time: params.time,
    notes: params.notes,
    lineUserId: params.lineUserId ?? '',
    lineDisplayName: params.lineDisplayName ?? '',
  });
  if (ok && data.success) return { success: true, assignedStaffName: data.assignedStaffName };
  return { success: false, error: data.error || '予約登録に失敗しました。' };
}
