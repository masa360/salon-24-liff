import type { Staff } from '@/types';

interface StaffCardProps {
  staff: Staff;
  isSelected: boolean;
  onSelect: (staff: Staff) => void;
}

export default function StaffCard({ staff, isSelected, onSelect }: StaffCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(staff)}
      style={{
        minWidth: staff.bio ? 132 : 106,
        maxWidth: staff.bio ? 160 : undefined,
        flex: staff.bio ? '0 0 auto' : undefined,
        border: `2px solid ${isSelected ? '#b5714a' : '#e8ddd2'}`,
        borderRadius: 14,
        padding: '10px 10px 12px',
        background: isSelected ? '#fdf5ef' : '#fff',
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 23,
          margin: '0 auto',
          display: 'grid',
          placeItems: 'center',
          color: '#fff',
          fontWeight: 700,
          background: staff.avatarColor,
        }}
      >
        {staff.initial}
      </div>
      <p style={{ margin: '8px 0 0', fontSize: 12, fontWeight: 700, color: '#2c1a0e' }}>{staff.name}</p>
      <p style={{ margin: '3px 0 0', fontSize: 10, color: '#7a6555' }}>{staff.role}</p>
      {staff.bio && (
        <p
          style={{
            margin: '6px 0 0',
            fontSize: 9,
            color: '#8a7a6a',
            lineHeight: 1.45,
            textAlign: 'left',
            whiteSpace: 'pre-line',
            maxHeight: 72,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {staff.bio}
        </p>
      )}
    </button>
  );
}
