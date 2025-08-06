import { RoutesEnum } from '../utils/globalDataEnum';
import Page from './Page';

class AuthPage extends Page {
  async generateToken() {
    const generateButton = await $('button*=Generate'); // Replace with actual selector if needed
    await generateButton.click();
  }

  async selectWallet() {
    const walletLink = await $('=MultiversX Web Wallet'); // Replace with actual selector if needed
    await walletLink.click();
  }

  async checkTokenValidity() {
    await expect($('body')).toHaveTextContaining('Token Valid'); // Adjust the selector as needed
  }

  public open() {
    return super.open(RoutesEnum.auth);
  }
}

export default new AuthPage();
