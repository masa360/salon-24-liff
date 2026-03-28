import { NextRequest, NextResponse } from 'next/server';

/**
 * GAS Webアプリへのプロキシ。
 * フロントはこのAPIだけを叩くことで CORS を回避する。
 */
export async function POST(request: NextRequest) {
  const gasUrl = process.env.GAS_WEBAPP_URL;
  if (!gasUrl) {
    return NextResponse.json(
      {
        success: false,
        error: 'サーバーに GAS_WEBAPP_URL が未設定です。',
      },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'JSON本文が不正です。' },
      { status: 400 },
    );
  }

  const res = await fetch(gasUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  try {
    const data = JSON.parse(text) as unknown;
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { success: false, error: text || 'GAS応答の解析に失敗しました。' },
      { status: res.status },
    );
  }
}
