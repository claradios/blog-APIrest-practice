const initApp = require('../server');
const supertest = require('supertest');
var requestagent = require('superagent');
const bcrypt = require('bcryptjs');
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

// function createAuthenticatedRequest(loginDetails, done) {
//     var authenticatedRequest = requestagent.agent(initApp);
//     authenticatedRequest
//         .get('/login')
//         .send(loginDetails)
//         .end(function (error, response) {

//             if (error) {
//                 throw error;
//             } else {
//                 response.sendStatus(200);
//             }
//             const {body} = authenticatedRequest;
//             console.log(body);
//             done(authenticatedRequest)
//         });

// }

//createAuthenticatedRequest(userAuth);
describe('My API tests', function () {

    var token = null;

    beforeEach((done) => {       
        request
            .post('/login/')
            .auth('Pepa Flores', 'tombola3')
            .send({ username: "Pepa Flores", password: "tombola3" })            
            .end(function (err, res) {

                token = res.body.token; // Or something
                
                done();
            });
    });

    // routerLogin.post('/',
    // passport.authenticate('basic', { session: false }),
    // (req, res) => {

    //     const { username } = req.user;

    //     const opts = { expiresIn: 120 }; //token expires in 2min
    //     const token = jwt.sign({ username }, SECRET_KEY, opts);

    //     return res.status(200).json({ message: "Auth Passed", token });

    // });


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
        //  var auth = {};
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

        expect(body._id).toBeTruthy();

        const { body: getBody } = await request.get('/posts/' + body._id)
            .expect('Content-type', /json/)
            .expect(200)

        getBody.author = 'Pepa Flores';
        getBody.nickname = 'marisol';

        done();

    });

    // test('when update posts then is effectively updated', async (done) => {
    //     const updatedPost = { content: 'new content', title: 'new title' };

    //     await request.put(`/posts/${id}`)
    //         .send(updatedAd)
    //         .expect('Content-type', /json/)
    //         .expect(200)

    //     var { body } = await request.get(`/posts/${id}`)
    //         .expect('Content-type', /json/)
    //         .expect(200)

    //     expect(body).toEqual(updatedPost);
    //     done();

    // });

    // test('when delete post then is effectively deleted', async (done) => {

    //     await request.delete(`/posts/${id}`)
    //         .expect('Content-type', /json/)
    //         .expect(200)

    //     await request.get(`/ads/${id}`)
    //         .expect(404)
    //     done();
    // });

});