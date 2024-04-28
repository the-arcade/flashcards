import fs from 'node:fs';
import readline from 'node:readline';


const WORDS_FILE_NAME = 'words.csv',
    wordList = prepareWordList(WORDS_FILE_NAME),
    LANGUAGE_LIST = wordList.shift(),
    TOTAL_WORDS_TO_TRY = 10;


function prepareWordList (fileName) {
    return fs
        .readFileSync(fileName, 'utf8')
        .split('\n')
        .map((singleWordEntry) => {
            return singleWordEntry.split(',');
        });
}

/* Returns a random index for the language list.
 * The index must be within the length of the language list.
 * Requires the total language count from the source word file.
 */
function getRandomIndex (languageCount) {
    return Math.floor(Math.random() * languageCount);
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

function quizWord (rl, callback) {
    const wordIndex = getRandomIndex(wordList.length),
        randomWordEntry = wordList[wordIndex],
        languageIndex = getRandomIndex(LANGUAGE_LIST.length),
        randomWord = randomWordEntry[languageIndex],
        targetIndex = getTargetLanguageIndex(LANGUAGE_LIST.length, languageIndex),
        targetLanguage = LANGUAGE_LIST[targetIndex],
        targetWord = wordList[wordIndex][targetIndex];


    //console.log('word index: ' + wordIndex);
    //console.log('language index: ' + languageIndex);

    //console.log(wordList[wordIndex]);

    rl.question(`Was ist die ${targetLanguage} Wort für: ${randomWord}?\n>`, (userEntry) => {
        if (userEntry == targetWord) {
            console.log('Richtig.\n');
            return callback(null, 1);
        } else {
            console.log('Unrichtig.\n');
            return callback(null, 0);
        }
    });
}


function main (rl, callbackCount = 0, score = 0) {
    if (!rl) {
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    if (callbackCount < TOTAL_WORDS_TO_TRY) {
        quizWord(rl, (err, quizPoint) => {
            if (err) {
                console.error('error processing quiz question:');
                return console.error(err);
            }

            main(rl, callbackCount + 1, score + quizPoint);
        });
    } else {
        console.log(`Final score: ${score} / ${TOTAL_WORDS_TO_TRY}`);
        rl.close();
    }
}


export default {
    main,
    getRandomIndex,
    getTargetLanguageIndex,
};
