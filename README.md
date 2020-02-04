# BLOG PRACTICE

This is an exercise as part of the Generación-K learning process.
It consist in a fullstack app. The API REST has been build with node / mongoDB / express and the client with Vue and Vuetify.

It has been tested with *Jest* and *SUPERTEST* (unitary) and *CYPRESS* (e2e)
- use `npm run test` (back) 
- use Cypress `npx cypress open`(client)

## Project setup

- You need to `npm install` in both *backend* and *client* folders.

 ## Main structure (simplified)
 
 ```js
Blog-APIrest-practice 
│
├── backend
│     └── src                            
│          ├── controller
│          │        ├── comments
│          │        ├── login
│          │        ├── offensivewords
│          │        ├── posts
│          │        ├── users
│          │        └── index.js
│          │
│          ├── repository 
│          ├── test
│          ├── utils 
│          ├── validator
│          ├── app.js
│          └── server.js
├── client
│       ├── public 
│       ├── src  
│       │ ├── assets 
│       │ ├── components 
│       │ │       ├── CardComment.vue
│       │ │       ├── CardFilter.vue
│       │ │       ├── CardOffensiveWords.vue
│       │ │       ├── CardPost.vue
│       │ │       ├── MountEdit.vue
│       │ │       ├── MountHome.vue
│       │ │       ├── MountNewPost.vue
│       │ │       ├── MountOffensiveWords.vue
│       │ │       ├── MountRead.vue
│       │ │       ├── TheContainerCreate.vue
│       │ │       ├── TheFooter.vue
│       │ │       ├── TheHeader.vue
│       │ │       ├── TheMainAdminPanel.vue
│       │ │       ├── TheMainFeed.vue
│       │ │       ├── TheMainLogin.vue
│       │ │       ├── TheMainRead.vue
│       │ │       └── TheMainSignup.vue
│       │ ├── data
│       │ ├── plugins
│       │ ├── router
│       │ ├── service
│       │ └── app.js
│       │
│       └── test
│
└── README.md
```

# BACKEND

- To launch server go to `backend/src` and type `node app.js`

- Find this file: `backend/ REST API Blog collection postman.json` and load it into your POSTMAN'S. It can be very helpful to play with the app and the different endpoints REST.

## endpoints REST

- *Posts and comments*

    - GET all the posts (without comments)
    *'/post'*

    - POST a new post (without comments)
    *'/post/'* 

    - PUT to modify an existent post (except from its comments)
    *'/post/:id/'*

    - GET one post (with comments)
    *'/post/:id'*

    - DELETE an existing post (with all its comments)
    *'/post/:id/*'

    - POST a new comment to a post
    *'/post/:id/comments/'*

    - PUT to modify an existent comment
    *'/post/:id/comments/:id'*

    - DELETE an existent comment from a specific post
    *'/post/:id/comments/:id'*

- *Offensive Words*
    /offensivewords    
    - POST ,*/offensivewords*
    - GET all,*/offensivewords*
    - GET one, */offensivewords/:id*
    - DELETE ONE , */offensivewords/:id*
    - PUT, */offensivewords/:id*

## Comment validator

  There is an array of Offensive Words that only can be access by *admin users* . If a new comment contains any of this words, the app will throw an error specifying which words must be ommited to have a succesful comment.

## Users and authentication

 There are two types of authenticated users: "admin" and "publisher". Authentication has been implemented with *BASIC AUTH + JWT token*
 - *Admin* has permission to add edit and delete whatever she/he wants
 - *Publisher* only can add comments and posts and edit or delete the items who's author is herself/himself.
 - These two types and everyone else can read all the information but cannot add delete or modify info.
 - Anyone can Sign Up. Publisher rol will be assigned to this person.
 - When the app launch if there are no users, some default users will be upload.
 

## main Backend structure
La aplicación está en, al menos, 4 módulos Node: 
- *app.js*: Tendrá el servidor Express. 
- *controller.js*: Tendrá definidos los métodos de la API REST. Se usará un router que será configurado en Express.
- *repository.js*: Módulo que contendrá el código de acceso a la base de datos.
- *validator.js*: Validador que verifica que el comentario no contiene ninguna palabra ofensiva.


# CLIENT
This is a Vue + vuetify project. 
The image filters and upload image function has been based on the Vue Vixens practice that you can find in this repo: 
https://github.com/VueVixensESP/vuevixens-instagram

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### To start Cypress:
`npx cypress open`
