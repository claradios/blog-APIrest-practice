//Validador que verifica que el comentario no contiene ninguna palabra ofensiva.

module.exports = (text, wordsToCheck) => {
    const wrongWords = [];
    wordsToCheck.forEach(offensiveWord => {
        if (text.includes(offensiveWord.word)) {
            wrongWords.push(offensiveWord);
        }
    });
    return wrongWords;
}