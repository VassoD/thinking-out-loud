'use client';

import { useState } from 'react';

const STEPS = ['Search', 'Sources', 'Coverage', 'Generation'];

type StepState = 'completed' | 'current' | 'upcoming';

function getStepState(index: number, currentStep: number): StepState {
  if (index < currentStep) return 'completed';
  if (index === currentStep) return 'current';
  return 'upcoming';
}

function CheckIcon(): React.ReactElement {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StepNumber({ n }: { n: number }): React.ReactElement {
  return <span className="text-xs font-mono leading-none">{n + 1}</span>;
}

function BrokenStepper({ currentStep }: { currentStep: number }): React.ReactElement {
  return (
    <div role="list" className="flex items-center w-full">
      {STEPS.map((label, i) => {
        const state = getStepState(i, currentStep);
        const isLast = i === STEPS.length - 1;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div
                role="listitem"
                aria-current={state === 'current' ? 'step' : undefined}
                aria-label={`${label}: ${state}`}
                className={[
                  'w-8 h-8 rounded flex items-center justify-center',
                  state === 'upcoming'
                    ? 'border border-[var(--color-border)] text-[var(--color-ink-faint)]'
                    : 'bg-[var(--color-accent)] text-white',
                ].join(' ')}
              >
                <StepNumber n={i} />
              </div>
              <span className="text-[10px] text-[var(--color-ink-faint)] whitespace-nowrap">{label}</span>
            </div>
            {!isLast && (
              <div className="h-px flex-1 mx-2 mb-5 bg-[var(--color-border)]" aria-hidden="true" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FixedStepper({ currentStep }: { currentStep: number }): React.ReactElement {
  const stepStyles: Record<StepState, string> = {
    completed: 'bg-[var(--color-accent)] text-white',
    current: 'border-2 border-[var(--color-accent)] bg-[var(--color-surface)] text-[var(--color-accent)]',
    upcoming: 'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink-faint)] opacity-60',
  };

  return (
    <div role="list" className="flex items-center w-full">
      {STEPS.map((label, i) => {
        const state = getStepState(i, currentStep);
        const isLast = i === STEPS.length - 1;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div
                role="listitem"
                aria-current={state === 'current' ? 'step' : undefined}
                aria-label={`${label}: ${state}`}
                className={['w-8 h-8 rounded flex items-center justify-center transition-all duration-300', stepStyles[state]].join(' ')}
              >
                {state === 'completed' ? <CheckIcon /> : <StepNumber n={i} />}
              </div>
              <span className={['text-[10px] whitespace-nowrap transition-colors duration-300', state === 'upcoming' ? 'text-[var(--color-ink-faint)] opacity-60' : 'text-[var(--color-ink-muted)]'].join(' ')}>
                {label}
              </span>
            </div>
            {!isLast && (
              <div
                className={[
                  'h-px flex-1 mx-2 mb-5 transition-colors duration-300',
                  state === 'completed' ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]',
                ].join(' ')}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function StepperDemo(): React.ReactElement {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <div className="my-8 rounded-lg border border-[var(--color-border)] overflow-hidden text-sm">
      <div className="grid grid-cols-2 divide-x divide-[var(--color-border)]">
        <div className="p-5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-faint)] mb-4 font-mono">Before</p>
          <BrokenStepper currentStep={currentStep} />
        </div>
        <div className="p-5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-faint)] mb-4 font-mono">After</p>
          <FixedStepper currentStep={currentStep} />
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] px-5 py-3 flex items-center justify-between bg-[var(--color-surface-elevated)]">
        <button
          onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
          disabled={currentStep === 0}
          className="text-xs text-[var(--color-ink-muted)] disabled:opacity-30 hover:text-[var(--color-ink)] transition-colors px-2 py-1 rounded"
        >
          ← prev
        </button>
        <span className="text-[10px] text-[var(--color-ink-faint)] font-mono">
          step {currentStep + 1} of {STEPS.length}
        </span>
        <button
          onClick={() => setCurrentStep(s => Math.min(STEPS.length - 1, s + 1))}
          disabled={currentStep === STEPS.length - 1}
          className="text-xs text-[var(--color-ink-muted)] disabled:opacity-30 hover:text-[var(--color-ink)] transition-colors px-2 py-1 rounded"
        >
          next →
        </button>
      </div>
    </div>
  );
}
