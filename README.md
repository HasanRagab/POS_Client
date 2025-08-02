# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# POS System Frontend

A modern Point of Sale (POS) system built with React, TypeScript, and shadcn/ui that connects to the NestJS backend microservices.

## Features

### 🏪 POS Interface
- **Product Selection**: Browse and search products with real-time filtering
- **Shopping Cart**: Add/remove items with quantity management
- **Customer Management**: Optional customer selection for sales
- **Location Selection**: Multi-location support
- **Sale Processing**: Complete transactions with real-time updates

### 🔧 Admin Dashboard
- **Product Management**: Create, edit, and delete products
- **Customer Management**: Manage customer database
- **Sales History**: View all completed transactions
- **Analytics**: Basic sales metrics and statistics

### 🔐 Authentication
- **Organization-based Authentication**: Multi-tenant login system
- **JWT Token Management**: Secure API communication
- **Role-based Access**: Different views for different user roles

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios with interceptors
- **Styling**: Tailwind CSS with CSS Variables
- **Build Tool**: Vite
- **Package Manager**: Bun

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Login.tsx       # Authentication component
│   ├── POSInterface.tsx # Main POS interface
│   └── AdminDashboard.tsx # Admin management panel
├── lib/                # Utility libraries
│   ├── api.ts          # API types and axios configuration
│   ├── auth.ts         # Authentication service
│   ├── products.ts     # Product API service
│   ├── customers.ts    # Customer API service
│   ├── sales.ts        # Sales API service
│   └── locations.ts    # Location API service
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## API Integration

The frontend integrates with these backend API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/whoami` - Get current user info

### Products
- `GET /api/products` - List products with pagination
- `POST /api/products` - Create new product
- `GET /api/products/:id` - Get product details
- `PATCH /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Customers
- `GET /api/customers` - List customers with pagination
- `POST /api/customers` - Create new customer
- `GET /api/customers/:id` - Get customer details
- `PATCH /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Sales
- `GET /api/sales` - List sales with pagination
- `POST /api/sales` - Create new sale
- `GET /api/sales/:id` - Get sale details

### Locations
- `GET /api/locations` - List all locations
- `GET /api/categories` - List all categories

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd frontend
   bun install
   ```

2. **Configure API Endpoint**
   Update `src/lib/api.ts` to point to your backend:
   ```typescript
   const API_BASE_URL = 'http://localhost:3000/api';
   ```

3. **Start Development Server**
   ```bash
   bun dev
   # or
   bunx vite
   ```

4. **Build for Production**
   ```bash
   bun run build
   ```

## Usage

### 🔑 Login
1. Enter your Organization ID
2. Provide email and password
3. Click "Sign in" to authenticate

### 🏪 POS Mode
1. Select a location from the dropdown
2. Optionally select a customer
3. Browse or search for products
4. Click products to add them to cart
5. Adjust quantities using +/- buttons
6. Click "Complete Sale" to process the transaction

### 🔧 Admin Mode
1. Click "Admin" tab in the header
2. Use tabs to navigate between:
   - **Products**: Manage product catalog
   - **Customers**: Manage customer database
   - **Sales**: View transaction history

### 📦 Product Management
- Click "Add Product" to create new products
- Fill in required fields: name, type, and price
- Optional fields: SKU, barcode, inventory tracking
- Edit or delete existing products using action buttons

### 👥 Customer Management
- Click "Add Customer" to create new customers
- Required field: name
- Optional fields: email, phone, address
- Edit or delete existing customers using action buttons

## Configuration

### Environment Variables
Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000/api
VITE_ORG_ID=your-default-org-id
```

### API Configuration
The API client automatically handles:
- JWT token attachment to requests
- Organization ID headers
- Token refresh and logout on 401 responses
- Request/response interceptors

## Security Features

- **Automatic Token Management**: Tokens are stored in localStorage and attached to all API requests
- **Token Expiry Handling**: Automatic logout when tokens expire
- **Organization Isolation**: All requests include organization ID for tenant isolation
- **Input Validation**: Client-side validation using Zod schemas
- **XSS Protection**: All user inputs are properly sanitized

## Performance Features

- **Code Splitting**: Dynamic imports for route-based code splitting
- **Optimistic Updates**: Immediate UI updates with rollback on errors
- **Efficient Re-rendering**: React Query cache management
- **Lazy Loading**: Components and routes loaded on demand

## Contributing

1. Follow the existing code style and patterns
2. Use TypeScript strictly - no `any` types
3. Add proper error handling and loading states
4. Update this README when adding new features
5. Test all functionality before submitting changes

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend allows requests from frontend origin
2. **401 Unauthorized**: Check organization ID and token validity
3. **Network Errors**: Verify backend is running and API_BASE_URL is correct
4. **Build Errors**: Check TypeScript types and imports

### Development Tips

- Use browser dev tools to inspect API requests
- Check the Network tab for failed requests
- Monitor console for JavaScript errors
- Use React Developer Tools for component debugging

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is part of the POS system and follows the same license as the backend services.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
