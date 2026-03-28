'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StepBar from '@/components/StepBar';
import { useReservation } from '@/app/context/ReservationContext';
import { venues } from '@/data/dummyData';
import Image from 'next/image';

export default function ReservationPage() {
  const router = useRouter();
  const { state, dispatch } = useReservation();

  useEffect(() => {
    if (venues.length === 1) {
      dispatch({ type: 'SET_VENUE', payload: venues[0] });
      router.replace('/reservation/step1');
    }
  }, [dispatch, router]);

  if (venues.length === 1) {
    return (
      <div style={{ minHeight: '100vh', background: '#faf7f2', display: 'grid', placeItems: 'center', padding: 24 }}>
        <p style={{ margin: 0, fontSize: 14, color: '#7a6555' }}>店舗を確認しています…</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f2', display: 'flex', flexDirection: 'column' }}>
      <StepBar currentStep={1} />
      <div style={{ padding: '16px 16px 8px' }}>
        <h2 style={{ margin: 0, fontSize: 18, color: '#2c1a0e' }}>店舗を選択します</h2>
        <p style={{ margin: '6px 0 0', fontSize: 12, color: '#7a6555' }}>ご来店の店舗を選んでください。</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 8px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 10 }}>
          {venues.map((venue, index) => {
            const selected = state.selectedVenue?.id === venue.id;
            return (
              <button
                key={venue.id}
                type="button"
                onClick={() => dispatch({ type: 'SET_VENUE', payload: venue })}
                style={{
                  border: `2px solid ${selected ? '#b5714a' : '#e8ddd2'}`,
                  borderRadius: 12,
                  background: '#fff',
                  padding: 10,
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    height: 84,
                    borderRadius: 8,
                    background: '#f2ece4',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  {venue.imageUrl ? (
                    <Image
                      src={venue.imageUrl}
                      alt={venue.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 440px) 45vw, 180px"
                    />
                  ) : (
                    <div
                      style={{
                        height: '100%',
                        display: 'grid',
                        placeItems: 'center',
                        color: '#7a6555',
                        fontSize: 11,
                        fontWeight: 700,
                        background: index % 2 === 0 ? 'linear-gradient(135deg,#e9dccf,#f7efe8)' : 'linear-gradient(135deg,#d7e6f2,#eef5fb)',
                      }}
                    >
                      店舗写真
                    </div>
                  )}
                </div>
                <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.45, fontWeight: 700, color: '#334e6f' }}>
                  {venue.name}
                </p>
                {venue.addressLines.map((line) => (
                  <p key={line} style={{ margin: '5px 0 0', fontSize: 12, color: '#4f637e' }}>
                    {line}
                  </p>
                ))}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #f0e9e0', background: '#fff', padding: 12 }}>
        <p style={{ margin: 0, fontSize: 12, color: '#7a6555' }}>
          {state.selectedVenue ? `選択中: ${state.selectedVenue.name}` : '店舗を選択してください'}
        </p>
        <button
          type="button"
          onClick={() => router.push('/reservation/step1')}
          disabled={!state.selectedVenue}
          style={{
            width: '100%',
            marginTop: 8,
            border: 'none',
            borderRadius: 12,
            padding: '12px 16px',
            background: state.selectedVenue ? '#b5714a' : '#d8c7ba',
            color: '#fff',
            fontWeight: 700,
            cursor: state.selectedVenue ? 'pointer' : 'not-allowed',
          }}
        >
          メニューを選ぶ
        </button>
      </div>
    </div>
  );
}
