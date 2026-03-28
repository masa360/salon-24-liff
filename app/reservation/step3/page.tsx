'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import StepBar from '@/components/StepBar';
import { useReservation } from '@/app/context/ReservationContext';
import { useLiff } from '@/app/context/LiffContext';
import { createReservation } from '@/lib/reservationApi';
import { staffList } from '@/data/dummyData';
import { buildReservationTotals } from '@/lib/reservationTotals';

export default function Step3Page() {
  const router = useRouter();
  const { state, dispatch } = useReservation();
  const { profile, ready, error: liffError } = useLiff();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const menu = state.selectedMenu;
  const totals = buildReservationTotals(menu, state.optionalColorMenu);
  const venue = state.selectedVenue;
  const date = state.selectedDate;
  const time = state.selectedTime;
  const staff = state.selectedStaff;

  useEffect(() => {
    if (!state.selectedVenue) {
      router.replace('/reservation');
      return;
    }
    if (!state.selectedMenu) {
      router.replace('/reservation/step1');
      return;
    }
    if (!state.selectedTime) {
      router.replace('/reservation/step2');
    }
  }, [router, state.selectedMenu, state.selectedTime, state.selectedVenue]);

  async function submit() {
    setError(null);
    if (!venue || !menu || !date || !time) {
      setError('前の画面で店舗・メニュー・日時を選択してください。');
      return;
    }
    if (!state.customerName.trim()) {
      setError('予約者氏名を入力してください。');
      return;
    }

    setSubmitting(true);
    const result = await createReservation({
      customerName: state.customerName.trim(),
      menuName: totals.menuNameForApi,
      durationMinutes: totals.totalDuration,
      price: totals.totalPrice,
      staffId: staff?.id ?? (staffList[0]?.id ?? 'staff-00'),
      staffName: staff?.name ?? (staffList[0]?.name ?? '指名なし'),
      date,
      time,
      notes: state.notes,
      lineUserId: profile?.userId ?? '',
      lineDisplayName: profile?.displayName ?? '',
    });
    setSubmitting(false);

    if (!result.success) {
      setError(result.error ?? '予約に失敗しました。');
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <main style={{ padding: 16, textAlign: 'center' }}>
        <h1 style={{ marginTop: 24 }}>予約が完了しました</h1>
        <p style={{ color: '#7a6555' }}>ご予約ありがとうございます。店舗からの連絡をお待ちください。</p>
        <button
          type="button"
          onClick={() => {
            dispatch({ type: 'RESET' });
            router.push('/');
          }}
          style={{
            marginTop: 14,
            border: 'none',
            borderRadius: 12,
            padding: '12px 16px',
            background: '#b5714a',
            color: '#fff',
            fontWeight: 700,
          }}
        >
          ホームへ戻る
        </button>
      </main>
    );
  }

  if (!menu || !venue || !date || !time) {
    return (
      <div style={{ minHeight: '100vh', background: '#faf7f2', display: 'grid', placeItems: 'center' }}>
        <p style={{ color: '#7a6555', fontSize: 14 }}>読み込み中…</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f2', display: 'flex', flexDirection: 'column' }}>
      <StepBar currentStep={4} />
      <main style={{ padding: 16, flex: 1 }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>予約内容の確認</h1>
        <p style={{ color: '#7a6555', fontSize: 13 }}>内容を確認して確定してください。</p>

        {!ready && <p style={{ fontSize: 12, color: '#7a6555' }}>LINEプロフィール読み込み中...</p>}
        {liffError && <p style={{ fontSize: 12, color: '#b15344' }}>{liffError}</p>}

        <div style={{ border: '1px solid #ead9ca', borderRadius: 12, padding: 12, background: '#fff' }}>
          <p style={{ margin: 0, fontSize: 13 }}><strong>施設:</strong> {venue?.name ?? '未選択'}</p>
          <div style={{ margin: '8px 0 0', fontSize: 13 }}>
            <strong>メニュー:</strong>
            <ul style={{ margin: '6px 0 0', paddingLeft: 18, color: '#2c1a0e' }}>
              {totals.lineItems.map((row) => (
                <li key={row.label} style={{ marginBottom: 4 }}>
                  {row.label}
                  <span style={{ color: '#7a6555', fontSize: 12 }}>
                    {' '}
                    （¥{row.price.toLocaleString('ja-JP')} / 約{row.duration}分）
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p style={{ margin: '6px 0 0', fontSize: 13 }}><strong>担当:</strong> {staff?.name ?? (staffList[0]?.name ?? '指名なし')}</p>
          <p style={{ margin: '6px 0 0', fontSize: 13 }}><strong>日時:</strong> {(date ?? '未選択')} {(time ?? '')}</p>
          <p style={{ margin: '6px 0 0', fontSize: 13 }}>
            <strong>合計料金（目安）:</strong>{' '}
            {totals.totalPrice > 0 ? `¥${totals.totalPrice.toLocaleString('ja-JP')}` : '施術内容により変動'}
          </p>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: '#7a6555' }}>
            合計所要時間（目安）: 約{totals.totalDuration}分
          </p>
        </div>

        <label style={{ display: 'block', marginTop: 12 }}>
          <span style={{ fontSize: 12, color: '#7a6555' }}>予約者氏名 *</span>
          <input
            value={state.customerName}
            onChange={(e) => dispatch({ type: 'SET_CUSTOMER_NAME', payload: e.target.value })}
            style={inputStyle}
          />
        </label>

        <label style={{ display: 'block', marginTop: 10 }}>
          <span style={{ fontSize: 12, color: '#7a6555' }}>ご要望（任意）</span>
          <textarea
            value={state.notes}
            onChange={(e) => dispatch({ type: 'SET_NOTES', payload: e.target.value })}
            rows={4}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </label>

        {error && <p style={{ color: '#b15344', fontSize: 12 }}>{error}</p>}

        <button
          type="button"
          onClick={() => void submit()}
          disabled={submitting}
          style={{
            width: '100%',
            marginTop: 14,
            border: 'none',
            borderRadius: 12,
            padding: '12px 16px',
            background: submitting ? '#d8c7ba' : '#b5714a',
            color: '#fff',
            fontWeight: 700,
          }}
        >
          {submitting ? '送信中...' : 'この内容で予約する'}
        </button>
      </main>
    </div>
  );
}

const inputStyle: CSSProperties = {
  width: '100%',
  marginTop: 6,
  border: '1px solid #ead9ca',
  borderRadius: 10,
  padding: '10px 12px',
  fontSize: 14,
  background: '#fff',
};
