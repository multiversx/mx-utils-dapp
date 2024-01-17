import SignPage from "../pageobjects/SignPage";
import { GlobalDataEnum } from "../utils/globalDataEnum";
describe("Sign Message", () => {
  beforeEach(async () => {
    await SignPage.open();
  });

  it("should properly sign message", async () => {
    await SignPage.performSignOperation();
  });

  it("should return error for invalid payload", async () => {
    await SignPage.typeSignedMessage(GlobalDataEnum.signatureTxt);
    await SignPage.checkMessageValidity(GlobalDataEnum.invalidPayloadErr);
  });
  it("should return signature valid message", async () => {
    const signatureData = {
      address: GlobalDataEnum.address,
      signatureTxt: GlobalDataEnum.signatureTxt,
      signature: GlobalDataEnum.signature,
    };
    await SignPage.completeFieldsAndVerifySignature(signatureData);
    await SignPage.checkMessageValidity(GlobalDataEnum.confirmationMsg);
  });

  it("should return error for invalid address", async () => {
    const signatureData = {
      address: GlobalDataEnum.address + 1,
      signatureTxt: GlobalDataEnum.signatureTxt,
      signature: GlobalDataEnum.signature,
    };
    await SignPage.completeFieldsAndVerifySignature(signatureData);
    await SignPage.checkMessageValidity(GlobalDataEnum.invalidMsg);
  });

  it("should return errorfor invalid signed message", async () => {
    const signatureData = {
      address: GlobalDataEnum.address,
      signatureTxt: GlobalDataEnum.signatureTxt + 1,
      signature: GlobalDataEnum.signature,
    };
    await SignPage.completeFieldsAndVerifySignature(signatureData);
    await SignPage.checkMessageValidity(GlobalDataEnum.invalidMsg);
  });

  it("should return errorfor invalid sigature", async () => {
    const signatureData = {
      address: GlobalDataEnum.address,
      signatureTxt: GlobalDataEnum.signatureTxt,
      signature: GlobalDataEnum.signature + 1,
    };
    await SignPage.completeFieldsAndVerifySignature(signatureData);
    await SignPage.checkMessageValidity(GlobalDataEnum.base64Err);
  });
});
