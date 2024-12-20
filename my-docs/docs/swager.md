---
sidebar_position: 1
---

# SWAGGER

### Overview
This documentation provides details about the TAPI API endpoints, including functionality for managing expenses, categories, and payment methods. The API leverages randomly generated data for demonstration purposes using `faker-js` and is documented using Swagger.

### Swagger Documentation

The TAPI API is integrated with Swagger for interactive and comprehensive API documentation. You can explore and test API endpoints directly via the Swagger UI interface.

#### Available Endpoints
1. `/expenses` - Manage expenses (create, update, fetch, delete).
2. `/categories` - Manage expense categories.
3. `/paymentMethods` - Manage payment methods.

#### Data Schemas
Swagger includes the following data models for describing the API responses:
- **Category**: Represents an expense category (e.g., Essential, Discretionary).
- **PaymentMethod**: Represents a payment method (e.g., Card, Cash, Bank Transfer).
- **Expense**: Contains details about expenses, including amount, category, and payment method.

#### Features
1. **Interactive API Documentation**  
   Access the Swagger UI at:
   http://localhost:3000/api-docs

2. **HATEOAS Support**  
Each response includes links to related resources for better API navigation.

3. **Middleware for Enhanced Functionality**  
- Request tracking: Tracks the number of requests per IP address and includes the count in the response headers (`X-Request-Count`).
- Metadata: Adds metadata such as the application author in the headers (`X-Application-Author`).