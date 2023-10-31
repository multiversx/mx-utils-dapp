import { userData } from '../../assets/globalData';
import { walletIDEnum } from '../../constants/enums';

export const signHandler = () => {
  cy.get('input[name="message"]').first().type('MVX Signature');
  cy.get('button[type="submit"]').eq(0).click();
  cy.contains('MultiversX Web Wallet').click();
  cy.login(walletIDEnum.unguardedWallet1);
  cy.get('button[type="submit"]').eq(0).click();
  cy.get('button[type="submit"]').eq(0).click();
  cy.getSelector('keystoreBtn').click();
  cy.get('input[type=file]').selectFile('./cypress/assets/testKeystore.json', {
    force: true
  });
  cy.getSelector('accessPass').type(userData.passsword);
  cy.getSelector('submitButton').click();
  cy.getSelector('signButton').click();
};
