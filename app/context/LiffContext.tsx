'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import liff from '@line/liff';

type LiffProfile = {
  userId: string;
  displayName: string;
};

type LiffState = {
  ready: boolean;
  error: string | null;
  profile: LiffProfile | null;
};

const LiffContext = createContext<LiffState | null>(null);

export function LiffProvider({ children }: { children: ReactNode }) {
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
  const [state, setState] = useState<LiffState>({
    ready: !liffId,
    error: null,
    profile: null,
  });

  useEffect(() => {
    if (!liffId) {
      return;
    }

    let cancelled = false;
    void (async () => {
      try {
        await liff.init({ liffId });
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }
        const p = await liff.getProfile();
        if (cancelled) return;
        setState({
          ready: true,
          error: null,
          profile: { userId: p.userId, displayName: p.displayName },
        });
      } catch (e) {
        if (cancelled) return;
        setState({
          ready: true,
          error: e instanceof Error ? e.message : String(e),
          profile: null,
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [liffId]);

  return <LiffContext.Provider value={state}>{children}</LiffContext.Provider>;
}

export function useLiff() {
  const ctx = useContext(LiffContext);
  if (!ctx) throw new Error('useLiff must be used within LiffProvider');
  return ctx;
}
