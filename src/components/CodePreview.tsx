import type { FC } from 'react';
import type { MonacoLanguage } from '../constants/monacoLanguages';
import { getLanguageExtension } from '../constants/monacoLanguageExtensions';

interface Props {
    code: string;
    language: MonacoLanguage;
    previewRef: React.RefObject<HTMLElement | null>;
}

const CodePreview: FC<Props> = ({ code, language, previewRef }) => (
    <div>
        <h2 className="text-lg font-semibold mb-4">Code preview</h2>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
            <div className="bg-gray-700 px-4 py-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
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
                            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                        }}
                    >
                        {code}
                    </code>
                </pre>
            </div>
        </div>
    </div>
);

export default CodePreview;