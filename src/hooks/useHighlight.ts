import { useCallback, useEffect, useRef, useState } from 'react';

export interface HighlightJS {
    highlightElement: (el: HTMLElement) => void;
}

export const useHighlight = (language: string) => {
    const hljsRef = useRef<HighlightJS | null>(null);
    const [ready, setReady] = useState(false);

    const highlight = useCallback((element: HTMLElement) => {
        if (hljsRef.current) {
            element.removeAttribute('data-highlighted');
            element.className = `language-${language}`;
            hljsRef.current.highlightElement(element);
        }
    }, [language]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
        script.onload = () => {
            hljsRef.current = window.hljs;
            setReady(true);
        };
        document.head.appendChild(script);

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs2015.min.css';
        document.head.appendChild(link);
    }, []);

    return { highlight, ready };
};