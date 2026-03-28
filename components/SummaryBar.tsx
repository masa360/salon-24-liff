import type { Menu } from '@/types';
import { buildReservationTotals } from '@/lib/reservationTotals';

interface SummaryBarProps {
  mainMenu: Menu | null;
  optionalColorMenu?: Menu | null;
  nextLabel: string;
  disabled: boolean;
  onNext: () => void;
}

function formatPrice(price: number): string {
  if (price <= 0) return '要お見積り';
  return `¥${price.toLocaleString('ja-JP')}`;
}

function formatDurationMinutes(minutes: number): string {
  if (minutes >= 60 && minutes % 60 === 0) {
    const h = minutes / 60;
    return h === 1 ? '約1時間' : `約${h}時間`;
  }
  return `約${minutes}分`;
}

export default function SummaryBar({
  mainMenu,
  optionalColorMenu = null,
  nextLabel,
  disabled,
  onNext,
}: SummaryBarProps) {
  const { totalPrice, totalDuration, lineItems } = buildReservationTotals(mainMenu, optionalColorMenu);

  return (
    <div style={{ borderTop: '1px solid #f0e9e0', background: '#fff', padding: 12 }}>
      {!mainMenu ? (
        <p style={{ margin: 0, fontSize: 12, color: '#7a6555' }}>メニューを選択してください</p>
      ) : (
        <div style={{ margin: 0, fontSize: 12, color: '#2c1a0e' }}>
          <p style={{ margin: 0, fontWeight: 700, lineHeight: 1.45 }}>{mainMenu.name}</p>
          {optionalColorMenu && (
            <p style={{ margin: '4px 0 0', color: '#7a6555', lineHeight: 1.45 }}>＋ {optionalColorMenu.name}</p>
          )}
          <p style={{ margin: '8px 0 0', fontWeight: 700 }}>
            合計 {formatPrice(totalPrice)} / 目安 {formatDurationMinutes(totalDuration)}
            {lineItems.length > 1 && (
              <span style={{ fontWeight: 400, color: '#7a6555', fontSize: 11, display: 'block', marginTop: 4 }}>
                （内訳の時間・料金は目安です）
              </span>
            )}
          </p>
        </div>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        style={{
          width: '100%',
          marginTop: 8,
          border: 'none',
          borderRadius: 12,
          padding: '12px 16px',
          background: disabled ? '#d8c7ba' : '#b5714a',
          color: '#fff',
          fontWeight: 700,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        {nextLabel}
      </button>
    </div>
  );
}
