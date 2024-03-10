import {Homepage} from "../pages/homepage";
import {Login} from "../pages/loginpage";
const login = new Login();
const home = new Homepage();

describe('Automated Test for User Login Process:', () => {

  before(function () {
    cy.fixture('creds').then(function (data) {
      this.data = data;
    })
  })

  it('To verify that it should show the landing page', () => {
    home.navigate();
    expect(cy.contains('Hello, sign in'))
  })

  it('To verify that it should navigate to the login Page', () => {
    login.navigateToLoginPage();
    expect(cy.contains('Email or mobile phone number'))
  })

  it('To verify that it should not login the user without the email', () => {
    login.shouldNotLogin_withoutEmail()
    expect(cy.contains('Enter your email or mobile phone number'))
  })

  it('To verify that it should not login the user without password', () => {
    login.shouldNotLogin_withoutPassword();
    expect(cy.contains('Enter your password'))
  })

   it('To verify that it should not login user with the invalid email', () => {
    home.navigate();
    login.navigateToLoginPage();
    login.LoginwithInvalidemail();
    expect(cy.contains('We cannot find an account with that email address'))

   })
   it('To verify that it should not login the user with the invalid password', ()=>{
    home.navigate();
    expect(cy.contains('Hello, sign in'))
    login.navigateToLoginPage();
    login.LoginwithInvalidpassword();
    expect(cy.contains('Your password is incorrect'))
   })


  it('To verify that it should let user login once valid email and password is provided', ()=>{
    home.navigate();
    expect(cy.contains('Hello, Faysal'))
    login.navigateToLoginPage();

    login.mustLogin_withValidCreds();
    expect(cy.contains('Hello, Faysal'))
  })

  it('To verify that it should handle special characters in email', () => {
   home.navigate();
   expect(cy.contains('Hello, sign in'))
   login.navigateToLoginPage();
   login.gowithspecialchar();
   expect(cy.contains('We cannot find an account with that email address'))
  });
  
})

describe('Automated Search Functionality Test:', () => {

  it('should display search results for valid search query', () => {
    home.navigate();
    expect(cy.contains('Hello, Faysal'))
    home.shouldclickOn_search_andSearch();
    expect(cy.contains('results for "pen"'))
  });

  it('should calculate the response time for search', () => {

    let start = 0
    let responseTime = null;

    home.navigate();
    expect(cy.contains('Hello, Faysal'))
    home.shouldclickOn_search_andSearch();

    cy.then(() => {
      start = performance.now();
    })
    cy.get('#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.s-wide-grid-style.sg-row > div.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > div.a-section.a-spacing-none.s-result-item.s-flex-full-width.s-border-bottom-none.s-widget.s-widget-spacing-large > div > span > div > div > span')
      .then(() => {
        cy.log(`new value of start is ${start}`)
        cy.log(`Page load took ${performance.now() - start} milliseconds.`);
        responseTime = performance.now() - start;
        cy.log(`response time for search is ${responseTime}`)
        expect(cy.contains('results for "pen"'))
        expect(responseTime).to.be.at.least(0.1)
      });
  });


  it('should display appropriate message for no search results', () => {
    
    home.navigate();
    expect(cy.contains('Hello, Faysal'))
    home.searchfornoresult();
    expect(cy.contains('No results for'))
  
  });  
   
});

//Automated test for adding products to the shopping cart

describe('Automated test for adding products to the shopping cart :', () => {

  it('should add items to the shopping cart', () => {
    home.navigate();
    expect(cy.contains('Hello, Faysal'))
    login.navigateToLoginPage();

    login.mustLogin_withValidCreds();
    expect(cy.contains('Hello, Faysal'))

    home.shouldclickOn_search_andSearch();
    expect(cy.contains('results for "pen"'))

    home.addtocart_andVerify();
    expect(cy.contains(`Subtotal`))
  });
  
});

describe('Automated test for testing the checkout process :', () => {

  it('should display search results for valid search query', () => {
    home.navigate();
    login.navigateToLoginPage();
    login.mustLogin_withValidCreds();
    home.shouldclickOn_search_andSearch();
    home.proceedtocheckout();
    home.proceedtocheckout();
    expect(cy.contains(`Subtotal`))
    expect(cy.contains('Order total:'))


  });

});
