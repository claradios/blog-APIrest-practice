const app = require('../server')
const supertest = require('supertest')

const request = supertest(app)

test('when get all posts then get test posts', async (done) => {

    const { body } = await request.get('/posts')
        .expect('Content-type', /json/)
        .expect(200)

    expect(body[0].message).toBeTruthy();
    expect(body[0].author).toBeTruthy();
    expect(body[0].id).toBeTruthy();
    done();
})

test('when create new post then this post can be obtained', async (done) => {

    var newPost = {
        author: 'Jane Doe',
        nickname: 'jenny',
        title: 'Learn About Something',
        content: 'Lets learn guys. Im going to explain you how.',
        urlToImage: 'www.kittens.org'
    };

    const { body } = await request.post('/posts')
        .send(newPost)
        .expect('Content-type', /json/)
        .expect(200)

    expect(body.id).toBeTruthy();

    const { body: getBody } = await request.get('/posts/' + body.id)
        .expect('Content-type', /json/)
        .expect(200)

    getBody.author = newPost.author;
    getBody.nickname = newPost.nickname;

    done();

})

// test('when delete post then is effectively deleted', async (done) => {
//     await request.delete('/ads/1')
//         .expect('Content-type', /json/)
//         .expect(200)

//     await request.get('/ads/1')
//         .expect(404)
//     done();
// })

// test('when update ad then is effectively updated', async (done) => {
//     const updatedAd = { id: '2', message: 'new message', author: 'new author' };

//     await request.put('/ads/2')
//         .send(updatedAd)
//         .expect('Content-type', /json/)
//         .expect(200)

//     var { body } = await request.get('/ads/2')
//         .expect('Content-type', /json/)
//         .expect(200)

//     expect(body).toEqual(updatedAd);
//     done();

// })