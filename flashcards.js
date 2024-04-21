const fs = require('node:fs'),
    readline = require('node:readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    }),
    WORDS_FILE_NAME = 'words.csv',
    wordList = prepareWordList(WORDS_FILE_NAME),
    WORD_COUNT = wordList.length,
    LANGUAGE_COUNT = wordList[0].length;


function prepareWordList (fileName) {
    return fs
        .readFileSync(fileName, 'utf8')
        .split('\n')
        .map((singleWordEntry) => {
            return singleWordEntry.split(',');
        });
}

function getTargetLanguageIndex (sourceRandomIndex) {
    let targetLanguageIndex = Math.floor((Math.random() * 10) % LANGUAGE_COUNT);


    while (targetLanguageIndex == sourceRandomIndex) {
        console.log('trying target language index again..');

        targetLanguageIndex = Math.floor((Math.random() * 10) % LANGUAGE_COUNT);
    }

    return targetLanguageIndex;
}

function quizWord () {
    const wordIndex = Math.floor((Math.random() * 100) % WORD_COUNT),
        languageIndex = Math.floor((Math.random() * 10) % LANGUAGE_COUNT),
        randomWordEntry = wordList[wordIndex],
        randomWord = randomWordEntry[languageIndex],
        targetIndex = getTargetLanguageIndex(languageIndex),
        targetLanguage = wordList[0][targetIndex],
        targetWord = wordList[wordIndex][targetIndex];


    console.log('word index: ' + wordIndex);
    console.log('language index: ' + languageIndex);

    //console.log(wordList[wordIndex]);

    rl.question(`What is the ${targetLanguage} word for: ${randomWord}?\n>`, (userEntry) => {
        if (userEntry == targetWord) {
            console.log('Correct.');
        } else {
            console.log('Incorrect.');
        }

        return rl.close();
    });
}


//console.log('word count: ' + WORD_COUNT);
//console.log('language count: ' + LANGUAGE_COUNT);

quizWord();