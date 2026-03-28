'use client';

import { useEffect, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import StepBar from '@/components/StepBar';
import MenuCard from '@/components/MenuCard';
import SummaryBar from '@/components/SummaryBar';
import { useReservation } from '@/app/context/ReservationContext';
import { menus } from '@/data/dummyData';
import { needsOptionalAddons } from '@/lib/reservationTotals';
import type { Menu } from '@/types';

const sectionTitle: CSSProperties = {
  margin: '0 0 8px',
  fontSize: 14,
  fontWeight: 700,
  color: '#2c1a0e',
};

const skipButtonStyle = (active: boolean): CSSProperties => ({
  width: '100%',
  marginBottom: 10,
  border: `2px solid ${active ? '#b5714a' : '#e8ddd2'}`,
  borderRadius: 12,
  padding: '12px 14px',
  background: active ? '#fdf5ef' : '#fff',
  color: '#2c1a0e',
  fontWeight: 700,
  fontSize: 13,
  cursor: 'pointer',
  textAlign: 'left',
});

export default function Step1OptionsPage() {
  const router = useRouter();
  const { state, dispatch } = useReservation();
  const main = state.selectedMenu;
  const colorMenus = menus.filter((m) => m.category === 'color');

  useEffect(() => {
    if (!state.selectedVenue) {
      router.replace('/reservation');
      return;
    }
    if (!main) {
      router.replace('/reservation/step1');
      return;
    }
    if (!needsOptionalAddons(main)) {
      router.replace('/reservation/step2');
    }
  }, [router, state.selectedVenue, main]);

  if (!main || !needsOptionalAddons(main)) {
    return (
      <div style={{ minHeight: '100vh', background: '#faf7f2', display: 'grid', placeItems: 'center' }}>
        <p style={{ color: '#7a6555', fontSize: 14 }}>読み込み中…</p>
      </div>
    );
  }

  const onSelectColor = (menu: Menu) => dispatch({ type: 'SET_OPTIONAL_COLOR_MENU', payload: menu });

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f2', display: 'flex', flexDirection: 'column' }}>
      <StepBar currentStep={2} />
      <div style={{ padding: '16px 16px 8px' }}>
        <button
          type="button"
          onClick={() => router.push('/reservation/step1')}
          style={{
            border: 'none',
            background: 'none',
            padding: 0,
            marginBottom: 8,
            color: '#b5714a',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          ← メインメニューを変更
        </button>
        <h2 style={{ margin: 0, fontSize: 18, color: '#2c1a0e' }}>追加メニュー（任意）</h2>
        <p style={{ margin: '6px 0 0', fontSize: 12, color: '#7a6555', lineHeight: 1.65 }}>
          カットメニューにカラーを追加する場合のみお選びください。不要なら「追加しない」でスキップできます。
        </p>
        <p style={{ margin: '10px 0 0', fontSize: 12, color: '#2c1a0e', fontWeight: 700 }}>
          選択中のメイン: {main.name}
        </p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 8px' }}>
        <h3 style={sectionTitle}>カラーを追加</h3>
        <button
          type="button"
          onClick={() => dispatch({ type: 'SET_OPTIONAL_COLOR_MENU', payload: null })}
          style={skipButtonStyle(state.optionalColorMenu === null)}
        >
          カラーは追加しない（スキップ）
        </button>
        <div style={{ display: 'grid', gap: 10 }}>
          {colorMenus.map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              isSelected={state.optionalColorMenu?.id === menu.id}
              onSelect={onSelectColor}
            />
          ))}
        </div>
      </div>

      <SummaryBar
        mainMenu={state.selectedMenu}
        optionalColorMenu={state.optionalColorMenu}
        disabled={false}
        onNext={() => router.push('/reservation/step2')}
        nextLabel="スタッフ・時間を選ぶ"
      />
    </div>
  );
}
