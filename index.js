import express from "express";
import { generateExpense, generateCategory, generatePaymentMethod } from "./generate.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());

let expenses = [];
let categories = Array.from({ length: 4 }, (_, i) => generateCategory());
let paymentMethods = Array.from({ length: 3 }, (_, i) => generatePaymentMethod());

const mdlwrd = (req, res, next) => {
    const contentType = req.get['Content-type'];
    if (contentType !== 'application/json') {
        res.status(400);
    } 
    next();
}

const requestCount = {};

const trackRequestCount = (req, res, next) => {
    const ip = req.ip;
    if (!requestCount[ip]) {
        requestCount[ip] = 0;
    }
    requestCount[ip] += 1;
    res.setHeader('X-Request-Count', requestCount[ip]);
    res.setHeader('X-Application-Author', 'Kajetan');

    next();
};

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "TAPI API",
            version: "1.0.0",
            description: "API do zarządzania wydatkami, kategoriami oraz metodami płatności"
        },
        components: {
            schemas: {
                Category: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        type: { type: "string", description: "Typ kategorii (Essential lub Discretionary)" }
                    },
                    required: ["id", "name", "type"]
                },
                PaymentMethod: {
                    type: "object",
                    properties: {
                        type: { type: "string", description: "Typ metody płatności (Card, Cash, Bank Transfer)" },
                        details: {
                            type: "object",
                            properties: {
                                cardType: { type: "string" },
                                lastFourDigits: { type: "string" },
                                accountNumber: { type: "string" }
                            }
                        }
                    },
                    required: ["type"]
                },
                Expense: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        userName: { type: "string", description: "Imię i nazwisko użytkownika" },
                        description: { type: "string", description: "Opis wydatku" },
                        image: { type: "string", description: "URL do obrazu" },
                        category: { $ref: "#/components/schemas/Category" },
                        amount: {
                            type: "object",
                            properties: {
                                value: { type: "number", format: "float" },
                                currency: {
                                    type: "object",
                                    properties: {
                                        code: { type: "string", example: "PLN" },
                                        symbol: { type: "string", example: "zł" }
                                    }
                                }
                            }
                        },
                        transaction: {
                            type: "object",
                            properties: {
                                date: { type: "string", format: "date" },
                                paymentMethod: { $ref: "#/components/schemas/PaymentMethod" }
                            }
                        }
                    },
                    required: ["id", "userName", "description", "category", "amount", "transaction"]
                }
            }
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(mdlwrd);
app.use(trackRequestCount);

// --- Expenses ---
/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Zarządzanie wydatkami
 */

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Pobierz wszystkie wydatki
 *     tags: [Expenses]
 *     responses:
 *       200:
 *         description: Lista wydatków
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 */
app.get("/expenses", (req, res) => {
    if (expenses.length === 0) {
        return res.status(404).json({ message: "Exprenses not found", data: [] });
    }

    const expensesWithLinks = expenses.map(expense => ({
        ...expense,
        category: {
            ...expense.category,
            links: [
                { rel: "self", method: "GET", href: `http://localhost:3000/categories/${expense.category.id}` }
            ]
        },
        links: [
            { rel: "self", method: "GET", href: `http://localhost:3000/expenses/${expense.id}` },
            { rel: "update", method: "PUT", href: `http://localhost:3000/expenses/${expense.id}` },
            { rel: "partial_update", method: "PATCH", href: `http://localhost:3000/expenses/${expense.id}` },
            { rel: "delete", method: "DELETE", href: `http://localhost:3000/expenses/${expense.id}` }
        ]
    }));
    
    res.status(200).json({
        data: expensesWithLinks,
        links: [
            { rel: "self", method: "GET", href: "http://localhost:3000/expenses" },
            { rel: "create", method: "POST", href: "http://localhost:3000/expenses" }
        ]
    });
});

/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Pobierz wydatek po ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Wydatek
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       404:
 *         description: Wydatek nie znaleziony
 */
