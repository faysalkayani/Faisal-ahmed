export class Login {
    navigateToLoginPage(){
        cy.wait(500)
        cy.contains('Hello, sign in').click();
        cy.wait(1000)
    }
    shouldNotLogin_withoutPassword(){
        cy.get('#ap_email').type('faysal.kayani@hotmail.com');
        cy.get('#continue').click();
        cy.get('#signInSubmit').click();
    }
    shouldNotLogin_withoutEmail(){
        cy.get('#continue').click();
    }
    LoginwithInvalidemail(){
        cy.get('#ap_email').type('faysalaaaa.kayani@hotmail.com');
        cy.get('#continue').click();
    }

    LoginwithInvalidpassword(){
        cy.get('#ap_email').type('faysal.kayani@hotmail.com');
        cy.get('#continue').click();
        cy.get('#ap_password').type('Password@1254');
        cy.get('#signInSubmit').click();

        //const solve_this_image

    }
    
    
    mustLogin_withValidCreds(){
        cy.get('#ap_email').type('faysal.kayani@hotmail.com');
        cy.get('#continue').click();
        cy.get('#ap_password').type('Password@123');
        cy.get('#signInSubmit').click();
        
        const two_fa_flag = null;
        cy.get("body").then($body => {
            if ($body.find("Not now").length > 0) {   
                //evaluates as true
                two_fa_flag == true
                console.log("debug log: prep to avoid 2fa, set flag")
            }else{
                two_fa_flag == false
                console.log("debug log: prep to forget 2fa, set flag")

            }
        });

        if (two_fa_flag){
            console.log('inside two_fa_flag, we gonna click not-now')
            cy.contains('Not now').click();
        }else{
            console.log("proceeded to the login already!!")
        }
    
        

    }
    gowithspecialchar(){
        cy.get('#ap_email').type('@@@@!!!%^&&*#');
        cy.get('#continue').click();

    }

}