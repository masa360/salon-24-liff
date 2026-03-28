'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import StepBar from '@/components/StepBar';
import StaffCard from '@/components/StaffCard';
import TimeSlotButton from '@/components/TimeSlotButton';
import SummaryBar from '@/components/SummaryBar';
import { generateTimeSlots, staffList, unavailableSlots } from '@/data/dummyData';
import { useReservation } from '@/app/context/ReservationContext';
import { fetchAvailability } from '@/lib/reservationApi';
import { buildReservationTotals } from '@/lib/reservationTotals';
import type { TimeSlot } from '@/types';

function toLocalDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function generateDates(): string[] {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return toLocalDateString(d);
  });
}

export default function Step2Page() {
  const router = useRouter();
  const { state, dispatch } = useReservation();
  const dates = useMemo(() => generateDates(), []);
  const defaultStaffId = staffList[0]?.id ?? '';
  const selectedStaffId = state.selectedStaff?.id ?? defaultStaffId;
  const selectedDate = state.selectedDate ?? dates[0];
  const durationMinutes = buildReservationTotals(state.selectedMenu, state.optionalColorMenu).totalDuration;
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    const result = await fetchAvailability({
      date: selectedDate,
      staffId: selectedStaffId,
      durationMinutes,
    });
    if (result.ok) {
      setSlots(result.slots);
      return;
    }
    setError(result.error);
    setSlots(generateTimeSlots(unavailableSlots[selectedStaffId] ?? []));
  }, [durationMinutes, selectedDate, selectedStaffId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void load();
    }, 0);
    return () => clearTimeout(timer);
  }, [load]);

  useEffect(() => {
    if (!state.selectedVenue) {
      router.replace('/reservation');
      return;
    }
    if (!state.selectedMenu) {
      router.replace('/reservation/step1');
    }
  }, [router, state.selectedMenu, state.selectedVenue]);

  useEffect(() => {
    if (!state.selectedStaff) {
      dispatch({ type: 'SET_STAFF', payload: staffList[0] });
    }
  }, [dispatch, state.selectedStaff]);

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f2', display: 'flex', flexDirection: 'column' }}>
      <StepBar currentStep={3} />

      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <h1 style={{ margin: 0, fontSize: 18, color: '#2c1a0e' }}>スタッフ・日時を選択</h1>
        <p style={{ margin: '6px 0 12px', fontSize: 12, color: '#7a6555' }}>担当スタッフとご希望の日時をお選びください。</p>

        <h2 style={{ margin: 0, fontSize: 14 }}>担当スタッフ</h2>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '10px 0 6px' }}>
          {staffList.map((staff) => (
            <StaffCard
              key={staff.id}
              staff={staff}
              isSelected={selectedStaffId === staff.id}
              onSelect={(s) => dispatch({ type: 'SET_STAFF', payload: s })}
            />
          ))}
        </div>

        <h2 style={{ margin: '14px 0 8px', fontSize: 14 }}>日付</h2>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {dates.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => dispatch({ type: 'SET_DATE', payload: d })}
              style={{
                border: '1px solid #ead9ca',
                borderRadius: 10,
                padding: '8px 10px',
                whiteSpace: 'nowrap',
                background: selectedDate === d ? '#b5714a' : '#fff',
                color: selectedDate === d ? '#fff' : '#2c1a0e',
              }}
            >
              {d}
            </button>
          ))}
        </div>

        <h2 style={{ margin: '14px 0 8px', fontSize: 14 }}>時間</h2>
        {error && (
          <p style={{ fontSize: 12, color: '#7a3e1e', background: '#fdf5ef', padding: 8, borderRadius: 8 }}>
            GAS接続エラーのため、デモ枠を表示しています: {error}
          </p>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
          {slots.map((slot) => (
            <TimeSlotButton
              key={slot.time}
              time={slot.time}
              available={slot.available}
              isSelected={state.selectedTime === slot.time}
              onSelect={(time) => dispatch({ type: 'SET_TIME', payload: time })}
            />
          ))}
        </div>
      </div>

      <SummaryBar
        mainMenu={state.selectedMenu}
        optionalColorMenu={state.optionalColorMenu}
        disabled={!state.selectedTime}
        onNext={() => router.push('/reservation/step3')}
        nextLabel="予約内容を確認する"
      />
    </div>
  );
}
