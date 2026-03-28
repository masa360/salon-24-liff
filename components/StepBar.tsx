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
    <div style={{ background: '#fff', borderBottom: '1px solid #f0e9e0', padding: '12px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: 26,
            right: 26,
            top: 14,
            height: 1,
            background: '#e8ddd2',
          }}
        />
        {steps.map((step) => {
          const active = step.number === currentStep;
          const done = step.number < currentStep;
          return (
            <div key={step.number} style={{ zIndex: 1, textAlign: 'center' }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  margin: '0 auto',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 700,
                  background: active || done ? '#b5714a' : '#d8c7ba',
                }}
              >
                {done ? '✓' : step.number}
              </div>
              <p style={{ margin: '6px 0 0', fontSize: 10, color: active ? '#2c1a0e' : '#7a6555' }}>{step.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
