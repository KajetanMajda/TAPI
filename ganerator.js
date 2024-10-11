import { faker } from '@faker-js/faker';

function generateCategory() {
  const categories = [
    { id: 1, name: 'Food', type: 'Essential' },
    { id: 2, name: 'Transport', type: 'Essential' },
    { id: 3, name: 'Entertainment', type: 'Discretionary' },
    { id: 4, name: 'Health & Fitness', type: 'Discretionary' }
  ];
  
  return faker.helpers.arrayElement(categories);
}
function generatePaymentMethod() {
  const paymentMethods = [
    {
      type: 'Card',
      details: {
        cardType: faker.finance.creditCardType(),
        lastFourDigits: faker.finance.mask(4, true)
      }
    },
    {
      type: 'Cash'
    },
    {
      type: 'Bank Transfer',
      details: {
        accountNumber: faker.finance.iban()
      }
    }
  ];

  return faker.helpers.arrayElement(paymentMethods);
}

export const generateExpense = (id) => {
  return {
    id: id,
    userName: faker.name.fullName(),
    description: faker.commerce.productName(),
    image: faker.image.avatar(),
    category: generateCategory(),
    amount: {
      value: parseFloat(faker.finance.amount(10, 500, 2)),
      currency: {
        code: 'PLN',
        symbol: 'zł'
      }
    },
    transaction: {
      date: faker.date.recent().toISOString().split('T')[0],
      paymentMethod: generatePaymentMethod()
    }
  };
}