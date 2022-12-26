
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Cezar Felipe')
    cy.get('#lastName').type('Reis de Paula')
    cy.get('#email').type('cezarfeliperp@gmail.com')
    cy.get('#open-text-area').type("Teste erro")
    cy.get('button[type="submit"]').click()
    
})