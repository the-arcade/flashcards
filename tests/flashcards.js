import flashcards from '../flashcards.js';


test('getLanguageIndex() returns a valid index number', () => {
    const languageListLength = 2,
        randomIndex = flashcards.getLanguageIndex(languageListLength);

    expect(Number.isInteger(randomIndex)).toBe(true);
    expect(randomIndex).toBeGreaterThanOrEqual(0);
    expect(randomIndex).toBeLessThan(languageListLength);
});


test('getTargetLanguageIndex() returns a valid index with initial index of: 0', () => {
    const languageListLength = 2,
        initialIndex = 0,
        randomIndex = flashcards.getTargetLanguageIndex(languageListLength, initialIndex);

    expect(Number.isInteger(randomIndex)).toBe(true);
    expect(randomIndex !== initialIndex).toBe(true);
    expect(randomIndex).toBeGreaterThanOrEqual(0);
    expect(randomIndex).toBeLessThan(languageListLength);
});


test('getTargetLanguageIndex() returns a valid index with initial index of: 1', () => {
    const languageListLength = 2,
        initialIndex = 1,
        randomIndex = flashcards.getTargetLanguageIndex(languageListLength, initialIndex);

    expect(Number.isInteger(randomIndex)).toBe(true);
    expect(randomIndex !== initialIndex).toBe(true);
    expect(randomIndex).toBeGreaterThanOrEqual(0);
    expect(randomIndex).toBeLessThan(languageListLength);
});
