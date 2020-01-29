
describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('http://localhost:8080/')
  })
  it('Visits the app root url and checks title', () => {
    cy.visit('http://localhost:8080/')
    cy.contains('h1', 'my blog')
  })
  it('login, read first post and add a comment WITHOUT OFFENSIVE WORDS', () => {
    cy.visit('http://localhost:8080/')
    cy.contains('Log in').click()
    cy.url().should('include', '/login')

    cy.get('.username')
      .type('Pepa Flores')
      .should('have.value', 'Pepa Flores')

    cy.get('.password')
      .type('tombola3')
      .should('have.value', 'tombola3')

    cy.contains('Login').click() 
    cy.get('h2 a').first().click({ force: true })
    cy.contains('add comment').click({ force: true })
    cy.get('.comment-area').type('Esto es un comentario sin palabras ofensivas', { force: true })
    cy.contains('Publish').click({ force: true })
    cy.contains('p', 'Tu comentario ha sido añadido!')
  })
  it('login, read first post and add a comment WITH OFFENSIVE WORDS', () => {
    cy.visit('http://localhost:8080/')
    cy.contains('Log in').click()
    cy.url().should('include', '/login')

    cy.get('.username')
      .type('Pepa Flores')
      .should('have.value', 'Pepa Flores')

    cy.get('.password')
      .type('tombola3')
      .should('have.value', 'tombola3')

    cy.contains('Login').click()
    cy.get('h2 a').first().click({ force: true })
    cy.contains('add comment').click({ force: true })
    cy.get('.comment-area').type('Eres un cerdo', { force: true })
    cy.contains('Publish').click({ force: true })
    cy.contains('p', 'Tu comentario es ofensivo, revisa estas palabras:')
  })
})
