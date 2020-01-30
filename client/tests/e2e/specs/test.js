describe('Log in and add comments', () => {
  before(() => {
    cy.visit('http://localhost:8080/')
    cy.get('.nav').click()
    cy.contains('Log in').click()
    cy.url().should('include', '/login')

    cy.get('.username')
      .type('Pepa Flores')
      // .should('have.value', 'Pepa Flores')

    cy.get('.password')
      .type('tombola3')
      // .should('have.value', 'tombola3')

    cy.contains('LOG IN').click({ force: true })
    cy.wait(2000)
  })

  it('goes to first post and add a comment WITHOUT OFFENSIVE WORDS', () => {
    cy.get('.nav').click()
    cy.contains('Home').click()
    cy.get('h2 a').first().click({ force: true })
    cy.contains('add comment').click({ force: true })
    cy.get('.comment-area').type('Esto es un comentario sin palabras ofensivas', { force: true })
    cy.contains('Publish').click({ force: true })
    cy.contains('p', 'Tu comentario ha sido añadido!')
  })

  it('goes to first post and add a comment WITH OFFENSIVE WORDS', () => {
    cy.get('.nav').click()
    cy.contains('Home').click()
    cy.get('h2 a').first().click({ force: true })
    cy.contains('add comment').click({ force: true })
    cy.get('.comment-area').type('Eres un cerdo', { force: true })
    cy.contains('Publish').click({ force: true })
    cy.contains('p', 'Tu comentario es ofensivo, revisa estas palabras:')
  })

  it('adds a NEW POST', () => {
    cy.contains('New Post').click()
    cy.get('input[name="input-title"]').type('Write Your Test With Cypress')
    cy.get('textarea')
      .type(
        `This is a relatively straightforward test, but consider how much code has been covered by it, both on the client and the server!`
      )
    cy.contains('POST!').click()
  })
  it('goes to SETTING and add Offensive Word', () => {
    cy.get('.nav').click()
    cy.contains('settings').click()
    cy.get('input[name="new-word"]').type('aweonao')
    cy.get('input[name="new-level"]').type('2')
    cy.contains('add +').click()
    cy.get('.fa-trash').last().click()
  })
})
