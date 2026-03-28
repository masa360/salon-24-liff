'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const baseIcon = {
  width: 18,
  height: 18,
  borderRadius: 9,
  border: '2px solid currentColor',
};

function NavItem({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        color: active ? '#b5714a' : '#b0a090',
        fontSize: 10,
        fontWeight: 700,
      }}
    >
      <span style={baseIcon} />
      {label}
    </Link>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <nav
      style={{
        height: 62,
        borderTop: '1px solid #e8ddd2',
        background: '#fffefb',
        display: 'flex',
      }}
    >
      <NavItem href="/" label="ホーム" active={isActive('/')} />
      <NavItem href="/menu" label="メニュー" active={isActive('/menu')} />
      <NavItem href="/reservation" label="予約" active={isActive('/reservation')} />
      <NavItem href="/history" label="履歴" active={isActive('/history')} />
      <NavItem href="/mypage" label="マイページ" active={isActive('/mypage')} />
    </nav>
  );
}
