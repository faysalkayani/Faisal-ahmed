export class Homepage {
    navigate(){
        cy.wait(500)
        cy.visit('https://www.amazon.com/')
        cy.wait(1000)
    }
    shouldclickOn_search_andSearch(){
        cy.get('#twotabsearchtextbox').type("pen");
        cy.get('#nav-search-submit-button').click();

    }
    searchfornoresult(){
        cy.get('#twotabsearchtextbox').type("sjdjdsnjkjljkhfjkd jkndjklsdjklsdklsd");
        cy.get('#nav-search-submit-button').click();

    }

    addtocart_andVerify(){
       
        for (let i =0; i<3; i++){
            cy.contains('Add to cart').scrollIntoView().click();
        }
        cy.get('#nav-cart-count-container')
            .scrollIntoView()
            .click();
    }
    proceedtocheckout(){
        cy.contains('Add to cart').scrollIntoView().click();
        cy.get('#nav-cart-count-container') .scrollIntoView().click();
        cy.wait(1000);
        cy.contains('Proceed to checkout').click();



    }
}