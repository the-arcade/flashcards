import flashcards from '../flashcards.js';
import fs from 'node:fs';

jest.mock('node:fs');


test('getRandomIndex() returns a valid index number', () => {
    const languageListLength = 2,
        randomIndex = flashcards.getRandomIndex(languageListLength);

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


test('prepareWordList() returns a list of translation lists', () => {
    const expectedFileName = 'filename.csv',
        rawCsvData = `language 1,language 2
word 1,word 1
word 2,word 2
`;

    fs.readFileSync.mockImplementation((fileName, encoding) => {
        expect(fileName).toBe(expectedFileName);
        expect(encoding).toBe('utf8');
        return rawCsvData;
    });

    const wordList = flashcards.prepareWordList(expectedFileName);

    expect(wordList).toEqual([
        ['language 1', 'language 2'],
        ['word 1', 'word 1'],
        ['word 2', 'word 2'],
    ]);
});
