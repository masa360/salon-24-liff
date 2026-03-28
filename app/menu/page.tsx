'use client';

import { useState } from 'react';
import Link from 'next/link';
import MenuCard from '@/components/MenuCard';
import { menus } from '@/data/salonMenu';
import type { MenuCategory } from '@/types';

const CATEGORY_TABS: { key: MenuCategory; label: string }[] = [
  { key: 'ladies', label: 'レディース' },
  { key: 'mens', label: 'メンズ' },
  { key: 'color', label: 'カラー' },
  { key: 'treatment', label: 'トリート' },
  { key: 'other', label: 'その他' },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('ladies');
  const filtered = menus.filter((m) => m.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f2', paddingBottom: 16 }}>
      <header
        style={{
          background: '#fffefb',
          padding: '20px 16px 14px',
          borderBottom: '1px solid #f0e9e0',
        }}
      >
        <p style={{ margin: 0, marginBottom: 6, color: '#b5714a', fontSize: 11, fontWeight: 700 }}>
          MENU
        </p>
        <h1 style={{ margin: 0, fontSize: 20, color: '#2c1a0e' }}>メニュー表</h1>
        <p style={{ margin: '8px 0 0', fontSize: 12, color: '#7a6555', lineHeight: 1.6 }}>
          Hair Boutique twenty four のメニュー・料金・目安時間です。ご予約は予約フォームからお選びください。
        </p>
      </header>

      <div
        style={{
          display: 'flex',
          gap: 6,
          padding: '12px 16px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          background: '#faf7f2',
        }}
      >
        {CATEGORY_TABS.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setActiveCategory(cat.key)}
            style={{
              flex: '0 0 auto',
              border: '1px solid #ead9ca',
              borderRadius: 10,
              padding: '8px 12px',
              background: activeCategory === cat.key ? '#b5714a' : '#fff',
              color: activeCategory === cat.key ? '#fff' : '#2c1a0e',
              fontWeight: 700,
              fontSize: 12,
              whiteSpace: 'nowrap',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 16px', display: 'grid', gap: 10 }}>
        {filtered.length === 0 ? (
          <p style={{ fontSize: 13, color: '#7a6555', textAlign: 'center', padding: 24 }}>
            このカテゴリにメニューがありません。
          </p>
        ) : (
          filtered.map((menu) => <MenuCard key={menu.id} menu={menu} variant="static" />)
        )}
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        <Link
          href="/reservation"
          style={{
            display: 'block',
            textAlign: 'center',
            background: '#b5714a',
            color: '#fff',
            borderRadius: 12,
            padding: '13px 16px',
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          このメニューで予約する
        </Link>
      </div>
    </div>
  );
}
