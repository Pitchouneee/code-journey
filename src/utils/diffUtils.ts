export const computeAnimatedDiffs = async (
    fromCode: string,
    toCode: string,
    setCode: (code: string) => void
): Promise<void> => {
    const fromLines = fromCode.split('\n');
    const toLines = toCode.split('\n');
    const maxLength = Math.max(fromLines.length, toLines.length);

    let current = [...fromLines];

    for (let i = 0; i < maxLength; i++) {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const oldLine = fromLines[i] || '';
        const newLine = toLines[i] || '';

        if (oldLine !== newLine) {
            if (!oldLine) {
                current.splice(i, 0, newLine);
            } else if (!newLine) {
                current.splice(i, 1);
            } else {
                current[i] = newLine;
            }
            setCode(current.join('\n'));
        }
    }
};
