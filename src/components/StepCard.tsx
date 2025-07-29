import React, { useState } from 'react';
import type { Step } from '../types';
import { Trash2, Edit3 } from 'lucide-react';
import Editor from '@monaco-editor/react';

type Props = {
  step: Step;
  index: number;
  isActive: boolean;
  onUpdate: (id: number, field: keyof Step, value: string) => void;
  onDelete: (id: number) => void;
  onSelect: () => void;
};

const StepCard: React.FC<Props> = ({ step, index, isActive, onUpdate, onDelete, onSelect }) => {
  const [editingTitle, setEditingTitle] = useState(false);

  return (
    <div
      className={`bg-gray-800 rounded-lg p-4 border-2 transition-all cursor-pointer ${
        isActive
          ? 'border-blue-500 bg-gray-750 shadow-lg shadow-blue-500/20'
          : 'border-gray-700 hover:border-gray-600'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-2">
        {editingTitle ? (
          <input
            type="text"
            value={step.title}
            onChange={(e) => onUpdate(step.id, 'title', e.target.value)}
            onBlur={() => setEditingTitle(false)}
            onKeyPress={(e) => e.key === 'Enter' && setEditingTitle(false)}
            className="bg-gray-700 px-2 py-1 rounded text-sm flex-1 mr-2"
            autoFocus
          />
        ) : (
          <h3 className="font-medium text-blue-400 flex-1" onClick={() => setEditingTitle(true)}>
            {step.title}
          </h3>
        )}

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditingTitle(true);
            }}
            className="p-1 hover:bg-gray-600 rounded transition-colors"
          >
            <Edit3 size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(step.id);
            }}
            className="p-1 hover:bg-red-600 rounded transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="text-xs text-red-400 mb-2">Supprimé</div>

      <div onClick={(e) => e.stopPropagation()} className="border border-gray-600 rounded overflow-hidden">
        <Editor
          height="200px"
          defaultLanguage="javascript"
          value={step.code}
          theme="vs-dark"
          onChange={(value) => onUpdate(step.id, 'code', value || '')}
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            padding: { top: 10 },
            scrollBeyondLastLine: false,
            scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 }
          }}
        />
      </div>
    </div>
  );
};

export default StepCard;
