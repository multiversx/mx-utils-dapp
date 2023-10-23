import { walletIDEnum } from '../../constants/enums';

describe('Login with keystore', () => {
  it('should login', () => {
    cy.session(
      'Login',
      () => {
        cy.visit('/');
        cy.contains('a', 'Login').click();
        cy.contains('MultiversX Web Wallet').click();
        cy.login(walletIDEnum.unguardedWallet1);
        cy.url().should('contain', Cypress.config().baseUrl);
        cy.contains('Logout');
      },
      {
        cacheAcrossSpecs: true
      }
    );
    cy.visit('/');
  });
});
