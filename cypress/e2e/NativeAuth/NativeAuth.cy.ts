import { walletIDEnum } from '../../constants/enums';

describe('Native Auth', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Native Auth').click();
    cy.checkUrl('/auth');
  });
  it('should display token valid message', () => {
    cy.contains('Generate').click();
    cy.contains('MultiversX Web Wallet').click();
    cy.login(walletIDEnum.unguardedWallet1);
    cy.contains('Token Valid');
  });
  afterEach(()=>{
    cy.getSelector('navigation-page-unlock').click();
    cy.contains('Login')
  })
});