app.get("/expenses/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    const expense = expenses.find(e => e.id === id);

    if (expense) {
        res.status(200).json({
            ...expense,
            links: {
                self: {
                    href: `http://localhost:3000/expenses/${expense.id}`
                },
                category: {
                    href: `http://localhost:3000/categories/${expense.category.id}`
                }
            }
        });
    } else {
        res.status(404).json({ error: "Expense not found" });
    }
});

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Dodaj nowy wydatek
 *     tags: [Expenses]
 *     responses:
 *       201:
 *         description: Dodany wydatek
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 */
app.post("/expenses", (req, res) => {
    const newExpense = generateExpense(expenses.length + 1);
    expenses.push(newExpense);
    res.status(201).json(newExpense);
});

/**
 * @swagger
 * /expenses/{id}:
 *   put:
 *     summary: Zaktualizuj wydatek po ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: Zaktualizowany wydatek
 *       404:
 *         description: Wydatek nie znaleziony
 */
app.put("/expenses/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    const expenseIndex = expenses.findIndex(e => e.id === id);
    expenseIndex !== -1 ? res.status(200).json(Object.assign(expenses[expenseIndex], req.body)) : res.status(404).json({ error: "Expense not found" });
});

/**
 * @swagger
 * /expenses/{id}:
 *   patch:
 *     summary: Aktualizuj część wydatek po ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: Zaktualizowany wydatek
 *       404:
 *         description: Wydatek nie znaleziony
 */
app.patch("/expenses/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    const expense = expenses.find(e => e.id === id);
    expense ? res.status(200).json(Object.assign(expense, req.body)) : res.status(404).json({ error: "Expense not found" });
});

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Usuń wydatek po ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usunięty wydatek
 *       404:
 *         description: Wydatek nie znaleziony
 */
app.delete("/expenses/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    const expenseIndex = expenses.findIndex(e => e.id === id);
    expenseIndex !== -1 ? res.status(200).json(expenses.splice(expenseIndex, 1)[0]) : res.status(404).json({ error: "Expense not found" });
});

// --- Categories ---
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Zarządzanie kategoriami
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Pobierz wszystkie kategorie
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista kategorii
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
app.get("/categories", (req, res) => {
    if (categories.length === 0) {
        return res.status(404).json({ message: "Categories not found", data: [] });
    }

    const categoriesWithLinks = categories.map(category => ({
        ...category,
        links: [
            { rel: "self", method: "GET", href: `http://localhost:3000/categories/${category.id}` }
        ]
    }));

    res.status(200).json({
        data: categoriesWithLinks,
        links: [
            { rel: "self", method: "GET", href: "http://localhost:3000/categories" },
            { rel: "create", method: "POST", href: "http://localhost:3000/categories" }
        ]
    });
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Pobierz kategorię po ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Kategoria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Kategoria nie znaleziona
 */
app.get("/categories/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    const category = categories.find(c => c.id === id);
    if (category) {
        res.status(200).json({
            ...category,
            links: {
                self: { href: `http://localhost:3000/categories/${category.id}` },
                all_categories: { href: `http://localhost:3000/categories` }
            }
        });
    } else {
        res.status(404).json({ error: "Category not found" });
    }
});

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Dodaj nową kategorię
 *     tags: [Categories]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Dodana kategoria
 */
app.post("/categories", (req, res) => {
    const newCategory = { id: categories.length + 1, ...req.body };
    categories.push(newCategory);
    res.status(201).json(newCategory);
});

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Zaktualizuj kategorię po ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Zaktualizowana kategoria
 *       404:
 *         description: Kategoria nie znaleziona
 */
app.put("/categories/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    const categoryIndex = categories.findIndex(c => c.id === id);
    categoryIndex !== -1 ? res.status(200).json(Object.assign(categories[categoryIndex], req.body)) : res.status(404).json({ error: "Category not found" });
});

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Częściowo zaktualizuj kategorię po ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Zaktualizowana kategoria
 *       404:
 *         description: Kategoria nie znaleziona
 */
app.patch("/categories/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    const category = categories.find(c => c.id === id);
    category ? res.status(200).json(Object.assign(category, req.body)) : res.status(404).json({ error: "Category not found" });
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Usuń kategorię po ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usunięta kategoria
 *       404:
 *         description: Kategoria nie znaleziona
 */
app.delete("/categories/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    const categoryIndex = categories.findIndex(c => c.id === id);
    categoryIndex !== -1 ? res.status(200).json(categories.splice(categoryIndex, 1)[0]) : res.status(404).json({ error: "Category not found" });
});

