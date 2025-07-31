import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Plus, Trash2 } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { type MonacoLanguage } from '../constants/monacoLanguages';
import { getLanguageExtension } from '../constants/monacoLanguageExtensions';
import { getLanguageLabel } from '../constants/monacoLanguageLabels';
import { languageCategories } from '../constants/languageCategories';
import type { Step } from '../types';

const DEFAULT_STEPS: Step[] = [
    { id: 1, title: 'Étape 1', code: `class User {\n  constructor(name) {\n    this.name = name;\n  }\n}` },
    { id: 2, title: 'Étape 2', code: `class User {\n  constructor(name, email) {\n    this.name = name;\n    this.email = email;\n  }\n}` },
    { id: 3, title: 'Étape 3', code: `class Person {\n  constructor(name, email) {\n    this.name = name;\n    this.email = email;\n  }\n}` },
    { id: 4, title: 'Étape 4', code: `class Person {\n  constructor(name, email) {\n    this.name = name;\n    this.email = email;\n  }\n\n  public getName() {\n    return this.email;\n  }\n}` }
];

const CodeStepsAnimator = () => {
    const [steps, setSteps] = useState<Step[]>(DEFAULT_STEPS);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const previewRef = useRef<HTMLElement>(null);
    const hljsRef = useRef<any>(null);
    const intervalRef = useRef<number | null>(null);

    const [isHighlightReady, setIsHighlightReady] = useState(false);

    const DEFAULT_LANGUAGE: MonacoLanguage = 'java';
    const getCategoryOfLanguage = (lang: MonacoLanguage): keyof typeof languageCategories => {
        for (const [category, languages] of Object.entries(languageCategories) as unknown as [keyof typeof languageCategories, MonacoLanguage[]][]) {
            if (languages.includes(lang)) {
                return category;
            }
        }
        return 'Web Development'; // fallback
    };

    const [language, setLanguage] = useState<MonacoLanguage>(DEFAULT_LANGUAGE);
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof languageCategories>(
        getCategoryOfLanguage(DEFAULT_LANGUAGE)
    );

    // Loading Highlight.js dynamiquement
    useEffect(() => {
        const loadHighlightJS = () => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
            script.onload = () => {
                hljsRef.current = window.hljs;
                setIsHighlightReady(true);
            };
            document.head.appendChild(script);

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs2015.min.css';
            document.head.appendChild(link);
        };

        loadHighlightJS();
    }, []);

    const highlightCode = () => {
        if (hljsRef.current && previewRef.current) {
            previewRef.current.removeAttribute('data-highlighted');
            previewRef.current.className = `language-${language}`;
            hljsRef.current.highlightElement(previewRef.current);
        }
    };

    useEffect(() => {
        if (isHighlightReady) {
            highlightCode();
        }
    }, [isHighlightReady, currentStep, language]);

    const playAnimation = () => {
        if (steps.length <= 1 || isPlaying) return;

        setIsPlaying(true);
        setCurrentStep(0);

        let index = 0;
        intervalRef.current = setInterval(() => {
            index++;
            if (index >= steps.length) {
                stopAnimation();
                return;
            }
            setCurrentStep(index);
        }, 1200);
    };

    const stopAnimation = () => {
        setIsPlaying(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const addStep = () => {
        const newStep: Step = {
            id: Date.now(),
            title: `Étape ${steps.length + 1}`,
            code: `// Nouveau code ici`
        };
        setSteps([...steps, newStep]);
    };

    const deleteStep = (id: number) => {
        if (steps.length === 1) return;
        const newSteps = steps.filter((s) => s.id !== id);
        setSteps(newSteps);
        if (currentStep >= newSteps.length) {
            setCurrentStep(newSteps.length - 1);
        }
    };

    const updateStepCode = (id: number, value: string) => {
        setSteps((prev) =>
            prev.map((step) => (step.id === id ? { ...step, code: value } : step))
        );
    };

    const resetToStep = (index: number) => {
        if (!isPlaying) {
            setCurrentStep(index);
        }
    };

    const currentCode = steps[currentStep]?.code || '';

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-6 flex flex-wrap gap-4 items-center">
                    <button
                        onClick={isPlaying ? stopAnimation : playAnimation}
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
                        Ajouter Étape
                    </button>

                    <div className="flex flex-wrap gap-2 items-center">
                        {/* Sélecteur de catégorie */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => {
                                const cat = e.target.value as keyof typeof languageCategories;
                                setSelectedCategory(cat);
                                const firstLang = languageCategories[cat][0];
                                setLanguage(firstLang);
                            }}
                            className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                        >
                            {Object.keys(languageCategories).map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>

                        {/* Sélecteur de langage dans la catégorie */}
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as MonacoLanguage)}
                            className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                        >
                            {languageCategories[selectedCategory].map((lang) => (
                                <option key={lang} value={lang}>
                                    {getLanguageLabel(lang)}
                                </option>
                            ))}
                        </select>
                    </div>
                </header>

                {/* Liste des étapes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            onClick={() => resetToStep(index)}
                            className={`bg-gray-800 border-2 rounded-lg p-4 cursor-pointer transition-all ${currentStep === index
                                ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                                : 'border-gray-700 hover:border-gray-600'
                                }`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-blue-400 font-medium flex-1">{step.title}</h3>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteStep(step.id);
                                    }}
                                    className="hover:bg-red-600 p-1 rounded"
                                >
                                    <Trash2 size={14} />
                                </button>
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

                {/* Aperçu en lecture seule */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Aperçu du code</h2>
                    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
                        <div className="bg-gray-700 px-4 py-2 flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="ml-2 text-sm text-yellow-400">
                                📁 main.{getLanguageExtension(language)}
                            </span>
                            <span className="ml-auto text-xs text-gray-400">{language}</span>
                        </div>

                        <div className="bg-gray-900 p-4 min-h-96 overflow-auto">
                            <pre className="text-sm">
                                <code
                                    ref={previewRef}
                                    className={`language-${language}`}
                                    style={{
                                        background: 'transparent',
                                        padding: 0,
                                        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
                                    }}
                                >
                                    {currentCode}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-gray-400 text-sm">
                    🎯 Animation intelligente des différences • 🎨 Coloration syntaxique • ✨ Code interactif
                </div>
            </div>
        </div>
    );
};

export default CodeStepsAnimator;
