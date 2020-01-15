// const initApp = require('../server');
// const supertest = require('supertest');

// let request;

// beforeAll(async ()=>{
//     const app = await initApp();
//     request = supertest(app); 

// });

// test('when get all words then get test words', async (done) => {

//     const { body } = await request.get('/offensivewords')
//         .expect('Content-type', /json/)
//         .expect(200)

//     expect(body[0].word).toBeTruthy();
//     expect(body[0].level).toBeTruthy();
//     expect(body[0]._id).toBeTruthy();
//     done();
// });


// test('when create new offensive word then this offensive word can be obtained', async (done) => {
//     var auth = {};
//     var newOffensiveWord = {
//         word: 'cojones',
//         level: '5'       
//     };

//     const { body } = await request.post('/offensivewords')        
//         .send(newPost)
//         .set('Authorization', 'bearer ' + auth.token)

//         .expect('Content-type', /json/)
//         .expect(200)

//     expect(body._id).toBeTruthy();

//     const { body: getBody } = await request.get('/offensivewords/' + body._id)
//         .expect('Content-type', /json/)
//         .expect(200)

//     getBody.word = newOffensiveWord.word;
//     getBody.level = newOffensiveWord.level;

//     done();

// });