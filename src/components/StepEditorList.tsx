import React from 'react';
import StepCard from './StepCard';
import type { Step } from '../types';

type Props = {
    steps: Step[];
    currentIndex: number;
    onUpdateStep: (id: number, field: keyof Step, value: string) => void;
    onDeleteStep: (id: number) => void;
    onSelectStep: (index: number) => void;
};

const StepEditorList: React.FC<Props> = ({ steps, currentIndex, onUpdateStep, onDeleteStep, onSelectStep }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Étapes ({steps.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {steps.map((step, idx) => (
                    <StepCard
                        key={step.id}
                        step={step}
                        index={idx}
                        isActive={idx === currentIndex}
                        onUpdate={onUpdateStep}
                        onDelete={onDeleteStep}
                        onSelect={() => onSelectStep(idx)}
                    />
                ))}
            </div>
        </div>
    );
};

export default StepEditorList;
