import { AssertionEnum } from '../../constants/enums';

describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.apiIntercept('GET', 'network/config');
  });
  it('should properly display the titles', () => {
    cy.getSelector('home-title').should(
      AssertionEnum.contain,
      'Utilities for the MultiversX Blockchain'
    );
    cy.getSelector('home-description').should(
      AssertionEnum.contain,
      'This page offers an easy to use pack of utilities necessary for interacting with the MultiversX Blockchain.'
    );
    cy.getSelector('home-description').should(
      AssertionEnum.contain,
      'Browse the menu on the left for MultiversX utilities.'
    );
    cy.wait('@network/config').then((xhr) => {
      expect(xhr.response?.body.code).to.eq('successful');
      expect(xhr.response?.statusCode).to.eq(200);
      expect(xhr.response?.statusMessage).to.eq('OK');
    });
  });
});
