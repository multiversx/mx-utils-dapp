import { walletIDEnum } from '../../../constants/enums';
describe('Native Auth', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Native Auth').click();
    cy.checkUrl('/auth');
  });
  it('Should generetate the Native Auth', () => {
    cy.contains('Generate').click();
    cy.contains('MultiversX Web Wallet').click();
    cy.login(walletIDEnum.unguardedWallet1);
    cy.checkUrl('?network=');
  });
});
