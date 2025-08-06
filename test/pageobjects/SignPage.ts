import Page from './Page';
import { GlobalDataEnum, RoutesEnum } from '../utils/globalDataEnum';
import { login } from '../utils/helpers';

class SignMessagePage extends Page {
  async typeSignedMessage(message: string) {
    const messageTextArea = await $('textarea[name="signedMessage"]');
    const verifyButton = await $('button*=Verify'); // Button containing the text "Verify"

    await messageTextArea.setValue(message);
    await verifyButton.click();
  }

  async checkMessageValidity(validity: string) {
    await expect($('body')).toHaveTextContaining(validity); // Adjust the selector as needed
  }

  async getSignaturePayload() {
    const signaturePayloadElement = await $('selector-for-signature-payload'); // Replace with actual selector

    return await signaturePayloadElement.getText();
  }

  async performSignOperation() {
    const signButton = await $('button*=Sign');
    const messageInput = await $('input[name="message"]');

    await messageInput.setValue(GlobalDataEnum.signature);
    await signButton.click();
    await login();
  }
  async completeFieldsAndVerifySignature(payload: {
    address: string;
    signatureTxt: string;
    signature: string;
  }) {
    const addressInput = await $('input[name="address"]');
    const signedMessage = await $(
      '[placeholder="Insert or paste the message that was signed."]'
    );
    const signatureInput = await $(
      // eslint-disable-next-line quotes
      `[placeholder="Insert or paste the signature. You don't have to add '0x' prefix."]`
    );
    const lastSubmitButton = await $(
      '//*[@id="root"]/div/div/div[2]/div/div/div[3]/form/div[4]/button'
    );

    await addressInput.setValue(payload.address);
    await signedMessage.setValue(payload.signatureTxt);
    await signatureInput.setValue(payload.signature);
    await lastSubmitButton.click();
  }

  public open() {
    return super.open(RoutesEnum.signMsg);
  }
}

export default new SignMessagePage();
