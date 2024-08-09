// https://on.cypress.io/api
describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.findByPlaceholderText("Escribe tu titulo").type('Titulo')
    cy.findByPlaceholderText("En que estas pensando?").type('conteeenido')
    cy.get('button').click()
    cy.contains('Titulo')
    cy.contains('conteeenido')
  })
})
