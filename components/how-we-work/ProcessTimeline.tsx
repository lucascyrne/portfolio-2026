'use client';

type ProcessStep = {
  label: string;
  description?: string;
  storyBeat?: string;
  imageKey?: string;
};

type ProcessTimelineProps = {
  steps: ProcessStep[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
  interactive?: boolean;
  numberFormat?: 'numeric' | 'padded';
  columns?: number;
};

function formatStepNumber(index: number, format: 'numeric' | 'padded'): string {
  return format === 'padded' ? String(index + 1).padStart(2, '0') : String(index + 1);
}

export default function ProcessTimeline({
  steps,
  activeIndex = 0,
  onSelect,
  interactive = false,
  numberFormat = 'numeric',
  columns,
}: ProcessTimelineProps) {
  const colCount = columns ?? steps.length;

  const handleSelect = (index: number) => {
    if (interactive && onSelect) onSelect(index);
  };

  const circleClass = (isActive: boolean, interactiveMode: boolean) => {
    if (isActive) {
      return 'border-primary bg-background ring-2 ring-primary/30 text-foreground';
    }
    return interactiveMode
      ? 'border-border bg-background text-foreground hover:border-primary/50'
      : 'border-border bg-background text-foreground';
  };

  return (
    <div className="w-full" aria-label="Process flow">
      <div className="hidden md:block">
        <div className="relative mx-auto max-w-3xl">
          <svg
            className="pointer-events-none absolute left-0 right-0 top-5 z-0 h-px w-full text-border"
            aria-hidden
          >
            <line
              x1="12.5%"
              y1="0"
              x2="87.5%"
              y2="0"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
          <ol
            className="relative z-10 grid gap-4"
            style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
          >
            {steps.map((step, index) => {
              const isActive = interactive && index === activeIndex;
              const StepWrapper = interactive ? 'button' : 'div';

              return (
                <li key={step.label} className="flex flex-col items-center text-center">
                  <StepWrapper
                    type={interactive ? 'button' : undefined}
                    onClick={interactive ? () => handleSelect(index) : undefined}
                    className={`relative z-10 flex size-10 items-center justify-center rounded-full border text-sm font-medium transition-colors ${circleClass(isActive, interactive)} ${interactive ? 'cursor-pointer' : ''}`}
                  >
                    {formatStepNumber(index, numberFormat)}
                  </StepWrapper>
                  <span className="mt-3 font-inria text-sm font-semibold text-foreground md:text-base">
                    {step.label}
                  </span>
                  {step.description ? (
                    <span className="mt-1 text-xs text-muted-foreground">
                      {step.description}
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <ol className="flex flex-col gap-0 md:hidden">
        {steps.map((step, index) => {
          const isActive = interactive && index === activeIndex;
          const StepWrapper = interactive ? 'button' : 'div';

          return (
            <li key={step.label} className="flex flex-col items-stretch">
              <StepWrapper
                type={interactive ? 'button' : undefined}
                onClick={interactive ? () => handleSelect(index) : undefined}
                className={`flex w-full max-w-xs items-center gap-3 py-3 text-left transition-colors ${
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                } ${interactive ? 'cursor-pointer hover:text-foreground' : ''}`}
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium ${circleClass(isActive, interactive)}`}
                >
                  {formatStepNumber(index, numberFormat)}
                </span>
                <span className="font-inria text-sm font-semibold">{step.label}</span>
              </StepWrapper>
              {index < steps.length - 1 ? (
                <span className="my-1 ml-4 self-start text-muted-foreground/50" aria-hidden>
                  |
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
