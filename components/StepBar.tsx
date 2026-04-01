interface StepBarProps {
  currentStep: 1 | 2 | 3 | 4;
}

const steps = [
  { number: 1, label: '店舗' },
  { number: 2, label: 'メニュー' },
  { number: 3, label: '日時' },
  { number: 4, label: '確認' },
] as const;

export default function StepBar({ currentStep }: StepBarProps) {
  return (
    <div className="bg-[#FFFEFB] px-4 py-3 border-b border-[#F0E9E0]">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-[14px] flex px-3">
          <div className={`flex-1 h-px transition-colors ${currentStep >= 2 ? 'bg-[#B5714A]' : 'bg-[#E8DDD2]'}`} />
          <div className={`flex-1 h-px transition-colors ${currentStep >= 3 ? 'bg-[#B5714A]' : 'bg-[#E8DDD2]'}`} />
          <div className={`flex-1 h-px transition-colors ${currentStep >= 4 ? 'bg-[#B5714A]' : 'bg-[#E8DDD2]'}`} />
        </div>
        {steps.map((step) => {
          const active = step.number === currentStep;
          const done = step.number < currentStep;
          return (
            <div key={step.number} className="flex flex-col items-center gap-1 z-10">
              <div className={`w-7 h-7 rounded-full grid place-items-center text-xs font-bold transition-all ${
                active || done ? 'bg-[#B5714A] text-white' : 'bg-[#D8C7BA] text-white'
              }`}>
                {done ? '✓' : step.number}
              </div>
              <p className={`m-0 text-[10px] whitespace-nowrap ${active ? 'text-[#2C1A0E]' : 'text-[#7A6555]'}`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
