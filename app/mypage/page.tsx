'use client';

import { useState } from 'react';
import Link from 'next/link';
import { currentUser, pastReservations } from '@/data/dummyData';
import { useRebookFromHistory } from '@/hooks/useRebookFromHistory';
import type { PastReservation } from '@/types';

const rankColor: Record<typeof currentUser.rank, string> = {
  STANDARD: 'linear-gradient(135deg,#8c7565,#6b5444)',
  SILVER: 'linear-gradient(135deg,#9ea8b0,#6b7880)',
  GOLD: 'linear-gradient(135deg,#c4944a,#9a6c28)',
  PLATINUM: 'linear-gradient(135deg,#8c8ca0,#5c5c78)',
};

function formatHistoryDate(dateStr: string): string {
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

export default function MyPage() {
  const upcomingCount = pastReservations.filter((r) => r.status === 'upcoming').length;
  const completedCount = pastReservations.filter((r) => r.status === 'completed').length;
  const rebook = useRebookFromHistory();
  const [rebookError, setRebookError] = useState<string | null>(null);

  const handleRebook = (res: PastReservation) => {
    setRebookError(null);
    rebook(res, {
      customerName: currentUser.name,
      onError: (message) => setRebookError(message),
    });
  };

  return (
    <div style={{ minHeight: '100%', background: '#faf7f2' }}>
      <header style={{ background: '#fffefb', padding: '36px 16px 16px', borderBottom: '1px solid #f0e9e0' }}>
        <h1 style={{ margin: 0, fontSize: 18, color: '#2c1a0e' }}>マイページ</h1>
      </header>

      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 54, height: 54, borderRadius: 27, display: 'grid', placeItems: 'center', background: '#b5714a', color: '#fff', fontWeight: 700 }}>
            田
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{currentUser.name}</p>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: '#7a6555' }}>
              {currentUser.rank}会員 ・ 累計来店 {currentUser.visitCount}回
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: 14,
            borderRadius: 16,
            padding: 16,
            color: '#fff',
            background: rankColor[currentUser.rank],
          }}
        >
          <p style={{ margin: 0, fontSize: 10, opacity: 0.8 }}>24</p>
          <p style={{ margin: '4px 0 0', fontWeight: 700 }}>MEMBERSHIP CARD</p>
          <p style={{ margin: '12px 0 0', letterSpacing: 1 }}>{currentUser.memberNumber}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
          <div style={{ background: '#fff', border: '1px solid #e8ddd2', borderRadius: 14, padding: 12 }}>
            <p style={{ margin: 0, fontSize: 12, color: '#7a6555' }}>保有ポイント</p>
            <p style={{ margin: '6px 0 0', fontSize: 24, fontWeight: 700 }}>
              {currentUser.points}
              <span style={{ fontSize: 12, marginLeft: 4 }}>pt</span>
            </p>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e8ddd2', borderRadius: 14, padding: 12 }}>
            <p style={{ margin: 0, fontSize: 12, color: '#7a6555' }}>次回予約</p>
            <p style={{ margin: '6px 0 0', fontSize: 24, fontWeight: 700 }}>
              {upcomingCount}
              <span style={{ fontSize: 12, marginLeft: 4 }}>件</span>
            </p>
            <p style={{ margin: '6px 0 0', fontSize: 11, color: '#7a6555' }}>累計来店: {completedCount}回</p>
          </div>
        </div>

        <section style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
            <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#2c1a0e' }}>予約履歴</h2>
            <Link href="/history" style={{ fontSize: 12, color: '#b5714a', fontWeight: 700 }}>
              一覧へ
            </Link>
          </div>
          {rebookError && (
            <p style={{ margin: '0 0 10px', fontSize: 12, color: '#8d2b3a', background: '#fff0f1', padding: 10, borderRadius: 10 }}>
              {rebookError}
            </p>
          )}
          {pastReservations.length === 0 ? (
            <p style={{ margin: 0, fontSize: 13, color: '#7a6555' }}>まだ予約履歴がありません。</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pastReservations.map((res) => (
                <div
                  key={res.id}
                  style={{
                    border: res.status === 'upcoming' ? '2px solid #b5714a' : '1px solid #e8ddd2',
                    borderRadius: 14,
                    background: '#fff',
                    padding: 12,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <StatusBadge status={res.status} />
                      <p style={{ margin: '8px 0 0', fontSize: 13, fontWeight: 700, color: '#2c1a0e' }}>
                        {formatHistoryDate(res.date)} {res.time}
                      </p>
                      <p style={{ margin: '6px 0 0', fontSize: 12, color: '#2c1a0e', lineHeight: 1.5 }}>{res.menuName}</p>
                      <p style={{ margin: '4px 0 0', fontSize: 11, color: '#7a6555' }}>担当: {res.staffName}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRebook(res)}
                    style={{
                      width: '100%',
                      marginTop: 10,
                      border: '1px solid #b5714a',
                      borderRadius: 10,
                      padding: '10px 12px',
                      background: '#fdf5ef',
                      color: '#7a3e1e',
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: 'pointer',
                    }}
                  >
                    同じ内容で予約する
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <div style={{ marginTop: 14, borderTop: '1px solid #f0e9e0', background: '#fff', borderRadius: 14, overflow: 'hidden' }}>
          {[
            { href: '/reservation', label: '予約する' },
            { href: '/history', label: '予約履歴（一覧）' },
            { href: '/mypage', label: 'プロフィール編集' },
            { href: '/mypage', label: '設定' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '13px 14px',
                borderBottom: '1px solid #f0e9e0',
                color: '#2c1a0e',
                fontSize: 14,
              }}
            >
              {item.label}
              <span style={{ color: '#b0a090' }}>›</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
