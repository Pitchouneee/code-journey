import type { FC } from 'react';
import type { Step } from '../types';
import type { MonacoLanguage } from '../constants/monacoLanguages';
import StepEditorItem from './StepEditorItem';

interface Props {
    steps: Step[];
    currentStep: number;
    language: MonacoLanguage;
    onSelect: (index: number) => void;
    onDelete: (id: number) => void;
    onChange: (id: number, value: string) => void;
}

const StepEditorList: FC<Props> = ({
    steps,
    currentStep,
    language,
    onSelect,
    onDelete,
    onChange,
}) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {steps.map((step, index) => (
            <StepEditorItem
                key={step.id}
                step={step}
                index={index}
                language={language}
                isActive={currentStep === index}
                onSelect={onSelect}
                onDelete={onDelete}
                onChange={onChange}
            />
        ))}
    </div>
);

export default StepEditorList;