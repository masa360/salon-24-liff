'use client';

import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { ReservationAction, ReservationState } from '@/types';

const initialState: ReservationState = {
  selectedVenue: null,
  selectedMenu: null,
  optionalColorMenu: null,
  selectedStaff: null,
  selectedDate: null,
  selectedTime: null,
  customerName: '',
  notes: '',
};

function reducer(state: ReservationState, action: ReservationAction): ReservationState {
  switch (action.type) {
    case 'SET_VENUE':
      return { ...state, selectedVenue: action.payload };
    case 'SET_MENU':
      return {
        ...state,
        selectedMenu: action.payload,
        optionalColorMenu: null,
      };
    case 'SET_OPTIONAL_COLOR_MENU':
      return { ...state, optionalColorMenu: action.payload };
    case 'SET_STAFF':
      return { ...state, selectedStaff: action.payload, selectedTime: null };
    case 'SET_DATE':
      return { ...state, selectedDate: action.payload, selectedTime: null };
    case 'SET_TIME':
      return { ...state, selectedTime: action.payload };
    case 'SET_CUSTOMER_NAME':
      return { ...state, customerName: action.payload };
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    case 'APPLY_REBOOK_PATCH': {
      const { customerName, ...rest } = action.payload;
      return {
        ...state,
        ...rest,
        selectedDate: null,
        selectedTime: null,
        notes: '',
        customerName: customerName ?? state.customerName,
      };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const ReservationContext = createContext<{
  state: ReservationState;
  dispatch: React.Dispatch<ReservationAction>;
} | null>(null);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ReservationContext.Provider value={{ state, dispatch }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error('useReservation must be used within ReservationProvider');
  return ctx;
}
