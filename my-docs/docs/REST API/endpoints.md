---
sidebar_position: 1
---

# Endpoints

This API provides endpoints to manage expenses, categories, and payment methods with a playful "dinozaur" theme. Below is the complete list of supported operations.

For detailed and interactive documentation, visit the [Swagger API Documentation](http://localhost:3000/docs/swager).

### **Expenses**

#### **GET `/expenses`**
Retrieves a list of all expenses.

- **Responses:**
  - `200 OK`: Returns an array of expense objects with HATEOAS links.
  - `404 Not Found`: If no expenses are available.

- **Example Request:**
```http
GET /expenses HTTP/1.1
Host: localhost:3000
```

---

#### **POST `/expenses`**
Adds a new expense.

- **Responses:**
  - `201 Created`: Returns the created expense object.

- **Example Request:**
```http
POST /expenses HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "userName": "John Dino",
  "description": "Bought dino food",
  "category": { "id": 1 },
  "amount": {
    "value": 20.5,
    "currency": { "code": "PLN", "symbol": "zł" }
  },
  "transaction": {
    "date": "2024-01-01",
    "paymentMethod": { "type": "Card" }
  }
}
```

---

#### **PUT `/expenses/:id`**
Updates an entire expense by its ID.

- **Parameters:**
  - `id` (Number): The unique identifier of the expense.

- **Responses:**
  - `200 OK`: Returns the updated expense object.
  - `400 Bad Request`: If the ID format is invalid.
  - `404 Not Found`: If the expense is not found.

- **Example Request:**
```http
PUT /expenses/1 HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "description": "Updated dino food expense",
  "amount": {
    "value": 25.0,
    "currency": { "code": "PLN", "symbol": "zł" }
  }
}
```

---

#### **PATCH `/expenses/:id`**
Partially updates an expense by its ID.

- **Parameters:**
  - `id` (Number): The unique identifier of the expense.

- **Responses:**
  - `200 OK`: Returns the updated expense object.
  - `400 Bad Request`: If the ID format is invalid.
  - `404 Not Found`: If the expense is not found.

- **Example Request:**
```http
PATCH /expenses/1 HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "description": "Quick dino snack"
}
```

---

#### **DELETE `/expenses/:id`**
Deletes an expense by its ID.

- **Parameters:**
  - `id` (Number): The unique identifier of the expense.

- **Responses:**
  - `200 OK`: Returns the deleted expense object.
  - `400 Bad Request`: If the ID format is invalid.
  - `404 Not Found`: If the expense is not found.

- **Example Request:**
```http
DELETE /expenses/1 HTTP/1.1
Host: localhost:3000
```

---

### **Categories**

#### **GET `/categories`**
Retrieves a list of all categories.

- **Responses:**
  - `200 OK`: Returns an array of category objects with HATEOAS links.
  - `404 Not Found`: If no categories are available.

- **Example Request:**
```http
GET /categories HTTP/1.1
Host: localhost:3000
```

---

#### **POST `/categories`**
Adds a new category.

- **Responses:**
  - `201 Created`: Returns the created category object.

- **Example Request:**
```http
POST /categories HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "name": "Carnivore Food",
  "type": "Essential"
}
```

---

#### **DELETE `/categories/:id`**
Deletes a category by its ID.

- **Parameters:**
  - `id` (Number): The unique identifier of the category.

- **Responses:**
  - `200 OK`: Returns the deleted category object.
  - `400 Bad Request`: If the ID format is invalid.
  - `404 Not Found`: If the category is not found.

- **Example Request:**
```http
DELETE /categories/1 HTTP/1.1
Host: localhost:3000
```

---

### **Payment Methods**

#### **GET `/paymentMethods`**
Retrieves a list of all payment methods.

- **Responses:**
  - `200 OK`: Returns an array of payment method objects with HATEOAS links.
  - `404 Not Found`: If no payment methods are available.

- **Example Request:**
```http
GET /paymentMethods HTTP/1.1
Host: localhost:3000
```

---

#### **POST `/paymentMethods`**
Adds a new payment method.

- **Responses:**
  - `201 Created`: Returns the created payment method object.

- **Example Request:**
```http
POST /paymentMethods HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "type": "Bank Transfer",
  "details": {
    "accountNumber": "1234567890"
  }
}
```

---

#### **DELETE `/paymentMethods/:id`**
Deletes a payment method by its ID.

- **Parameters:**
  - `id` (Number): The unique identifier of the payment method.

- **Responses:**
  - `200 OK`: Returns the deleted payment method object.
  - `400 Bad Request`: If the ID format is invalid.
  - `404 Not Found`: If the payment method is not found.

- **Example Request:**
```http
DELETE /paymentMethods/1 HTTP/1.1
Host: localhost:3000
```