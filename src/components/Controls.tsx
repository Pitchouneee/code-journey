import React from 'react';
import { Play, Plus } from 'lucide-react';
import { computeAnimatedDiffs } from '../utils/diffUtils';

interface Props {
    onAddStep: () => void;
    steps: { code: string }[];
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
    setAnimationCode: (code: string) => void;
}

const Controls: React.FC<Props> = ({ onAddStep, steps, currentIndex, setCurrentIndex, setAnimationCode }) => {
    const handleAutoPlay = async () => {
        if (steps.length < 2) return;
        setCurrentIndex(0);
        setAnimationCode(steps[0].code);

        for (let i = 1; i < steps.length; i++) {
            await computeAnimatedDiffs(steps[i - 1].code, steps[i].code, setAnimationCode);
            setCurrentIndex(i);
        }
    };

    return (
        <div className="flex gap-4 items-center">
            <button
                onClick={handleAutoPlay}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
            >
                <Play size={18} /> Auto Play
            </button>
            <button
                onClick={onAddStep}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium"
            >
                <Plus size={18} /> Ajouter Étape
            </button>
        </div>
    );
};

export default Controls;
