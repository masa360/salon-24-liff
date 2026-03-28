import type { CSSProperties } from 'react';
import type { Menu } from '@/types';
import Image from 'next/image';

interface MenuCardProps {
  menu: Menu;
  /** 予約フローで選択可能にする場合 */
  variant?: 'interactive' | 'static';
  isSelected?: boolean;
  onSelect?: (menu: Menu) => void;
}

function formatPrice(price: number): string {
  if (price <= 0) return '要お見積り';
  return `¥${price.toLocaleString('ja-JP')}`;
}

function formatDuration(minutes: number): string {
  if (minutes >= 60 && minutes % 60 === 0) {
    const h = minutes / 60;
    return h === 1 ? '約1時間' : `約${h}時間`;
  }
  return `約${minutes}分`;
}

export default function MenuCard({
  menu,
  variant = 'interactive',
  isSelected = false,
  onSelect,
}: MenuCardProps) {
  const borderColor = variant === 'interactive' && isSelected ? '#b5714a' : '#e8ddd2';
  const background = variant === 'interactive' && isSelected ? '#fdf5ef' : '#fff';

  const body = (
    <>
      {menu.imageUrl && (
        <div
          style={{
            width: '100%',
            height: 130,
            borderRadius: 10,
            overflow: 'hidden',
            marginBottom: 10,
            background: '#f5f0ea',
            position: 'relative',
          }}
        >
          <Image
            src={menu.imageUrl}
            alt={menu.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 440px) 100vw, 420px"
          />
        </div>
      )}
      {menu.tag && (
        <span
          style={{
            display: 'inline-block',
            fontSize: 10,
            fontWeight: 700,
            color: '#7a3e1e',
            background: '#f5e8dd',
            padding: '3px 8px',
            borderRadius: 6,
            marginBottom: 6,
          }}
        >
          {menu.tag}
        </span>
      )}
      <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#2c1a0e', lineHeight: 1.45 }}>{menu.name}</p>
      {menu.description && (
        <p
          style={{
            margin: '6px 0 0',
            fontSize: 12,
            color: '#7a6555',
            lineHeight: 1.65,
            whiteSpace: 'pre-line',
          }}
        >
          {menu.description}
        </p>
      )}
      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#7a6555' }}>目安 {formatDuration(menu.duration)}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#2c1a0e' }}>{formatPrice(menu.price)}</span>
      </div>
    </>
  );

  const boxStyle: CSSProperties = {
    width: '100%',
    textAlign: 'left',
    border: `2px solid ${borderColor}`,
    borderRadius: 14,
    padding: 14,
    background,
    boxSizing: 'border-box',
  };

  if (variant === 'static') {
    return <article style={boxStyle}>{body}</article>;
  }

  return (
    <button
      type="button"
      onClick={() => onSelect?.(menu)}
      style={{
        ...boxStyle,
        cursor: 'pointer',
        font: 'inherit',
        display: 'block',
      }}
    >
      {body}
    </button>
  );
}
