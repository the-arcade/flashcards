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

function getTargetLanguageIndex (sourceRandomIndex) {
    let targetLanguageIndex = Math.floor(Math.random() * LANGUAGE_COUNT);


    while (targetLanguageIndex == sourceRandomIndex) {
        //console.log('trying target language index again..');

        targetLanguageIndex = Math.floor(Math.random() * LANGUAGE_COUNT);
    }

    return targetLanguageIndex;
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

    rl.question(`What is the ${targetLanguage} word for: ${randomWord}?\n>`, (userEntry) => {
        if (userEntry == targetWord) {
            console.log('Correct.');
            return callback(null, 1);
        } else {
            console.log('Incorrect.');
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
