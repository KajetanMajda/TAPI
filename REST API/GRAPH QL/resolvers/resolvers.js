import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language/index.js';

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

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Custom scalar for dates',
  serialize(value) {
    return value;
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

export const resolvers = {
  Date: dateScalar,
  Query: {
    categories: () => categories,
    expenses: (_, { filter, pagination, sort }) => {
      let filteredExpenses = expenses;

      if (filter) {
        if (filter.userName) {
          if (filter.userName.eq) {
            filteredExpenses = filteredExpenses.filter(exp => exp.userName === filter.userName.eq);
          }
          if (filter.userName.contains) {
            filteredExpenses = filteredExpenses.filter(exp => exp.userName.includes(filter.userName.contains));
          }
        }
        if (filter.amount) {
          if (filter.amount.gt) {
            filteredExpenses = filteredExpenses.filter(exp => exp.amount.value > filter.amount.gt);
          }
          if (filter.amount.lte) {
            filteredExpenses = filteredExpenses.filter(exp => exp.amount.value <= filter.amount.lte);
          }
        }
      }

      if (sort) {
        const { field, order } = sort;
        filteredExpenses = filteredExpenses.sort((a, b) =>
          order === 'ASC' ? (a[field] > b[field] ? 1 : -1) : (a[field] < b[field] ? 1 : -1)
        );
      }

      if (pagination) {
        const { page, pageSize } = pagination;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        filteredExpenses = filteredExpenses.slice(start, end);
      }

      return filteredExpenses;
    },
  },
  Mutation: {
    createExpense: (_, { input }) => {
      const newExpense = {
        id: expenses.length + 1,
        userName: input.userName,
        description: input.description,
        image: input.image,
        category: categories.find(cat => cat.id === input.categoryId),
        amount: {
          value: input.amount,
          currency: {
            code: input.currencyCode,
            symbol: input.currencyCode === 'USD' ? '$' : '€',
          },
        },
        transaction: {
          date: input.transactionDate,
          paymentMethod: {
            type: input.paymentMethodType,
            details: {
              cardType: input.cardType,
              lastFourDigits: input.lastFourDigits,
              accountNumber: input.accountNumber,
            },
          },
        },
      };
      expenses.push(newExpense);
      return newExpense;
    },
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