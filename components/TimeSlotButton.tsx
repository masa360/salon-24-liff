interface TimeSlotButtonProps {
  time: string;
  available: boolean;
  isSelected: boolean;
  onSelect: (time: string) => void;
  interactionDisabled?: boolean;
}

export default function TimeSlotButton({
  time,
  available,
  isSelected,
  onSelect,
  interactionDisabled = false,
}: TimeSlotButtonProps) {
  return (
    <button
      type="button"
      disabled={!available || interactionDisabled}
      onClick={() => onSelect(time)}
      className={`h-10 rounded-xl border-2 text-sm font-medium transition-all ${
        !available
          ? 'bg-[#F3EDE4] border-[#E8DDD2] text-[#C4B4A4] line-through cursor-not-allowed'
          : interactionDisabled
            ? 'opacity-45 cursor-not-allowed border-[#E8DDD2] bg-[#FAF7F2] text-[#B0A090]'
            : isSelected
              ? 'bg-[#B5714A] border-[#B5714A] text-white'
              : 'bg-[#FFFEFB] border-[#E8DDD2] text-[#2C1A0E] hover:border-[#B5714A] hover:text-[#B5714A]'
      }`}
    >
      {time}
    </button>
  );
}
