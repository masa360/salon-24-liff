import type { Menu } from '@/types';

/** メインメニュー＋任意のカラーを積算した予約サマリー */
export function buildReservationTotals(
  main: Menu | null,
  optionalColor: Menu | null,
): {
  totalPrice: number;
  totalDuration: number;
  menuNameForApi: string;
  lineItems: { label: string; price: number; duration: number }[];
} {
  const lineItems: { label: string; price: number; duration: number }[] = [];
  if (main) lineItems.push({ label: main.name, price: main.price, duration: main.duration });
  if (optionalColor)
    lineItems.push({ label: optionalColor.name, price: optionalColor.price, duration: optionalColor.duration });

  const totalPrice = lineItems.reduce((s, x) => s + x.price, 0);
  const totalDuration = lineItems.reduce((s, x) => s + x.duration, 0);
  const menuNameForApi = lineItems.map((x) => x.label).join(' ＋ ');

  return { totalPrice, totalDuration, menuNameForApi, lineItems };
}

/** レディース／メンズのあと、カラーオプション選択画面を挟むか */
export function needsOptionalAddons(main: Menu | null): boolean {
  if (!main) return false;
  return main.category === 'ladies' || main.category === 'mens';
}
