---
sidebar_position: 2
---

# Function

This documentation provides details about the Dinozaur API endpoints, including functionality for managing expenses, categories, and payment methods. The API leverages randomly generated data for demonstration purposes using `faker-js`.

### Data Generation

#### Category Generator

```javascript
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
```

#### Payment Method Generator

```javascript
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
```

#### Expense Generator

```javascript
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
```

<!-- ### Endpoints -->

<!-- #### Expenses

**GET /expenses**
- **Description**: Retrieves all expenses.
- **Responses**:
  - `200 OK`: List of expenses with HATEOAS links.
  - `404 Not Found`: No expenses found.

**POST /expenses**
- **Description**: Creates a new expense.
- **Responses**:
  - `201 Created`: The created expense.

**GET /expenses/{id}**
- **Description**: Retrieves a specific expense by ID.
- **Parameters**:
  - `id` (Path, Integer): Expense ID.
- **Responses**:
  - `200 OK`: The expense with HATEOAS links.
  - `404 Not Found`: Expense not found.

**PUT /expenses/{id}**
- **Description**: Updates an expense by ID.
- **Parameters**:
  - `id` (Path, Integer): Expense ID.
- **Responses**:
  - `200 OK`: Updated expense.
  - `404 Not Found`: Expense not found.

**PATCH /expenses/{id}**
- **Description**: Partially updates an expense by ID.
- **Parameters**:
  - `id` (Path, Integer): Expense ID.
- **Responses**:
  - `200 OK`: Updated expense.
  - `404 Not Found`: Expense not found.

**DELETE /expenses/{id}**
- **Description**: Deletes an expense by ID.
- **Parameters**:
  - `id` (Path, Integer): Expense ID.
- **Responses**:
  - `200 OK`: Deleted expense.
  - `404 Not Found`: Expense not found.

#### Categories

**GET /categories**
- **Description**: Retrieves all categories.
- **Responses**:
  - `200 OK`: List of categories with HATEOAS links.
  - `404 Not Found`: No categories found.

**POST /categories**
- **Description**: Creates a new category.
- **Responses**:
  - `201 Created`: The created category.

**GET /categories/{id}**
- **Description**: Retrieves a specific category by ID.
- **Parameters**:
  - `id` (Path, Integer): Category ID.
- **Responses**:
  - `200 OK`: The category with HATEOAS links.
  - `404 Not Found`: Category not found.

**PUT /categories/{id}**
- **Description**: Updates a category by ID.
- **Parameters**:
  - `id` (Path, Integer): Category ID.
- **Responses**:
  - `200 OK`: Updated category.
  - `404 Not Found`: Category not found.

**PATCH /categories/{id}**
- **Description**: Partially updates a category by ID.
- **Parameters**:
  - `id` (Path, Integer): Category ID.
- **Responses**:
  - `200 OK`: Updated category.
  - `404 Not Found`: Category not found.

**DELETE /categories/{id}**
- **Description**: Deletes a category by ID.
- **Parameters**:
  - `id` (Path, Integer): Category ID.
- **Responses**:
  - `200 OK`: Deleted category.
  - `404 Not Found`: Category not found.

#### Payment Methods

**GET /paymentMethods**
- **Description**: Retrieves all payment methods.
- **Responses**:
  - `200 OK`: List of payment methods with HATEOAS links.
  - `404 Not Found`: No payment methods found.

**POST /paymentMethods**
- **Description**: Creates a new payment method.
- **Responses**:
  - `201 Created`: The created payment method.

**GET /paymentMethods/{id}**
- **Description**: Retrieves a specific payment method by ID.
- **Parameters**:
  - `id` (Path, Integer): Payment method ID.
- **Responses**:
  - `200 OK`: The payment method with HATEOAS links.
  - `404 Not Found`: Payment method not found.

**PUT /paymentMethods/{id}**
- **Description**: Updates a payment method by ID.
- **Parameters**:
  - `id` (Path, Integer): Payment method ID.
- **Responses**:
  - `200 OK`: Updated payment method.
  - `404 Not Found`: Payment method not found.

**PATCH /paymentMethods/{id}**
- **Description**: Partially updates a payment method by ID.
- **Parameters**:
  - `id` (Path, Integer): Payment method ID.
- **Responses**:
  - `200 OK`: Updated payment method.
  - `404 Not Found`: Payment method not found.

**DELETE /paymentMethods/{id}**
- **Description**: Deletes a payment method by ID.
- **Parameters**:
  - `id` (Path, Integer): Payment method ID.
- **Responses**:
  - `200 OK`: Deleted payment method.
  - `404 Not Found`: Payment method not found. -->

### Notes
This API includes middleware for content type validation and request tracking. All endpoints return data with HATEOAS links for navigation.