const initApp = require('../server');
const supertest = require('supertest');


// probar a testear sin autorización --> 401
//const repository = require('../repository');
// DEFINIR EN EL REPO UNA FUNCIÓN repository.dbDisconnect();
// LLAMAR A ESA FUNCIÓN AL FINAL DE LOS TEST CON UN afterAll(()=>repository.dbDidsconnect());

//LOGEAR FALSO USER
//https://medium.com/@internetross/a-pattern-for-creating-authenticated-sessions-for-routing-specs-with-supertest-and-jest-until-the-baf14d498e9d
// AUTH TOKEIN
//https://gist.github.com/bq1990/595c615970250e97f3ea

let request;


beforeAll(async () => {
    const app = await initApp();
    request = supertest(app);

});
// afterAll(() => {
//     return repository.dbDisconnect();
//   });


describe('My API tests with ADMIN USER', function () {

    var token = null;

    beforeEach((done) => {
        request
            .post('/login/')
            .auth('Pepa Flores', 'tombola3')
            .send({ username: "Pepa Flores", password: "tombola3" })
            .end(function (err, res) {

                token = res.body.token;

                done();
            });
    });
    // BLOG-POST ENDPOINTS
    test('when get all posts then get test posts', async (done) => {
        console.log(token);
        const { body } = await request.get('/posts')
            .expect('Content-type', /json/)
            .expect(200)

        expect(body[0].author).toBeTruthy();
        expect(body[0].content).toBeTruthy();
        expect(body[0]._id).toBeTruthy();
        done();
    });


    test('when create new post then this post can be obtained', async (done) => {

        var newPost = {
            title: 'Learn About Something',
            content: 'Lets learn guys. Im going to explain you how.',
            urlToImage: 'www.kittens.org'
        };

        const { body } = await request.post('/posts')
            .send(newPost)
            .set('Authorization', 'bearer ' + token)
            .expect('Content-type', /json/)
            .expect(200)

        const post = await request.get('/posts');
        const lastPostId = post.body[post.body.length - 1]._id

        const { body: getBody } = await request.get('/posts/' + lastPostId)
            .set("Accept", "text/plain")
            .expect('Content-type', /json/)
            .expect(200)

        expect(getBody.author).toEqual('Pepa Flores');
        expect(getBody.nickname).toEqual('marisol');

        done();

    });

    test('when update posts then is effectively updated', async (done) => {
        const post = await request.get('/posts');
        const lastPostId = post.body[post.body.length - 1]._id;
        const updatedPost = { content: 'new content', title: 'new title', urlToImage: "www.nada.com" };

        await request.put(`/posts/${lastPostId}`)
            .send(updatedPost)
            .set('Authorization', 'bearer ' + token)
            .expect('Content-type', /json/)
            .expect(200)

        var { body } = await request.get(`/posts/${lastPostId}`)
            .expect('Content-type', /json/)
            .expect(200)

        expect(body.title).toEqual(updatedPost.title);
        expect(body.content).toEqual(updatedPost.content);
        done();

    });

    //POST-comment
    test('when create new comment then this comment can be obtained', async (done) => {
        const post = await request.get('/posts');
        const lastPostId = post.body[post.body.length - 1]._id;

        var newComment = {
            text: 'Learn About Something'
        };

        const { body } = await request.post('/posts/' + lastPostId + '/comments')
            .send(newComment)
            .set('Authorization', 'bearer ' + token)
            .expect('Content-type', /json/)
            .expect(200)

        expect(body._id).toBeTruthy();
        expect(body.nickname).toEqual('marisol');
        expect(body.text).toEqual(newComment.text);

        done();
    });
    // test('when modify comment then this comment is updated', async (done) => {
    //     const {body:getBody} = await request.get('/posts');
        
    //     const post = getBody[getBody.length - 1];
    //     const lastPostId = post._id;        
    //     const commentId = post.comments[post.comments.length-1].id;
    //     console.log(commentId)

    //     var updatedComment = {
    //         text: 'new text'
    //     };

    //     const { body } = await request.post('/posts/' + lastPostId + '/comments' + commentId)
    //         .send(updatedComment)
    //         .set('Authorization', 'bearer ' + token)
    //         .expect('Content-type', /json/)
    //         .expect(200)

    //     expect(body._id).toBeTruthy();
    //     expect(body.nickname).toEqual('marisol');
    //     expect(body.text).toEqual(updatedComment.test);

    //     done();
    // });
    //PUT-comment
    //DELETE-comment
    test('when delete post then is effectively deleted', async (done) => {
        const post = await request.get('/posts');
        const lastPostId = post.body[post.body.length - 1]._id;

        await request.delete(`/posts/${lastPostId}`)
            .set('Authorization', 'bearer ' + token)
            .expect('Content-type', /json/)
            .expect(200)

        await request.get(`/posts/${lastPostId}`)
            .expect(404)
        done();
    });

    // OFFENSIVE WORDS ENDPOINTS
    test('when get all OFFENSIVEWORDS then get OFFENSIVEWORDS list', async (done) => {

        const { body } = await request.get('/offensivewords')
            .set('Authorization', 'bearer ' + token)
            .expect('Content-type', /json/)
            .expect(200)

        expect(body[0].level).toBeTruthy();
        expect(body[0].word).toBeTruthy();
        expect(body[0]._id).toBeTruthy();
        done();
    });

    test('when create new OFFENSIVE WORD then this OFF. W. can be obtained', async (done) => {

        var newOffensiveWord = {
            word: 'testing',
            level: 2
        };

        const { body } = await request.post('/offensivewords')
            .send(newOffensiveWord)
            .set('Authorization', 'bearer ' + token)
            .expect('Content-type', /json/)
            .expect(200)

        const words = await request.get('/offensivewords')
            .set('Authorization', 'bearer ' + token);

        const lastWordId = words.body[words.body.length - 1];
        const id = lastWordId._id;

        const { body: getBody } = await request.get('/offensivewords/' + id)
            .set('Authorization', 'bearer ' + token)
            .expect('Content-type', /json/)
            .expect(200)

        expect(getBody.word).toEqual('testing');
        expect(getBody.level).toEqual(2);

        done();

    });

    test('when update OFF. WORD then is effectively updated', async (done) => {
        const word = await request.get('/offensivewords')
            .set('Authorization', 'bearer ' + token);
        const lastWordId = word.body[word.body.length - 1]._id
        const updatedWord = { word: 'new word', level: 3 };

        await request.put(`/offensivewords/${lastWordId}`)
            .send(updatedWord)
            .set('Authorization', 'bearer ' + token)
            .expect('Content-type', /json/)
            .expect(200)

        var { body } = await request.get(`/offensivewords/${lastWordId}`)
            .set('Authorization', 'bearer ' + token)
            .expect('Content-type', /json/)
            .expect(200)

        expect(body.word).toEqual(updatedWord.word);
        expect(body.level).toEqual(updatedWord.level);
        done();

    });

    test('when delete post then is effectively deleted', async (done) => {
        const words = await request.get('/offensivewords')
            .set('Authorization', 'bearer ' + token);
        const lastWordId = words.body[words.body.length - 1]._id;

        await request.delete(`/offensivewords/${lastWordId}`)
            .set('Authorization', 'bearer ' + token)
            .expect('Content-type', /json/)
            .expect(200)

        await request.get(`/offensivewords/${lastWordId}`)
            .set('Authorization', 'bearer ' + token)
            .expect(404)
        done();
    });

});