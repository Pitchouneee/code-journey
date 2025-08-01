import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Plus } from 'lucide-react';
import type { MonacoLanguage } from '../constants/monacoLanguages';
import { languageCategories } from '../constants/languageCategories';
import { DEFAULT_STEPS } from '../constants/defaultSteps';
import { useHighlight } from '../hooks/useHighlight';
import { useCodeSteps } from '../hooks/useCodeSteps';
import LanguageSelector from './LanguageSelector';
import StepEditorList from './StepEditorList';
import CodePreview from './CodePreview';

const DEFAULT_LANGUAGE: MonacoLanguage = 'java';

const getCategoryOfLanguage = (
    lang: MonacoLanguage,
): keyof typeof languageCategories => {
    for (const [category, languages] of Object.entries(
        languageCategories,
    ) as unknown as [keyof typeof languageCategories, MonacoLanguage[]][]) {
        if (languages.includes(lang)) {
            return category;
        }
    }
    return 'Web Development';
};

const CodeStepsAnimator = () => {

    const {
        steps,
        currentStep,
        isPlaying,
        play,
        stop,
        addStep,
        deleteStep,
        updateStepCode,
        resetToStep,
    } = useCodeSteps(DEFAULT_STEPS);

    const previewRef = useRef<HTMLElement>(null);

    const [language, setLanguage] = useState<MonacoLanguage>(DEFAULT_LANGUAGE);
    const [selectedCategory, setSelectedCategory] = useState<
        keyof typeof languageCategories
    >(getCategoryOfLanguage(DEFAULT_LANGUAGE));

    const { highlight, ready: isHighlightReady } = useHighlight(language);

    useEffect(() => {
        if (isHighlightReady && previewRef.current) {
            highlight(previewRef.current);
        }
    }, [isHighlightReady, currentStep, highlight]);

    const currentCode = steps[currentStep]?.code || '';

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-6 flex flex-wrap gap-4 items-center">
                    <button
                        onClick={isPlaying ? stop : play}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 disabled:opacity-50"
                        disabled={steps.length <= 1}
                    >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                        {isPlaying ? 'Pause' : 'Auto Play'}
                    </button>

                    <button
                        onClick={addStep}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Add step
                    </button>

                    <LanguageSelector
                        selectedCategory={selectedCategory}
                        language={language}
                        onCategoryChange={(cat) => {
                            setSelectedCategory(cat);
                            const firstLang = languageCategories[cat][0];
                            setLanguage(firstLang);
                        }}
                        onLanguageChange={setLanguage}
                    />
                </header>

                <StepEditorList
                    steps={steps}
                    currentStep={currentStep}
                    language={language}
                    onSelect={resetToStep}
                    onDelete={deleteStep}
                    onChange={updateStepCode}
                />

                <CodePreview
                    code={currentCode}
                    language={language}
                    previewRef={previewRef}
                />

                <div className="mt-6 text-center text-gray-400 text-sm">
                    💡 Easily create animations of your step-by-step code for your slides • 🎨 Syntax highlighting • ✨ Interactive code
                </div>
            </div>
        </div>
    );
};

export default CodeStepsAnimator;
