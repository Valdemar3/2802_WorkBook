import { faker } from "@faker-js/faker"
import * as pet from "../fixtures/pet.json"
import * as pet2 from "../fixtures/pet2.json"
import * as pet3 from "../fixtures/pet3.json"

pet.id = faker.random.numeric(5)
//pet.id = parseInt(faker.random.numeric(5))
pet.name = faker.animal.crocodilia.name
pet.category.id = parseInt(faker.random.numeric(3))
pet.category.name = faker.animal.type()

let petId;

describe('Pet Suite', () => {
  it('Pet creation', () => {

    cy.log('**1 Create Pet**')
    cy.request('POST', '/pet', pet).then( response => {
      console.log(response) //showing infirmation in console
      
      // showing information in log in Cypress
      // cy.log(`Request Body: ${response.allRequestResponses[0]["Request Body"]}`)
      // cy.log(`Request Headers: ${JSON.stringify(response.allRequestResponses[0]["Request Headers"])}`)
      // cy.log(`Request URL: ${JSON.stringify(response.allRequestResponses[0]["Request URL"])}`)

      expect(response.status).to.be.equal(200)
      expect(response.statusText).to.be.equal('OK')
      expect(response.isOkStatusCode).to.be.true
      
      expect(response.body.id).to.be.equal(parseInt(pet.id))
      expect(response.body.name).to.be.equal(pet.name)
      expect(response.body.category.id).to.be.equal(pet.category.id)
      expect(response.body.category.name).to.be.equal(pet.category.name)
      petId = response.body.id
      console.log(petId)
    })

  })

  it('Get Info after creation', () => {

    cy.log('**2 Get info about Pet**')
    cy.request('GET', `/pet/${pet.id}`).then( response => {
      console.log(response) //showing infirmation in console
      
      // showing information in log in Cypress
      // cy.log(`Request Body: ${response.allRequestResponses[0]["Request Body"]}`)
      // cy.log(`Request Headers: ${JSON.stringify(response.allRequestResponses[0]["Request Headers"])}`)
      // cy.log(`Request URL: ${JSON.stringify(response.allRequestResponses[0]["Request URL"])}`)

      expect(response.status).to.be.equal(200)
      expect(response.statusText).to.be.equal('OK')
      expect(response.isOkStatusCode).to.be.true
      
      expect(response.body.id).to.be.equal(parseInt(pet.id))
      expect(response.body.name).to.be.equal(pet.name)
      expect(response.body.category.id).to.be.equal(pet.category.id)
      expect(response.body.category.name).to.be.equal(pet.category.name)
     
    })

  })

  it('Update Info after creation', () => {

    cy.log('**3 Update info about Pet**')
    cy.request('PUT', `/pet`, pet2).then( response => {
      console.log(response) //showing infirmation in console
      
      // showing information in log in Cypress
      cy.log(`Request Body: ${response.allRequestResponses[0]["Request Body"]}`)
      cy.log(`Request Headers: ${JSON.stringify(response.allRequestResponses[0]["Request Headers"])}`)
      cy.log(`Request URL: ${JSON.stringify(response.allRequestResponses[0]["Request URL"])}`)

      expect(response.status).to.be.equal(200)
      expect(response.statusText).to.be.equal('OK')
      expect(response.isOkStatusCode).to.be.true
      
      expect(response.body.id).to.be.equal(pet2.id)
      expect(response.body.name).to.be.equal(pet2.name)
      expect(response.body.category.id).to.be.equal(pet2.category.id)
      expect(response.body.category.name).to.be.equal(pet2.category.name)
     
    })

  })

  it('Update existing pet ID', () => {  

    cy.log('**4 Update existing pet ID**')
    cy.request({
      method: 'POST',
      url: `/pet/${pet2.id}`,
      pet3,
      form: true,

    }).then( response => {
      console.log(response) //showing infirmation in console
      
      // showing information in log in Cypress
      // cy.log(`Request Body: ${response.allRequestResponses[0]["Request Body"]}`)
      // cy.log(`Request Headers: ${JSON.stringify(response.allRequestResponses[0]["Request Headers"])}`)
      // cy.log(`Request URL: ${JSON.stringify(response.allRequestResponses[0]["Request URL"])}`)

      expect(response.status).to.be.equal(200)
      expect(response.statusText).to.be.equal('OK')
      expect(response.isOkStatusCode).to.be.true
      
      expect(parseInt(response.body.message)).to.be.equal(pet2.id)
     
    })

  })

  it('Delete existing pet ID', () => {  

    cy.log('**5 Delete existing pet ID**')
    cy.request({
      method: 'DELETE',
      url: `/pet/${pet2.id}`,

    }).then( response => {
      console.log(response) //showing infirmation in console
      
      // showing information in log in Cypress
      // cy.log(`Request Body: ${response.allRequestResponses[0]["Request Body"]}`)
      // cy.log(`Request Headers: ${JSON.stringify(response.allRequestResponses[0]["Request Headers"])}`)
      // cy.log(`Request URL: ${JSON.stringify(response.allRequestResponses[0]["Request URL"])}`)

      expect(response.status).to.be.equal(200)
      expect(response.statusText).to.be.equal('OK')
      expect(response.isOkStatusCode).to.be.true
      
      //expect(parseInt(response.body.message)).to.be.equal(pet3.id)
     
    })

  })

  it('6 Get Info after creation', () => {

    cy.log('**6 Get info about Pet**')
    cy.request({
      method: 'GET',
      url: `/pet/${pet2.id}`,
      failOnStatusCode: false
    }).then( response => {
      console.log(response) //showing infirmation in console
     
    })

  })

  it('7 Add img to pet obj', () => {

    cy.log('**Add image**')

    cy.fixture('petImg.png', 'binary').then ( fileContent => {
      const blob = Cypress.Blob.binaryStringToBlob(fileContent, 'image/png') // mine type
      let formData = new FormData;
      
      formData.append('additionalMetadata', 'qwwqqwwq')
      formData.append('file', blob, 'petImg.png') //blob -binary large object
      
      cy.request({
        method: 'POST',
        url: `/pet/${pet2.id}/uploadImage`,
        body: formData,
      }).then (resp => {
        expect(resp.isOkStatusCode).to.be.true
      })
    })

  })

})