import React, { useState } from 'react';
import StepEditorList from './components/StepEditorList';
import CodeAnimation from './components/CodeAnimation';
import Controls from './components/Controls';
import type { Step } from './types';
import './App.css';

const App: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationCode, setAnimationCode] = useState('');

  const addStep = () => {
    const newStep: Step = {
      id: Date.now(),
      title: `Étape ${steps.length + 1}`,
      code: '// code ici...'
    };
    setSteps([...steps, newStep]);
  };

  const updateStep = (id: number, field: keyof Step, value: string) => {
    setSteps(steps.map(step => step.id === id ? { ...step, [field]: value } : step));
  };

  const deleteStep = (id: number) => {
    const updated = steps.filter(step => step.id !== id);
    setSteps(updated);
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Controls
        onAddStep={addStep}
        steps={steps}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        setAnimationCode={setAnimationCode}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <StepEditorList
          steps={steps}
          currentIndex={currentIndex}
          onUpdateStep={updateStep}
          onDeleteStep={deleteStep}
          onSelectStep={setCurrentIndex}
        />
        <CodeAnimation code={animationCode || steps[currentIndex]?.code || ''} />
      </div>
    </div>
  );
};

export default App;
