import Link from 'next/link';
import { pastReservations, store } from '@/data/dummyData';

const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.1242041896094!2d135.506578!3d34.7776484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e4bf615f399f%3A0xea5e6f637096d557!2sHairBoutique%20TwentyFour!5e0!3m2!1sja!2sjp!4v1774704394399!5m2!1sja!2sjp';

const upcomingReservation = pastReservations.find((r) => r.status === 'upcoming');

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#faf7f2' }}>
      <header style={{ background: '#fffefb', padding: '36px 16px 20px', borderBottom: '1px solid #f0e9e0' }}>
        <p style={{ margin: 0, marginBottom: 6, color: '#b5714a', fontSize: 11, fontWeight: 700 }}>
          HAIR SALON RESERVATION
        </p>
        <h1 style={{ margin: 0, fontSize: 24, color: '#2c1a0e' }}>{store.name}</h1>
      </header>

      <div style={{ padding: 16 }}>
        {upcomingReservation && (
          <div
            style={{
              background: '#fdf5ef',
              border: '1px solid #e8c9a8',
              borderRadius: 14,
              padding: 14,
              marginBottom: 14,
            }}
          >
            <p style={{ margin: 0, fontSize: 12, color: '#b5714a', fontWeight: 700 }}>次回ご予約</p>
            <p style={{ margin: '5px 0 0', fontSize: 14, color: '#2c1a0e', fontWeight: 700 }}>
              {upcomingReservation.date.replace(/-/g, '/')} {upcomingReservation.time}
            </p>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: '#7a6555' }}>
              {upcomingReservation.menuName} / {upcomingReservation.staffName}
            </p>
          </div>
        )}

        <p style={{ marginTop: 0, color: '#7a6555', lineHeight: 1.7, fontSize: 14 }}>
          こちらはLINE LIFFから利用する予約ページです。
          店舗の確認からメニュー・日時・確認まで、手順に沿って予約できます。
        </p>

        <Link
          href="/menu"
          style={{
            display: 'block',
            marginTop: 16,
            textAlign: 'center',
            background: '#fff',
            color: '#b5714a',
            border: '2px solid #b5714a',
            borderRadius: 12,
            padding: '11px 16px',
            fontWeight: 700,
          }}
        >
          メニュー・料金を見る
        </Link>

        <Link
          href="/reservation"
          style={{
            display: 'block',
            marginTop: 10,
            textAlign: 'center',
            background: '#b5714a',
            color: '#fff',
            borderRadius: 12,
            padding: '13px 16px',
            fontWeight: 700,
          }}
        >
          予約フォームを開く
        </Link>

        <div style={{ marginTop: 16, background: '#fffefb', border: '1px solid #e8ddd2', borderRadius: 14, padding: 14 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#2c1a0e' }}>{store.name}</p>
          <p style={{ margin: '8px 0 0', fontSize: 12, color: '#7a6555', lineHeight: 1.65 }}>
            {store.postalCode}
            <br />
            {store.addressLine}
          </p>
          <p style={{ margin: '8px 0 0', fontSize: 12, color: '#7a6555', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
            {store.parkingNote}
          </p>
          <p style={{ margin: '8px 0 0', fontSize: 12, color: '#7a6555' }}>
            TEL. {store.tel}
          </p>
          <div style={{ margin: '10px 0 0', fontSize: 12, color: '#7a6555', lineHeight: 1.65 }}>
            <p style={{ margin: 0, fontWeight: 700, color: '#2c1a0e' }}>営業時間</p>
            {store.hoursLines.map((line) => (
              <p key={line} style={{ margin: '4px 0 0' }}>
                {line}
              </p>
            ))}
          </div>
          <p style={{ margin: '10px 0 0', fontSize: 12, color: '#7a6555' }}>
            <span style={{ fontWeight: 700, color: '#2c1a0e' }}>定休日</span> {store.holiday}
          </p>
        </div>

        <section style={{ marginTop: 18 }}>
          <p style={{ margin: '0 0 10px', fontSize: 12, color: '#7a6555', fontWeight: 700 }}>
            店舗・アクセス
          </p>
          <div
            style={{
              border: '1px solid #e8ddd2',
              borderRadius: 12,
              overflow: 'hidden',
              background: '#fff',
              lineHeight: 0,
            }}
          >
            <iframe
              title="Hair Boutique twenty four の地図（Google Maps）"
              src={MAP_EMBED_SRC}
              width="600"
              height="450"
              style={{
                border: 0,
                width: '100%',
                height: 260,
                display: 'block',
                maxWidth: '100%',
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
