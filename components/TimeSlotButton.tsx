interface TimeSlotButtonProps {
  time: string;
  available: boolean;
  isSelected: boolean;
  onSelect: (time: string) => void;
}

export default function TimeSlotButton({ time, available, isSelected, onSelect }: TimeSlotButtonProps) {
  return (
    <button
      type="button"
      disabled={!available}
      onClick={() => onSelect(time)}
      style={{
        height: 38,
        borderRadius: 10,
        border: `1px solid ${isSelected ? '#b5714a' : '#e8ddd2'}`,
        fontSize: 12,
        background: !available ? '#f0e9e0' : isSelected ? '#b5714a' : '#fff',
        color: !available ? '#b0a090' : isSelected ? '#fff' : '#2c1a0e',
        textDecoration: !available ? 'line-through' : 'none',
      }}
    >
      {time}
    </button>
  );
}
