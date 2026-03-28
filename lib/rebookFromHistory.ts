import type { Menu, Staff, Venue } from '@/types';
import { menus } from '@/data/salonMenu';
import { staffList, venues } from '@/data/dummyData';

/** 履歴のメニュー表記とマスタを突き合わせる */
function normalizeForMatch(s: string): string {
  return s
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[（｟]/g, '(')
    .replace(/[）｠]/g, ')');
}

function findMenuByHistoryLabel(label: string): Menu | null {
  const n = normalizeForMatch(label);
  if (!n) return null;
  const exact = menus.find((m) => normalizeForMatch(m.name) === n);
  if (exact) return exact;
  return menus.find((m) => normalizeForMatch(m.name).includes(n) || n.includes(normalizeForMatch(m.name))) ?? null;
}

function findStaffByHistoryName(name: string): Staff {
  const t = name.trim();
  const hit = staffList.find((s) => s.name === t);
  if (hit) return hit;
  return staffList.find((s) => s.id === 'staff-00') ?? staffList[0];
}

export type RebookPatch = {
  selectedVenue: Venue;
  selectedMenu: Menu;
  optionalColorMenu: Menu | null;
  selectedStaff: Staff;
};

/** 履歴1件から予約コンテキスト用のパッチを組み立てる */
export function buildRebookPatch(menuName: string, staffName: string): { ok: true; patch: RebookPatch } | { ok: false; message: string } {
  const venue = venues[0];
  if (!venue) {
    return { ok: false, message: '店舗情報が見つかりません。' };
  }

  const parts = menuName
    .split(/\s*＋\s*/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return { ok: false, message: 'メニュー名を解釈できませんでした。' };
  }

  const matchedMenus = parts.map((p) => findMenuByHistoryLabel(p)).filter((m): m is Menu => m != null);

  if (matchedMenus.length === 0) {
    return {
      ok: false,
      message: '登録メニューと一致する内容が見つかりませんでした。メニュー画面から選び直してください。',
    };
  }

  const main = matchedMenus[0];
  let optionalColorMenu: Menu | null = null;
  for (let i = 1; i < matchedMenus.length; i += 1) {
    if (matchedMenus[i].category === 'color') {
      optionalColorMenu = matchedMenus[i];
      break;
    }
  }

  const selectedStaff = findStaffByHistoryName(staffName);

  return {
    ok: true,
    patch: {
      selectedVenue: venue,
      selectedMenu: main,
      optionalColorMenu,
      selectedStaff,
    },
  };
}
