import { SignatureEnum } from './enums';
import { signHandler } from './helpers';

describe('Sign Message', () => {
  let payload;
  beforeEach(() => {
    cy.visit('/');
    cy.get('a[href="/sign-message"]').click();
  });
  it('should validate the signature', () => {
    signHandler();
    cy.getSelector('signaturePayload')
      .then((txt) => {
        payload = txt.text();
      })
      .then(() => {
        //Paste the signature payload and verify
        cy.get('textarea[name="signedMessage"]').type(payload);
        cy.contains('button', 'Verify').click();
        cy.contains('Valid');
      });
  });

  it('should return Invalid signature payload', () => {
    cy.get('textarea[name="signedMessage"]').type('Invalid#');
    cy.contains('button', 'Verify').click();
    cy.contains('Invalid signature payload');
  });

  it('should complete the fields below to verify the signature', () => {
    cy.get('input[name="address"]').type(SignatureEnum.address);
    cy.get('input[name="message"]').last().type(SignatureEnum.message);
    cy.get('input[name="signature"]').last().type(SignatureEnum.signature);
    cy.get('button[type="submit"]').last().click();
    cy.contains('Valid');
  });
});
