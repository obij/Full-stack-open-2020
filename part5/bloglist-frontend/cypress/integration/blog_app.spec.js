describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() { 
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      
    cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it.only('A blog can be created', function() {
      // ...
      cy.get('#hide-button').click()

      cy.get('#title').type('Martial arts blog')
      cy.get('#author').type('Bruce Lee')
      cy.get('#url').type('https://martialartsblog.com')
      cy.contains('create').click()

      cy.contains('Martial arts blog Bruce Lee')
    })
  })

})

