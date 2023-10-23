describe('Sign Message', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should return the signature', () => {
    cy.get('input[name="message"]').type('MVX Signature');
    cy.get('button[type="submit"]').eq(0).click();
    cy.contains('msg');
  });

  it('should verify the signature', () => {
    cy.get('textarea[name="signedMessage"]').type('?');
    cy.get('button[type="submit"]').eq(1).click();
    cy.contains('msg');
  });

  it('should complete the fields below to verify the signature', () => {
    cy.get('input[name="address"]').type('MVX Signature');
    cy.get('input[name="message"]').type('MVX Signature');
    cy.get('input[name="address"]').type('MVX Signature');
    cy.get('button[type="submit"]').eq(1).click();
  });

  it('should return error message for invalid scenario', () => {
    cy.get('textarea[name="signedMessage"]').type('Invalid err');
    cy.get('button[type="submit"]').eq(1).click();
    cy.contains('error');
  });
});
