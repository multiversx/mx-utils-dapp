import { AssertionEnum } from '../../constants/enums';
import { dataConverters } from './helpers';
describe('Converters', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Converters').click();
    cy.checkUrl('converters');
  });

  it('should  accept valid values and return properly results', () => {
    /* This function iterates through all input elements on the 'converters' page, 
  and when it encounters an even index, it retrieves the next item from the 'dataConverters' array." */
    cy.get('input').then((selectors) => {
      selectors.each((index, inputField) => {
        cy.wrap(inputField).type(dataConverters[index]);
        cy.get('button[type="submit"]').eq(index).click();
        if (index % 2 === 0) {
          cy.get('[data-cy="results"]')
            .eq(index)
            .should(AssertionEnum.contain, dataConverters[index + 1]);
        } else {
          cy.get('[data-cy="results"]')
            .eq(index)
            .should(AssertionEnum.contain, dataConverters[index - 1]);
        }
      });
    });
  });
  it('should be display the required error message', () => {
    cy.get('input').then((selectors) => {
      selectors.each((index) => {
        cy.get('button[type="submit"]').eq(index).click();
        cy.get('[data-cy="error"]')
          .eq(index)
          .should(AssertionEnum.contain, 'required');
      });
    });
  });
});
