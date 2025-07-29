import React, { useState } from 'react';
import { Play, Pause, Plus, Trash2 } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { monacoLanguages, type MonacoLanguage } from '../constants/monacoLanguages';

const CodeStepsAnimator = () => {
    const [steps, setSteps] = useState([
        {
            id: 1,
            code: `console.log("Hello World");`
        },
        {
            id: 2,
            code: `function greet(name) {
  return \`Hello \${name}\`;
}`
        }
    ]);

    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [animationCode, setAnimationCode] = useState(steps[0].code);
    const [language, setLanguage] = useState<MonacoLanguage>('javascript');

    const addStep = () => {
        const newStep = {
            id: Date.now(),
            code: `// Nouveau code ici`
        };
        setSteps([...steps, newStep]);
    };

    const deleteStep = (id: number) => {
        if (steps.length > 1) {
            const newSteps = steps.filter((s) => s.id !== id);
            setSteps(newSteps);
            if (currentStep >= newSteps.length) {
                const newIndex = Math.max(0, newSteps.length - 1);
                setCurrentStep(newIndex);
                setAnimationCode(newSteps[newIndex].code);
            }
        }
    };

    const updateStepCode = (id: number, value: string) => {
        setSteps(steps.map((s) => (s.id === id ? { ...s, code: value } : s)));
    };

    const playAnimation = () => {
        if (steps.length <= 1) return;
        setIsPlaying(true);
        let stepIndex = 0;

        const playNextStep = () => {
            if (stepIndex < steps.length - 1) {
                setCurrentStep(stepIndex + 1);
                setAnimationCode(steps[stepIndex + 1].code);
                stepIndex++;
                setTimeout(playNextStep, 1200);
            } else {
                setIsPlaying(false);
            }
        };

        setCurrentStep(0);
        setAnimationCode(steps[0].code);
        setTimeout(playNextStep, 500);
    };

    const stopAnimation = () => {
        setIsPlaying(false);
    };

    const resetToStep = (index: number) => {
        if (!isPlaying) {
            setCurrentStep(index);
            setAnimationCode(steps[index].code);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-6">
                    <div className="flex items-center gap-4 mb-4 flex-wrap">
                        <button
                            onClick={isPlaying ? stopAnimation : playAnimation}
                            disabled={steps.length <= 1}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
                        >
                            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                            {isPlaying ? 'Pause' : 'Auto Play'}
                        </button>

                        <button
                            onClick={addStep}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
                        >
                            <Plus size={18} />
                            Ajouter Étape
                        </button>

                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as MonacoLanguage)}
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg font-medium transition-colors cursor-pointer text-white"
                        >
                            <option value="" disabled hidden>
                                Sélectionnez un langage...
                            </option>
                            {monacoLanguages.map((lang) => (
                                <option key={lang} value={lang}>
                                    {lang}
                                </option>
                            ))}
                        </select>
                    </div>
                </header>

                {/* Étapes */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Étapes ({steps.length})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className={`bg-gray-800 rounded-lg p-4 border-2 transition-all cursor-pointer ${currentStep === index
                                    ? 'border-blue-500 bg-gray-750 shadow-lg shadow-blue-500/20'
                                    : 'border-gray-700 hover:border-gray-600'
                                    }`}
                                onClick={() => resetToStep(index)}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-medium text-blue-400 flex-1">Étape {index + 1}</h3>
                                    {steps.length > 1 && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteStep(step.id);
                                            }}
                                            className="p-1 hover:bg-red-600 rounded transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>

                                <Editor
                                    height="150px"
                                    language={language}
                                    theme="vs-dark"
                                    value={step.code}
                                    onChange={(value) => updateStepCode(step.id, value || '')}
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 12,
                                        scrollBeyondLastLine: false,
                                        automaticLayout: true,
                                        lineNumbers: 'on'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Aperçu du code */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Aperçu du code</h2>
                    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
                        <div className="bg-gray-700 px-4 py-2 flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="ml-2 text-sm text-yellow-400">
                                📁 main.{language}
                            </span>
                            <span className="ml-auto text-xs text-gray-400">{language}</span>
                        </div>

                        <div className="bg-gray-900 p-4 min-h-96 font-mono text-sm overflow-auto whitespace-pre-wrap">
                            {animationCode}
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-gray-400 text-sm">
                    🎯 Animation intelligente des différences • 🎨 Coloration syntaxique •
                    ✨ Surlignage des modifications en temps réel
                </div>
            </div>
        </div>
    );
};

export default CodeStepsAnimator;
