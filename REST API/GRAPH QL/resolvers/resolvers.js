const categories = [
    { id: 1, name: 'Groceries', type: 'Essential' },
    { id: 2, name: 'Entertainment', type: 'Discretionary' },
  ];
  
  const expenses = [
    {
      id: 1,
      userName: 'John Doe',
      description: 'Grocery shopping',
      image: 'image_url',
      category: categories[0],
      amount: { value: 50.0, currency: { code: 'USD', symbol: '$' } },
      transaction: {
        date: '2023-10-01',
        paymentMethod: {
          type: 'Card',
          details: { cardType: 'Visa', lastFourDigits: '1234' },
        },
      },
    },
  ];
  
  export const resolvers = {
    Query: {
      categories: () => categories,
      expenses: () => expenses,
    },
    Expense: {
      category: (expense) => expense.category,
      amount: (expense) => expense.amount,
      transaction: (expense) => expense.transaction,
    },
    ExpenseAmount: {
      currency: (amount) => amount.currency,
    },
    Transaction: {
      paymentMethod: (transaction) => transaction.paymentMethod,
    },
    PaymentMethod: {
      details: (method) => method.details,
    },
  };
  