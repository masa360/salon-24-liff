'use client';

import { useState } from 'react';
import Link from 'next/link';
import { pastReservations } from '@/data/dummyData';
import { useRebookFromHistory } from '@/hooks/useRebookFromHistory';
import type { PastReservation } from '@/types';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${days[d.getDay()]}）`;
}

function StatusBadge({ status }: { status: PastReservation['status'] }) {
  const map = {
    upcoming: { label: '予約済み', bg: '#e8f4ff', tx: '#21628f' },
    completed: { label: '来店済み', bg: '#f5e8dd', tx: '#7a3e1e' },
    cancelled: { label: 'キャンセル', bg: '#ffe8ea', tx: '#8d2b3a' },
  } as const;
  const cfg = map[status];
  return (
    <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: cfg.bg, color: cfg.tx }}>
      {cfg.label}
    </span>
  );
}

function RebookButton({ reservation }: { reservation: PastReservation }) {
  const rebook = useRebookFromHistory();
  const [err, setErr] = useState<string | null>(null);
  return (
    <div style={{ marginTop: 10 }}>
      {err && <p style={{ margin: '0 0 6px', fontSize: 11, color: '#8d2b3a' }}>{err}</p>}
      <button
        type="button"
        onClick={() => {
          setErr(null);
          rebook(reservation, { onError: setErr });
        }}
        style={{
          width: '100%',
          border: '1px solid #b5714a',
          borderRadius: 10,
          padding: '9px 12px',
          background: '#fdf5ef',
          color: '#7a3e1e',
          fontWeight: 700,
          fontSize: 12,
          cursor: 'pointer',
        }}
      >
        同じ内容で予約する
      </button>
    </div>
  );
}

export default function HistoryPage() {
  const upcoming = pastReservations.filter((r) => r.status === 'upcoming');
  const past = pastReservations.filter((r) => r.status !== 'upcoming');

  return (
    <div style={{ minHeight: '100%', background: '#faf7f2' }}>
      <header style={{ background: '#fffefb', padding: '36px 16px 16px', borderBottom: '1px solid #f0e9e0' }}>
        <h1 style={{ margin: 0, fontSize: 18, color: '#2c1a0e' }}>予約履歴</h1>
      </header>

      <div style={{ padding: 16 }}>
        {upcoming.length > 0 && (
          <section>
            <h2 style={{ margin: 0, marginBottom: 8, fontSize: 11, color: '#b5714a' }}>次回のご予約</h2>
            {upcoming.map((res) => (
              <div key={res.id} style={{ border: '2px solid #b5714a', borderRadius: 14, background: '#fff', padding: 12, marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <StatusBadge status={res.status} />
                    <p style={{ margin: '8px 0 0', fontSize: 14, fontWeight: 700 }}>{formatDate(res.date)}</p>
                    <p style={{ margin: '4px 0 0', fontSize: 13, color: '#7a6555' }}>{res.time}〜</p>
                  </div>
                  <Link href="/reservation" style={{ fontSize: 11, color: '#7a6555' }}>
                    変更・取消
                  </Link>
                </div>
                <p style={{ margin: '10px 0 0', fontSize: 12, color: '#2c1a0e' }}>
                  {res.menuName} / {res.staffName}
                </p>
                <RebookButton reservation={res} />
              </div>
            ))}
          </section>
        )}

        <section style={{ marginTop: 16 }}>
          <h2 style={{ margin: 0, marginBottom: 8, fontSize: 11, color: '#b0a090' }}>過去の予約</h2>
          {past.map((res) => (
            <div key={res.id} style={{ border: '1px solid #e8ddd2', borderRadius: 14, background: '#fff', padding: 12, marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 8 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 12, color: '#7a6555' }}>{formatDate(res.date)} {res.time}</p>
                  <p style={{ margin: '4px 0 0', fontSize: 14, fontWeight: 700, color: '#2c1a0e' }}>{res.menuName}</p>
                  <p style={{ margin: '4px 0 0', fontSize: 11, color: '#7a6555' }}>担当: {res.staffName}</p>
                </div>
                <StatusBadge status={res.status} />
              </div>
              <RebookButton reservation={res} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
