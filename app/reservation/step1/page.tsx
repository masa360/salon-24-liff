'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StepBar from '@/components/StepBar';
import MenuCard from '@/components/MenuCard';
import SummaryBar from '@/components/SummaryBar';
import { useReservation } from '@/app/context/ReservationContext';
import { menus } from '@/data/dummyData';
import { needsOptionalAddons } from '@/lib/reservationTotals';
import type { Menu, MenuCategory } from '@/types';

const CATEGORY_TABS: { key: MenuCategory; label: string }[] = [
  { key: 'ladies', label: 'レディース' },
  { key: 'mens', label: 'メンズ' },
  { key: 'color', label: 'カラー' },
  { key: 'treatment', label: 'トリート' },
  { key: 'other', label: 'その他' },
];

export default function Step1Page() {
  const router = useRouter();
  const { state, dispatch } = useReservation();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('ladies');
  const onSelectMenu = (menu: Menu) => dispatch({ type: 'SET_MENU', payload: menu });

  const filteredMenus = menus.filter((m) => m.category === activeCategory);

  useEffect(() => {
    if (!state.selectedVenue) {
      router.replace('/reservation');
    }
  }, [router, state.selectedVenue]);

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f2', display: 'flex', flexDirection: 'column' }}>
      <StepBar currentStep={2} />
      <div style={{ padding: '16px 16px 8px' }}>
        <h2 style={{ margin: 0, fontSize: 18, color: '#2c1a0e' }}>メニューを選択</h2>
        <p style={{ margin: '6px 0 0', fontSize: 12, color: '#7a6555' }}>カテゴリを選び、ご希望のメニューをお選びください。</p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 6,
          padding: '0 16px 12px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
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

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 8px', display: 'grid', gap: 10 }}>
        {filteredMenus.length === 0 ? (
          <p style={{ fontSize: 13, color: '#7a6555', textAlign: 'center', padding: 24 }}>このカテゴリにメニューがありません。</p>
        ) : (
          filteredMenus.map((menu) => (
            <MenuCard key={menu.id} menu={menu} isSelected={state.selectedMenu?.id === menu.id} onSelect={onSelectMenu} />
          ))
        )}
      </div>

      <SummaryBar
        mainMenu={state.selectedMenu}
        disabled={!state.selectedMenu}
        onNext={() => {
          const m = state.selectedMenu;
          if (!m) return;
          if (needsOptionalAddons(m)) {
            router.push('/reservation/step1-options');
          } else {
            router.push('/reservation/step2');
          }
        }}
        nextLabel={
          state.selectedMenu && needsOptionalAddons(state.selectedMenu)
            ? '追加メニュー（カラー）へ'
            : 'スタッフ・時間を選ぶ'
        }
      />
    </div>
  );
}
