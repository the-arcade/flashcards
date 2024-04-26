const fs = require('node:fs'),
    readline = require('node:readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    }),
    WORDS_FILE_NAME = 'words.csv',
    wordList = prepareWordList(WORDS_FILE_NAME),
    LANGUAGE_LIST = wordList.shift(),
    WORD_COUNT = wordList.length,
    LANGUAGE_COUNT = LANGUAGE_LIST.length,
    TOTAL_WORDS_TO_TRY = 10;


function prepareWordList (fileName) {
    return fs
        .readFileSync(fileName, 'utf8')
        .split('\n')
        .map((singleWordEntry) => {
            return singleWordEntry.split(',');
        });
}

/* Returns a random language index if called with nothing.
 * If called with an existing random language index, then returns another
 * random index of the remaining indices. That index is used for the
 * translation language.
 */
function getTargetLanguageIndex (sourceRandomIndex) {
    if (sourceRandomIndex === undefined || sourceRandomIndex === null) {
        return Math.floor(Math.random() * LANGUAGE_COUNT);
    }

    return (Math.ceil(Math.random() * 2) + sourceRandomIndex) % LANGUAGE_COUNT;
}

function quizWord (callback) {
    const wordIndex = Math.floor(Math.random() * WORD_COUNT),
        languageIndex = getTargetLanguageIndex(),
        randomWordEntry = wordList[wordIndex],
        randomWord = randomWordEntry[languageIndex],
        targetIndex = getTargetLanguageIndex(languageIndex),
        targetLanguage = LANGUAGE_LIST[targetIndex],
        targetWord = wordList[wordIndex][targetIndex];


    //console.log('word index: ' + wordIndex);
    //console.log('language index: ' + languageIndex);

    //console.log(wordList[wordIndex]);

    rl.question(`Was ist die ${targetLanguage} Wort für: ${randomWord}?\n>`, (userEntry) => {
        if (userEntry == targetWord) {
            console.log('Richtig.');
            return callback(null, 1);
        } else {
            console.log('Unrichtig.');
            return callback(null, 0);
        }
    });
}


//console.log('word count: ' + WORD_COUNT);
//console.log('language count: ' + LANGUAGE_COUNT);


function main (callbackCount, score) {
    if (callbackCount < TOTAL_WORDS_TO_TRY) {
        quizWord((err, quizPoint) => {
            if (err) {
                console.error('error processing quiz question:');
                return console.error(err);
            }

            main(callbackCount + 1, score + quizPoint);
        });
    } else {
        console.log(`Final score: ${score} / ${TOTAL_WORDS_TO_TRY}`);
        rl.close();
    }
}


main(0, 0);
