describe('Movie Details spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays the application and intercepts the API calls', () => {
    cy.intercept('GET', 'https://rancid-tomatillos-api.onrender.com/api/v1/movies', {
      statusCode: 200,
      fixture: 'movie_posters'
    })

    cy.intercept('GET', 'https://rancid-tomatillos-api.onrender.com/api/v1/movies/155', {
      statusCode: 200,
      fixture: 'movie_details'
    })

    cy.get('.MoviePoster').should('have.length', 4)
    cy.get('.MoviePoster').first().click()
    cy.visit('http://localhost:3000/movies/155')
    cy.get('h1').should('contain', 'rancid tomatillos')
    cy.get('.home-button').should('exist').within(() => {
      cy.get('img').should('exist')
    })

    cy.get('img').should('exist')
    cy.get('.MovieDetails').should('exist').within(() => {
      cy.get('h2').should('contain', 'The Dark Knight')
      cy.get('ul').should('exist').within(() => {
        cy.get('li').first().should('contain', 'Drama')
        cy.get('li').last().should('contain', 'Thriller')
      })
      cy.get('p').should('exist')
    })

    cy.get('.home-button').click()
    cy.url().should('include', '/')
  })

  it('displays an error if no movie found or bad URL', () => {
    cy.intercept('GET', 'https://rancid-tomatillos-api.onrender.com/api/v1/movies', {
      statusCode: 200,
      fixture: 'movie_posters'
    })

    cy.visit('http://localhost:3000/;lkjghjhg')

    cy.get('h1').should('contain', 'rancid tomatillos')
    cy.get('h2').should('contain', '404 - Page Not Found')
    cy.get('p').should('contain', 'Sorry, the page')
    cy.get('.home-link').should('contain', 'Go back to the homepage')
    cy.get('.home-link').click()
    cy.url().should('include', '/')
  })
})