import { useCallback, useRef, useState } from 'react';
import type { Step } from '../types';

export const useCodeSteps = (initialSteps: Step[]) => {
    const [steps, setSteps] = useState<Step[]>(initialSteps);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const intervalRef = useRef<number | null>(null);

    const stop = useCallback(() => {
        setIsPlaying(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const play = useCallback(() => {
        if (steps.length <= 1 || isPlaying) return;
        setIsPlaying(true);
        setCurrentStep(0);
        let index = 0;
        intervalRef.current = setInterval(() => {
            index += 1;
            if (index >= steps.length) {
                stop();
                return;
            }
            setCurrentStep(index);
        }, 1200);
    }, [isPlaying, steps.length, stop]);

    const addStep = useCallback(() => {
        const newStep: Step = {
            id: Date.now(),
            title: `Step ${steps.length + 1}`,
            code: `// New code here`,
        };
        setSteps((prev) => [...prev, newStep]);
    }, [steps.length]);

    const deleteStep = useCallback(
        (id: number) => {
            if (steps.length === 1) return;
            const newSteps = steps.filter((s) => s.id !== id);
            setSteps(newSteps);
            if (currentStep >= newSteps.length) {
                setCurrentStep(newSteps.length - 1);
            }
        },
        [steps, currentStep],
    );

    const updateStepCode = useCallback((id: number, value: string) => {
        setSteps((prev) =>
            prev.map((step) => (step.id === id ? { ...step, code: value } : step)),
        );
    }, []);

    const resetToStep = useCallback(
        (index: number) => {
            if (!isPlaying) {
                setCurrentStep(index);
            }
        },
        [isPlaying],
    );

    return {
        steps,
        currentStep,
        isPlaying,
        play,
        stop,
        addStep,
        deleteStep,
        updateStepCode,
        resetToStep,
    };
};