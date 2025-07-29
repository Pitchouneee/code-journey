import React from 'react';

type Props = {
    code: string;
};

const CodeAnimation: React.FC<Props> = ({ code }) => {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
            <div className="bg-gray-700 px-4 py-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-2 text-sm text-yellow-400">📁 code.js</span>
            </div>
            <pre className="bg-gray-900 p-4 min-h-96 font-mono text-sm overflow-auto whitespace-pre-wrap">
                {code}
            </pre>
        </div>
    );
};

export default CodeAnimation;
