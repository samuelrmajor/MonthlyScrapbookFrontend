describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'sam',
      username: 'testsam',
      password: 'testsam'
    }

    const user2 = {
      name: 'sam2',
      username: 'testsam2',
      password: 'testsam2'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened w/ the login form open', function() {
    cy.contains('LOGIN:')
  })

  describe('when logged in', function() {

    it('invalid user cannot log in', function() {
        cy.get('#username-input').type('testsam')
        cy.get('#password-input').type('testsam2')
        cy.get('#login-button').click()

        cy.contains('Wrong Credentials')
    })

    it('valid user can log in', function() {
        cy.get('#username-input').type('testsam')
        cy.get('#password-input').type('testsam')
        cy.get('#login-button').click()

        cy.contains('logged in as: sam')
    })

  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testsam', password: 'testsam' })
    })

    it('a new blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#new-blog-title-input').type('title:Created by cypress')
      cy.get('#new-blog-author-input').type('author:Created by cypress')
      cy.get('#new-blog-url-input').type('url:Created by cypress')
      cy.contains('Create').click()
      cy.contains('title:Created by cypress')
    })


    describe('and several blogs exists', function() {
      beforeEach(function() {
        cy.createBlog({ author: 'cypressAuthor1', title: 'cypressTitle1', url:'cypressURL1', likes: 52 })
        cy.createBlog({ author: 'cypressAuthor2', title: 'cypressTitle2', url:'cypressURL2',likes: 51 })
        cy.createBlog({ author: 'cypressAuthor3', title: 'cypressTitle3', url:'cypressURL3',likes: 5 })
      })

      it('it can be liked', function() {
        cy.contains("Author1")
        .contains('Show Details')
        .click()
        cy.contains('Title1').get("#like-button").click()
        cy.contains("53")
        // cy.contains('Title1')
        // .contains('53')
      })

      it('A blog can be removed by the author', function() {
        cy.contains("Author1")
        .contains('Show Details')
        .click()
        cy.contains('Title1').get("#remove-blog").click()
        cy.contains("Blog Deletion Succeeded")
      })

      it('a user cannot delete a blog it did not create', function() {
        //logs into a new account
        cy.contains("Log Out").click()
        cy.get('#username-input').type('testsam2')
        cy.get('#password-input').type('testsam2')
        cy.get('#login-button').click()
        cy.wait(5500)
        cy.contains("Author1")
        .contains('Show Details')
        .click()
        cy.get('#remove-blog').should('have.css', "display", "none")

      })

      it('blogs are ordered from most likes to least likes', function() {
        //logs into a new account
        cy.get(".showDetails").each((btn,index) => {
            cy.wrap(btn).click()
        })
        let myLikes = 9999999999999999999
        let correct = 1
        cy.get(".blogLikes").each((like,index) => {
            if (parseInt(like[0].innerText.split(" ")[1]) <= myLikes) {
                myLikes = parseInt(like[0].innerText.split(" ")[1])
            }
            else {
                correct = 0
            }
        }).then(response => {expect(correct).to.eql(1)})
        
        let myLikes2 = 9999999999999999999
        cy.contains("Title2").find("#like-button").click()
        cy.wait(1250)
        cy.contains("Title2").find("#like-button").click()
        cy.wait(1250)
        cy.get(".blogLikes").each((like,index) => {
            console.log(like[0].innerText.split(" ")[1])
            if (parseInt(like[0].innerText.split(" ")[1]) <= myLikes2) {
                myLikes2 = parseInt(like[0].innerText.split(" ")[1])
                console.log(myLikes2)
            }
            else {
                correct = 0
            }
        }).then(response => {expect(correct).to.eql(1)})
        
      })



    })



  })


})


