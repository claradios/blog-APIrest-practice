//Validador que verifica que el comentario no contiene ninguna palabra ofensiva.
//https://stackoverflow.com/questions/2232934/whole-word-match-in-javascript
//https://www.w3schools.com/js/js_regexp.asp
module.exports = (text = '', wordsToCheck = []) => {
    const wrongWords = [];
    const lowerText = text.toLowerCase();
    wordsToCheck.forEach(offensiveWord => {
        
        const { word } = offensiveWord;
        const capitalized = word.charAt(0).toUpperCase() + word.slice(1);

        const options = [
            ` ${word} `,
            ` ${word},`,
            ` ${word}.`,
            ` ${word}?`,
            ` ${word}!`,
            `${capitalized} `,
            `${capitalized},`,
            `${capitalized}.`,
            `${capitalized}?`,
            `${capitalized}!`,
        ];
      
        options.forEach(opt => {
            if (lowerText.includes(opt) || text.includes(opt)) {
                !wrongWords.includes(offensiveWord) ? wrongWords.push(offensiveWord) : null
            }
        });
    });

    return wrongWords;
}
