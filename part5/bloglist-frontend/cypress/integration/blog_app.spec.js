describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 

    const user2= {
      name: 'Obi Jude',
      username: 'obij',
      password: 'amazing'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user2)

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

    it('A blog can be created', function() {
      // ...
      cy.get('#hide-button').click()

      cy.get('#title').type('Martial arts blog')
      cy.get('#author').type('Bruce Lee')
      cy.get('#url').type('https://martialartsblog.com')
      cy.contains('create').click()

      cy.contains('Martial arts blog Bruce Lee')
    })
  })

  describe('When logged in 2', function() {
    beforeEach(function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('User can like a blog', function() {
      cy.get('#hide-button').click()

      cy.get('#title').type('Cypress blog')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://cypressblog.com')
      cy.contains('create').click()

      cy.contains('view').click()
      cy.contains('like').click()

      cy.contains(1)
    })
  })
  describe('Logged in first user creates a blog', function() {
    beforeEach(function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.get('#hide-button').click()

      cy.get('#title').type('Cypress blog')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://cypressblog.com')
      cy.contains('create').click()

      cy.contains('log Out').click()
    })

    it('other users cannot delete another user blog', function () {
      cy.get('#username').type('obij')
      cy.get('#password').type('amazing')
      cy.get('#login-button').click()

      cy.contains('view').click()
    
      
      cy.contains('remove').should('not.exist')
      cy.contains('Cypress blog Cypress')
    })

    it.only('User can delete his own blog', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('view').click()
      cy.contains('remove').click()

      cy.contains('Cypress blog Cypress').should('not.exist')
    })

  })

})

