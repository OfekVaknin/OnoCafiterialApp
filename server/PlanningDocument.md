# Cafeteria Orders System: Transition to MongoDB Atlas

## Overview
The goal is to replace the current client-side localStorage-based data management with a centralized backend using Node.js and MongoDB Atlas. This will enable better scalability, data consistency, and security while adhering to modern backend development best practices.

---

## Backend Application Overview
The backend will be a Node.js application using Express.js as the web framework and MongoDB Atlas as the database. It will expose RESTful APIs for the frontend to interact with the data.

### Key Features
- Centralized data management for menu items, categories, orders, users, and feedback.
- Secure user authentication and authorization.
- Scalable and modular architecture.
- Clean code practices with separation of concerns.

---

## Backend Application Structure
The backend will follow a modular and scalable folder structure:

```
src/
├── config/               # Configuration files (e.g., database, environment variables)
│   ├── db.ts             # MongoDB connection setup
│   ├── dotenv.ts         # Environment variable loader
├── controllers/          # Route handlers (business logic)
│   ├── authController.ts # Authentication-related logic
│   ├── menuController.ts # Menu-related logic
│   ├── orderController.ts # Order-related logic
│   ├── userController.ts # User-related logic
│   ├── feedbackController.ts # Feedback-related logic
├── middlewares/          # Custom middleware (e.g., authentication, error handling)
│   ├── authMiddleware.ts # JWT authentication middleware
│   ├── errorMiddleware.ts # Global error handler
├── models/               # Mongoose models (schemas for MongoDB collections)
│   ├── User.ts           # User schema
│   ├── MenuItem.ts       # Menu item schema
│   ├── Order.ts          # Order schema
│   ├── Feedback.ts       # Feedback schema
│   ├── Category.ts       # Category schema
├── routes/               # API routes
│   ├── authRoutes.ts     # Authentication routes
│   ├── menuRoutes.ts     # Menu-related routes
│   ├── orderRoutes.ts    # Order-related routes
│   ├── userRoutes.ts     # User-related routes
│   ├── feedbackRoutes.ts # Feedback-related routes
├── services/             # Business logic and database interaction
│   ├── authService.ts    # Authentication service
│   ├── menuService.ts    # Menu service
│   ├── orderService.ts   # Order service
│   ├── userService.ts    # User service
│   ├── feedbackService.ts # Feedback service
├── utils/                # Utility functions
│   ├── jwt.ts            # JWT token generation and verification
│   ├── logger.ts         # Logging utility
├── app.ts                # Express app setup
├── server.ts             # Server entry point
```

---

## Steps to Transition

### **1. Set Up MongoDB Atlas**
- Create a MongoDB Atlas cluster.
- Configure a database named `cafeteria_orders`.
- Create collections for `users`, `menuItems`, `categories`, `orders`, and `feedback`.

### **2. Initialize the Node.js Project**
- Create a new Node.js project:
  ```bash
  mkdir cafeteria-backend
  cd cafeteria-backend
  npm init -y
  ```
- Install dependencies:
  ```bash
  npm install express mongoose dotenv jsonwebtoken bcryptjs cors body-parser
  npm install --save-dev typescript ts-node @types/node @types/express @types/jsonwebtoken @types/bcryptjs
  ```

### **3. Configure MongoDB Connection**
- Create a `src/config/db.ts` file to connect to MongoDB:
  ```typescript
  import mongoose from 'mongoose';

  const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };

  export default connectDB;
  ```

### **4. Define Mongoose Models**
- Create schemas for `users`, `menuItems`, `categories`, `orders`, and `feedback` in the `models` folder. Example for `MenuItem`:
  ```typescript
  import mongoose, { Schema, Document } from 'mongoose';

  export interface IMenuItem extends Document {
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    categoryId: string;
    available: boolean;
  }

  const MenuItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    available: { type: Boolean, default: true },
  });

  export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
  ```

### **5. Create RESTful APIs**
- Define routes and controllers for each entity. Example for menu items:
  - **Route** (`menuRoutes.ts`):
    ```typescript
    import express from 'express';
    import { getMenuItems, createMenuItem } from '../controllers/menuController';

    const router = express.Router();

    router.get('/', getMenuItems);
    router.post('/', createMenuItem);

    export default router;
    ```
  - **Controller** (`menuController.ts`):
    ```typescript
    import { Request, Response } from 'express';
    import MenuItem from '../models/MenuItem';

    export const getMenuItems = async (req: Request, res: Response) => {
      try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch menu items' });
      }
    };

    export const createMenuItem = async (req: Request, res: Response) => {
      try {
        const newItem = new MenuItem(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create menu item' });
      }
    };
    ```

### **6. Authentication and Authorization**
- Use `jsonwebtoken` for JWT-based authentication.
- Hash passwords using `bcryptjs`.
- Protect routes with middleware (`authMiddleware.ts`).

### **7. Update Frontend**
- Replace localStorage-based services with API calls to the backend using `fetch` or `axios`.
- Update the frontend to handle authentication tokens.

### **8. Testing**
- Write unit tests for services and controllers using Jest.
- Test API endpoints using Postman or similar tools.

---

## Best Practices
- **Separation of Concerns**: Keep controllers, services, and models separate.
- **Environment Variables**: Use `.env` for sensitive data like `MONGO_URI` and `JWT_SECRET`.
- **Error Handling**: Use centralized error-handling middleware.
- **Validation**: Validate request data using libraries like `joi` or `express-validator`.
- **Security**: Use HTTPS, sanitize inputs, and implement rate limiting.

---

## Next Steps
1. Set up the backend project and MongoDB connection.
2. Define models and implement APIs for all entities.
3. Update the frontend to interact with the backend.
4. Test the entire system for functionality and performance.

Let me know if you need help with any specific part of this plan!
