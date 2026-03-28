import type { Staff, TimeSlot, PastReservation, User, Venue } from '@/types';

export { menus } from '@/data/salonMenu';

/** Hair Boutique twenty four — 店舗情報 */
export const store = {
  name: 'Hair Boutique twenty four',
  tel: '06-6380-6021',
  postalCode: '〒565-0842',
  addressLine: '大阪府吹田市千里山東2-24-13',
  /** タイムスロット生成の目安（平日・土曜の営業時間に合わせる） */
  openTime: '10:00',
  closeTime: '19:00',
  parkingNote:
    '駐車場：店の前2台分スペース有\n※先着順\n※駐車場のご予約はお受けできません',
  hoursLines: [
    '平日 / 土曜 : 10:00 – 19:00',
    '金曜 : 12:00 – 21:00',
    '日曜 / 祝日 : 9:00 – 18:00',
  ] as const,
  holiday: '毎週月曜日、第2、第3月・火曜日',
};

export const venues: Venue[] = [
  {
    id: 'venue-24-main',
    name: store.name,
    addressLines: [
      store.postalCode,
      store.addressLine,
      '駐車場：店の前2台分（先着順・予約不可）',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
  },
];

export const staffList: Staff[] = [
  {
    id: 'staff-00',
    name: '指名なし',
    furigana: 'しめいなし',
    role: 'おまかせ',
    initial: '？',
    avatarColor: '#9ca3af',
  },
  {
    id: 'staff-01',
    name: '桃原 恵美',
    furigana: 'ももはら えみ',
    role: 'エステティシャン・スパニスト',
    initial: '恵',
    avatarColor: '#d4a574',
    bio:
      'エステ・ヘッドスパ・リンパマッサージが得意です。ラグジュアリーなシャンプー台、ユメシャンプーで施術するヘッドスパ、ぜひお試しください。',
  },
  {
    id: 'staff-02',
    name: '草深 光治',
    furigana: 'くさぶか こうじ',
    role: 'スタイリスト',
    initial: '草',
    avatarColor: '#5b8c9e',
  },
  {
    id: 'staff-03',
    name: '桃原 智也',
    furigana: 'ももはら ともや',
    role: '店長スタイリスト',
    initial: '智',
    avatarColor: '#8b6f5c',
  },
];

/** 予約枠の時刻一覧（店舗の最長営業に合わせ 9:00〜21:00 まで。実際の受付可能時間は店舗ルールに従ってください） */
export function generateTimeSlots(unavailableTimes: string[] = []): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let hour = 9; hour <= 21; hour += 1) {
    for (const min of [0, 30]) {
      if (hour === 21 && min === 30) break;
      const time = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
      slots.push({ time, available: !unavailableTimes.includes(time) });
    }
  }
  return slots;
}

export const unavailableSlots: Record<string, string[]> = {
  'staff-00': ['11:30', '14:00', '16:30'],
  'staff-01': ['10:00', '10:30', '14:00', '14:30', '17:00'],
  'staff-02': ['09:30', '11:00', '13:00', '16:00', '18:30'],
  'staff-03': ['10:30', '12:00', '15:00', '17:30'],
};

export const pastReservations: PastReservation[] = [
  {
    id: 'res-001',
    date: '2026-04-05',
    time: '11:00',
    menuName: 'レディーススタンダードコース(シャンプーブローCUT＋トリートメント)',
    staffName: '桃原 智也',
    price: 9240,
    status: 'upcoming',
  },
  {
    id: 'res-002',
    date: '2026-02-18',
    time: '14:30',
    menuName: 'メンズ　大人CUT',
    staffName: '草深 光治',
    price: 4620,
    status: 'completed',
  },
];

export const currentUser: User = {
  id: 'user-001',
  name: '田中 花子',
  memberNumber: '1234567890',
  points: 850,
  rank: 'SILVER',
  visitCount: 5,
};
