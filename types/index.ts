/** メニュー一覧のタブ区分 */
export type MenuCategory = 'ladies' | 'mens' | 'color' | 'treatment' | 'other';

export interface Menu {
  id: string;
  name: string;
  category: MenuCategory;
  duration: number;
  price: number;
  imageUrl?: string;
  tag?: string;
  description?: string;
}

export interface Staff {
  id: string;
  name: string;
  furigana: string;
  role: string;
  initial: string;
  avatarColor: string;
  /** プロフィール（任意・選択画面で表示） */
  bio?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface ReservationState {
  selectedVenue: Venue | null;
  selectedMenu: Menu | null;
  /** レディース／メンズに追加するカラー（任意） */
  optionalColorMenu: Menu | null;
  selectedStaff: Staff | null;
  selectedDate: string | null;
  selectedTime: string | null;
  customerName: string;
  notes: string;
}

export type ReservationAction =
  | { type: 'SET_VENUE'; payload: Venue }
  | { type: 'SET_MENU'; payload: Menu }
  | { type: 'SET_OPTIONAL_COLOR_MENU'; payload: Menu | null }
  | { type: 'SET_STAFF'; payload: Staff }
  | { type: 'SET_DATE'; payload: string }
  | { type: 'SET_TIME'; payload: string | null }
  | { type: 'SET_CUSTOMER_NAME'; payload: string }
  | { type: 'SET_NOTES'; payload: string }
  /** 履歴から同じ内容で予約するときに一括で反映 */
  | {
      type: 'APPLY_REBOOK_PATCH';
      payload: {
        selectedVenue: Venue;
        selectedMenu: Menu;
        optionalColorMenu: Menu | null;
        selectedStaff: Staff;
        customerName?: string;
      };
    }
  | { type: 'RESET' };

export interface PastReservation {
  id: string;
  date: string;
  time: string;
  menuName: string;
  staffName: string;
  price: number;
  status: 'completed' | 'upcoming' | 'cancelled';
}

export interface User {
  id: string;
  name: string;
  memberNumber: string;
  points: number;
  rank: 'STANDARD' | 'SILVER' | 'GOLD' | 'PLATINUM';
  visitCount: number;
}

export interface Venue {
  id: string;
  name: string;
  addressLines: string[];
  imageUrl?: string;
}
