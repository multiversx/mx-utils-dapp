import Page from "./Page";
import { RoutesEnum } from "../utils/globalDataEnum";
import { dataConverters } from "../utils/testData";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ConvertersPage extends Page {
  public get inputFields() {
    return $$('[data-cy="input-converter"]'); // Return all input fields
  }

  public get submitButtons() {
    return $$('button[type="submit"]'); // Return all submit buttons
  }

  public get converterResults() {
    return $$('[data-cy="converter-result"]'); // Return all converter results
  }

  public get errorMessages() {
    return $$('[data-cy="error"]'); // Return all error messages
  }

  public async typeInField(index: number, value: string) {
    await this.inputFields[index].setValue(value);
  }

  public async clickSubmitButton(index: number) {
    await this.submitButtons[index].click();
  }

  public async checkResult(index: number, expectedValue: string) {
    await expect(this.converterResults[index]).toHaveTextContaining(
      expectedValue
    );
  }

  public async checkErrorMessage(index: number, expectedMessage: string) {
    await expect(this.errorMessages[index]).toHaveTextContaining(
      expectedMessage
    );
  }
  public async completeTheInputs() {
    for (let index = 0; index < (await this.inputFields.length); index++) {
      await this.typeInField(index, dataConverters[index]);
      await this.clickSubmitButton(index);

      if (index % 2 === 0) {
        await this.checkResult(index, dataConverters[index + 1]);
      } else {
        await this.checkResult(index, dataConverters[index - 1]);
      }
    }
  }

  public async checkRequiredFields() {
    for (let index = 0; index < (await this.inputFields.length); index++) {
      await this.clickSubmitButton(index);
      await this.checkErrorMessage(index, "required");
    }
  }

  public open() {
    return super.open(RoutesEnum.converters);
  }
}

export default new ConvertersPage();
