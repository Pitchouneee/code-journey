import type { FC } from 'react';
import Editor from '@monaco-editor/react';
import { Trash2 } from 'lucide-react';
import type { Step } from '../types';
import type { MonacoLanguage } from '../constants/monacoLanguages';

interface Props {
    step: Step;
    index: number;
    language: MonacoLanguage;
    isActive: boolean;
    onSelect: (index: number) => void;
    onDelete: (id: number) => void;
    onChange: (id: number, value: string) => void;
}

const StepEditorItem: FC<Props> = ({
    step,
    index,
    language,
    isActive,
    onSelect,
    onDelete,
    onChange,
}) => (
    <div
        onClick={() => onSelect(index)}
        className={`bg-gray-800 border-2 rounded-lg p-4 cursor-pointer transition-all ${isActive ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-gray-700 hover:border-gray-600'
            }`}
    >
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-blue-400 font-medium flex-1">{step.title}</h3>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(step.id);
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
            onChange={(value) => onChange(step.id, value || '')}
            options={{
                minimap: { enabled: false },
                fontSize: 12,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                lineNumbers: 'on',
            }}
        />
    </div>
);

export default StepEditorItem;