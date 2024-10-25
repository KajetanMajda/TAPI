import { faker } from '@faker-js/faker';

export function generateCategory() {
  const categories = [
    { id: 1, name: 'Food', type: 'Essential' },
    { id: 2, name: 'Transport', type: 'Essential' },
    { id: 3, name: 'Entertainment', type: 'Discretionary' },
    { id: 4, name: 'Health & Fitness', type: 'Discretionary' }
  ];
  
  return faker.helpers.arrayElement(categories);
}

function generateCardType() {
  const cardTypes = ['Visa', 'MasterCard', 'American Express'];
  return faker.helpers.arrayElement(cardTypes);
}
export function generatePaymentMethod() {
  const paymentMethods = [
    {
      type: 'Card',
      details: {
        cardType: generateCardType(),
        lastFourDigits: faker.finance.creditCardNumber().slice(-4)
      }
    },
    {
      type: 'Cash'
    },
    {
      type: 'Bank Transfer',
      details: {
        accountNumber: faker.finance.accountNumber()
      }
    }
  ];

  return faker.helpers.arrayElement(paymentMethods);
}

export const generateExpense = (id) => {
  return {
    id: id,
    userName: faker.person.fullName(),
    description: faker.commerce.productName(),
    image: faker.image.avatar(),
    category: generateCategory(),
    amount: {
      value: parseFloat(faker.finance.amount(10, 500, 2)),
      currency: {
        code: faker.finance.currencyCode(),
        symbol: faker.finance.currencySymbol()
      }
    },
    transaction: {
      date: faker.date.recent().toISOString().split('T')[0],
      paymentMethod: generatePaymentMethod()
    }
  };
}