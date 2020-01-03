const validator = require('../validator');

describe('comment validation according with forbidden words', ()=> {

    test('comment contains forbidden words->returns [{word:"cerdo",level:2}]', () => {
        const text = 'Tío eres un cerdo, deja de escribir estas chorradas';
        const wordsToCheck = [{word:"cerdo",level:2},{word:"zorra",level:4}];
        const output = [{word:"cerdo",level:2}];
        const result = validator(text,wordsToCheck);

        expect(result).toEqual(output);
    });
    test('comment without forbidden words->returns []', () => {
        const text = 'Hola a todos, quería saludar desde Madrid.';
        const wordsToCheck = [{word:"cerdo",level:2},{word:"zorra",level:4}];
        const output = [];
        const result =  validator(text,wordsToCheck);

        expect(result).toEqual(output);
    });
});