// --- Payment Methods ---
/**
 * @swagger
 * tags:
 *   name: Payment Methods
 *   description: Zarządzanie metodami płatności
 */

/**
 * @swagger
 * /paymentMethods:
 *   get:
 *     summary: Pobierz wszystkie metody płatności
 *     tags: [Payment Methods]
 *     responses:
 *       200:
 *         description: Lista metod płatności
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PaymentMethod'
 */
app.get("/paymentMethods", (req, res) => {
    if (paymentMethods.length === 0) {
        return res.status(404).json({ message: "Payment Methods not found", data: [] });
    }

    const paymentMethodsWithLinks = paymentMethods.map(paymentMethod => ({
        ...paymentMethod,
        links: [
            { rel: "self", method: "GET", href: `http://localhost:3000/paymentMethods/${paymentMethod.id}` }
        ]
    }));

    res.status(200).json({
        data: paymentMethodsWithLinks,
        links: [
            { rel: "self", method: "GET", href: "http://localhost:3000/paymentMethods" },
            { rel: "create", method: "POST", href: "http://localhost:3000/paymentMethods" }
        ]
    });
});

/**
 * @swagger
 * /paymentMethods/{id}:
 *   get:
 *     summary: Pobierz metodę płatności po ID
 *     tags: [Payment Methods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Metoda płatności
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentMethod'
 *       404:
 *         description: Metoda płatności nie znaleziona
 */
app.get("/paymentMethods/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    const paymentMethod = paymentMethods.find(p => p.id === id);

    if (paymentMethod) {
        res.status(200).json({
            ...paymentMethod,
            links: {
                self: { href: `http://localhost:3000/paymentMethods/${paymentMethod.id}` },
                all_methods: { href: `http://localhost:3000/paymentMethods` }
            }
        });
    } else {
        res.status(404).json({ error: "Payment Method not found" });
    }
});

/**
 * @swagger
 * /paymentMethods:
 *   post:
 *     summary: Dodaj nową metodę płatności
 *     tags: [Payment Methods]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentMethod'
 *     responses:
 *       201:
 *         description: Dodana metoda płatności
 */
app.post("/paymentMethods", (req, res) => {
    const newPaymentMethod = { id: paymentMethods.length + 1, ...req.body };
    paymentMethods.push(newPaymentMethod);
    res.status(201).json(newPaymentMethod);
});

/**
 * @swagger
 * /paymentMethods/{id}:
 *   put:
 *     summary: Zaktualizuj metodę płatności po ID
 *     tags: [Payment Methods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentMethod'
 *     responses:
 *       200:
 *         description: Zaktualizowana metoda płatności
 *       404:
 *         description: Metoda płatności nie znaleziona
 */
app.put("/paymentMethods/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    const paymentMethodIndex = paymentMethods.findIndex(p => p.id === id);
    paymentMethodIndex !== -1 ? res.status(200).json(Object.assign(paymentMethods[paymentMethodIndex], req.body)) : res.status(404).json({ error: "Payment Method not found" });
});

/**
 * @swagger
 * /paymentMethods/{id}:
 *   patch:
 *     summary: Częściowo zaktualizuj metodę płatności po ID
 *     tags: [Payment Methods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentMethod'
 *     responses:
 *       200:
 *         description: Zaktualizowana metoda płatności
 *       404:
 *         description: Metoda płatności nie znaleziona
 */
app.patch("/paymentMethods/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    const paymentMethod = paymentMethods.find(p => p.id === id);
    paymentMethod ? res.status(200).json(Object.assign(paymentMethod, req.body)) : res.status(404).json({ error: "Payment Method not found" });
});

/**
 * @swagger
 * /paymentMethods/{id}:
 *   delete:
 *     summary: Usuń metodę płatności po ID
 *     tags: [Payment Methods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usunięta metoda płatności
 *       404:
 *         description: Metoda płatności nie znaleziona
 */
app.delete("/paymentMethods/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    const paymentMethodIndex = paymentMethods.findIndex(p => p.id === id);
    paymentMethodIndex !== -1 ? res.status(200).json(paymentMethods.splice(paymentMethodIndex, 1)[0]) : res.status(404).json({ error: "Payment Method not found" });
});

app.listen(3000, () => console.log("Server is running on port 3000"));