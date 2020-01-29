describe('Log in and add comments', () => {
  before(() => {
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
  })

  it('goes to first post and add a comment WITHOUT OFFENSIVE WORDS', () => {
    cy.get('h2 a').first().click({ force: true })
    cy.contains('add comment').click({ force: true })
    cy.get('.comment-area').type('Esto es un comentario sin palabras ofensivas', { force: true })
    cy.contains('Publish').click({ force: true })
    cy.contains('p', 'Tu comentario ha sido añadido!')
  })

  it('goes to first post and add a comment WITH OFFENSIVE WORDS', () => {
    cy.contains('Home').click()
    cy.get('h2 a').first().click({ force: true })
    cy.contains('add comment').click({ force: true })
    cy.get('.comment-area').type('Eres un cerdo', { force: true })
    cy.contains('Publish').click({ force: true })
    cy.contains('p', 'Tu comentario es ofensivo, revisa estas palabras:')
  })

  it('adds a NEW POST', () => {
    cy.contains('New Post').click({ force: true })
    cy.get('input[name="input-title"]').type('Write Your Test With Cypress')
    cy.get('textarea')
      .type(
        `This is a relatively straightforward test, but consider how much code has been covered by it, both on the client and the server!

        For the remainder of this guide, we’ll explore the basics of Cypress that make this example work. We’ll demystify the rules Cypress follows so you can productively test your application to act as much like a user as possible, as well as discuss how to take shortcuts when it’s useful.`
      )
    // cy.get('input[name="file"]')
    cy.get('.post-btn').click()
    // cy.url().should('contains', '/#/')
    // cy.contains('Write Your Test With Cypress')
  })
})
