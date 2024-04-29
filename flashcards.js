import fs from 'node:fs';
import readline from 'node:readline';


const WORDS_FILE_NAME = 'words.csv',
    TOTAL_WORDS_TO_TRY = 10;


/* Function that receives a file name and reads that file from disk.
 * The data is split by line into a list, and each element of the list is split
 * on commas to get a sub list of words.
 */
function prepareWordList (fileName) {
    return fs
        .readFileSync(fileName, 'utf8')
        .split('\n')
        .filter((singleWordEntry) => {
            return singleWordEntry !== '';
        }).map((singleWordEntry) => {
            return singleWordEntry.split(',');
        });
}

/* Returns a random index for the word or language list.
 * The index must be within the length of the list.
 * Requires the total length of the list to calculate a random index.
 */
function getRandomIndex (listLength) {
    return Math.floor(Math.random() * listLength);
}

/* Returns another random index to translate a word by picking a random
 * number (one less than the original language length) to increment the given
 * index.
 *
 * The returned index will not be the same index as the incoming parameter
 * and must be within the length of the language list.
 *
 * Requires the total language count from the source word file.
 */
function getTargetLanguageIndex (languageCount, initialRandomIndex) {
    const remainingLanguagesLength = languageCount - 1;

    return (Math.ceil(Math.random() * remainingLanguagesLength) + initialRandomIndex) % languageCount;
}


function getRandomWordEntry (wordList) {
    const wordIndex = getRandomIndex(wordList.length);

    return wordList[wordIndex];
}


function promptUser (rl, randomWord, targetLanguage, expectedWord, callback) {
    return rl.question(`Was ist die ${targetLanguage} Wort für: ${randomWord}?\n>`, (userEntry) => {
        if (userEntry == expectedWord) {
            console.log('Richtig.\n');
            return callback(null, 1);
        } else {
            console.log('Unrichtig.\n');
            return callback(null, 0);
        }
    });
}


function quizWord (rl, wordList, languageList, callback) {
    const randomWordEntry = getRandomWordEntry(wordList),
        languageIndex = getRandomIndex(languageList.length),
        targetLanguageIndex = getTargetLanguageIndex(languageList.length, languageIndex);


    return promptUser(rl, randomWordEntry[languageIndex], languageList[targetLanguageIndex], randomWordEntry[targetLanguageIndex], callback);
}


function main (rl, wordList, languageList, callbackCount = 0, score = 0) {
    if (!rl) {
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        wordList = prepareWordList(WORDS_FILE_NAME);
        languageList = wordList.shift();
    }

    if (callbackCount < TOTAL_WORDS_TO_TRY) {
        quizWord(rl, wordList, languageList, (err, quizPoint) => {
            if (err) {
                console.error('error processing quiz question:');
                return console.error(err);
            }

            main(rl, wordList, languageList, callbackCount + 1, score + quizPoint);
        });
    } else {
        console.log(`Final score: ${score} / ${TOTAL_WORDS_TO_TRY}`);
        rl.close();
    }
}


export default {
    main,
    prepareWordList,
    getRandomIndex,
    getTargetLanguageIndex,
    getRandomWordEntry,
    promptUser,
};
