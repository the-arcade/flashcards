import flashcards from '../flashcards.js';


test('getLanguageIndex()', () => {
    const randomIndex = flashcards.getLanguageIndex();

    expect(Number.isInteger(randomIndex)).toBe(true);
});

test('getTargetLanguageIndex() with initial index of: 0', () => {
    const initialIndex = 0,
        randomIndex = flashcards.getTargetLanguageIndex(initialIndex);

    expect(Number.isInteger(randomIndex)).toBe(true);
    expect(randomIndex !== initialIndex).toBe(true);
});

test('getTargetLanguageIndex() with initial index of: 3', () => {
    const initialIndex = 3,
        randomIndex = flashcards.getTargetLanguageIndex(initialIndex);

    expect(Number.isInteger(randomIndex)).toBe(true);
    expect(randomIndex !== initialIndex).toBe(true);
});
