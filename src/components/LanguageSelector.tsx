import type { FC } from 'react';
import type { MonacoLanguage } from '../constants/monacoLanguages';
import { languageCategories } from '../constants/languageCategories';
import { getLanguageLabel } from '../constants/monacoLanguageLabels';

interface Props {
    selectedCategory: keyof typeof languageCategories;
    language: MonacoLanguage;
    onCategoryChange: (cat: keyof typeof languageCategories) => void;
    onLanguageChange: (lang: MonacoLanguage) => void;
}

const LanguageSelector: FC<Props> = ({
    selectedCategory,
    language,
    onCategoryChange,
    onLanguageChange,
}) => (
    <div className="flex flex-wrap gap-2 items-center">
        <select
            value={selectedCategory}
            onChange={(e) =>
                onCategoryChange(e.target.value as keyof typeof languageCategories)
            }
            className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
        >
            {Object.keys(languageCategories).map((cat) => (
                <option key={cat} value={cat}>
                    {cat}
                </option>
            ))}
        </select>

        <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as MonacoLanguage)}
            className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
        >
            {languageCategories[selectedCategory].map((lang) => (
                <option key={lang} value={lang}>
                    {getLanguageLabel(lang)}
                </option>
            ))}
        </select>
    </div>
);

export default LanguageSelector;