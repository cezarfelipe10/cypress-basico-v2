/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
   beforeEach(function() {
        cy.visit('./src/index.html')
   })
   
   Cypress._.times(3, ()=>{
   it('verifica o título da aplicação', function() {      
        cy.title().should('be.equal' , 'Central de Atendimento ao Cliente TAT')
    })
  })


    it('preenche os campos obrigatórios e envia o formulário', function() {
        Cypress._.times(5, ()=>{

        cy.clock()
        const longText = 'TEste Cezar Felipe cypress teste teste teste TEste Cezar Felipe cypress teste'+
                         'Cezar Felipe cypress teste testeteste TEste Cezar Felipe cypress teste teste'+
                         'testeteste teste TEste '
        cy.get('#firstName').type('Cezar teste')
        cy.get('#lastName').type('Reis de Paula')
        cy.get('#email').type('cezarfeliperp@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0 })
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        })
    })   


    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

        cy.get('#firstName').type('Cezar Felipe')
        cy.get('#lastName').type('Reis de Paula')
        cy.get('#email').type('cezarfeliperp-gmail.com')
        cy.get('#open-text-area').type("Teste erro")
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })

    it('Valida campo telefone', function(){
        cy.get('#phone')
            .type('aaaaa')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone' +
    ' se torna obrigatório mas não é preenchido antes do envio do formulário', function(){

        cy.get('#firstName').type('Cezar Felipe'),
        cy.get('#lastName').type('Reis de Paula')
        cy.get('#email').type('cezarfeliperp@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type("Teste telefone obrigatorio")
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
        
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){

        cy.get('#firstName')
          .type('Cezar Felipe')
          .should('have.value', 'Cezar Felipe')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Reis de Paula')
          .should('have.value', 'Reis de Paula')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('cezarfeliperp@gmail.com')
          .should('have.value', 'cezarfeliperp@gmail.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('43996128207')
          .should('have.value', '43996128207')
          .clear()
          .should('have.value', '' )

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){

        cy.clock()
        cy.get('button[type="submit"]').click() 
        cy.get('.error').should('be.visible') 
        cy.tick(3000)
        cy.get('.error').should('not.be.visible') 

    })

    it('envia o formuário com sucesso usando um comando customizado', function(){

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){

      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })
   
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){

      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })


    it('seleciona um produto (Blog) por seu índice', function(){

      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })


    it('marca o tipo de atendimento "Feedback"', function(){

      cy.get('input[value=feedback]').check()

    })


    it('marca cada tipo de antedimento', function(){
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){

      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')

    })
    it('seleciona um arquivo da pasta fixtures', function(){

      cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })

    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){

      cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json',{ action: 'drag-drop'} )
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })

    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){

      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
       })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){

      cy.get('a[href= "privacy.html"]')
        .should('have.attr', 'target', '_blank')

    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){

      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

      cy.contains('Talking').should('be.visible')

    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', () => {

      cy.get('#firstName')
        .invoke('val', 'Cezar')
        .should('have.value', 'Cezar')

    })

    it('Ache o gato', ()=>{

      cy.get('#cat')
        .invoke('show')
        .should('be.visible')

    })

    it('faz uma requisição HTTP', function(){

      cy.request({
        //method: 'GET',
        url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
      }).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.statusText).to.equal("OK")
        expect(response.body).to.include("CAC TAT")
      })

    })

  })
