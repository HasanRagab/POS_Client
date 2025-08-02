# Authentication System

## Overview
The POS frontend includes a robust authentication system using Zustand for state management and React Router for navigation. It supports both user login and organization signup functionality.

## Features
- **Landing Page**: Marketing page with features overview and call-to-action buttons
- **Signup Page**: Multi-step organization creation with admin account setup
- **Login Page**: Beautiful, responsive login form with email/password authentication
- **Protected Routes**: Automatic redirection to login for unauthenticated users  
- **Persistent Sessions**: Uses Zustand persist middleware to maintain login state across browser sessions
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Visual feedback during authentication processes
- **Auto-redirect**: Redirects to intended page after successful login/signup

## Routes
- `/` - Landing page (public)
- `/signup` - Organization creation (public)
- `/login` - User login (public)
- `/app/*` - Protected application routes

## Components

### Landing Page (`src/components/LandingPage.tsx`)
Marketing page featuring:
- Hero section with call-to-action buttons
- Feature showcase grid
- Responsive design
- Automatic redirect for authenticated users

### Signup Page (`src/components/auth/SignupPage.tsx`)
Multi-step organization creation form:
- **Step 1**: Business information and subdomain selection
- **Step 2**: Admin account details with password validation
- Real-time subdomain availability checking
- Form validation with Zod schema
- Password strength requirements
- Success notification and redirect to login

### Auth Store (`src/store/useAuthStore.ts`)
Zustand store managing authentication state:
- `isAuthenticated`: Boolean indicating login status
- `user`: Current user object with id, name, email, role
- `isLoading`: Loading state for async operations
- `error`: Error messages from failed operations
- `login()`: Authenticate user with email/password
- `logout()`: Clear authentication state and redirect
- `checkAuth()`: Verify current authentication status
- `clearError()`: Clear error messages

### Login Page (`src/components/auth/LoginPage.tsx`)
Responsive login form with:
- Email/password validation using Zod schema
- Password visibility toggle
- Loading indicators
- Error display
- Success notifications
- Links to signup page
- Welcome message display for new signups

### Protected Route (`src/components/auth/ProtectedRoute.tsx`)
HOC that wraps routes requiring authentication:
- Checks authentication status
- Redirects to login if not authenticated
- Preserves intended destination for post-login redirect
- Shows loading screen during auth verification

## Usage

### Organization Signup
```tsx
import { OrganizationsService, CreateOrgDto } from '@/api';

const createOrganization = async (data: CreateOrgDto) => {
  try {
    const response = await OrganizationsService.organizationControllerCreate(data);
    console.log('Organization created:', response.data);
  } catch (error) {
    console.error('Signup failed:', error);
  }
};
```

### Basic Authentication Check
```tsx
import { useAuthStore } from '@/store/useAuthStore';

const MyComponent = () => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {user?.name}!</div>;
};
```

### Manual Login
```tsx
import { useAuthStore } from '@/store/useAuthStore';

const MyLoginComponent = () => {
  const { login, isLoading, error } = useAuthStore();
  
  const handleLogin = async () => {
    try {
      await login({
        email: 'user@example.com',
        password: 'password123'
      });
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  
  return (
    <button onClick={handleLogin} disabled={isLoading}>
      {isLoading ? 'Logging in...' : 'Login'}
    </button>
  );
};
```

### Protecting Routes
```tsx
import { ProtectedRoute } from '@/components/auth';

// In your router configuration
{
  path: "/protected",
  element: (
    <ProtectedRoute>
      <MyProtectedComponent />
    </ProtectedRoute>
  ),
}
```

## API Integration
The auth system integrates with your backend API through:
- `OrganizationsService.organizationControllerCreate()`: Create new organization with admin user
- `OrganizationsService.organizationControllerGetBySubdomain()`: Check subdomain availability and get organization
- `AuthService.loginUser()`: Authenticate with email/password
- `AuthService.getCurrentUser()`: Get current user details

## Security Features
- Automatic session validation
- Secure token storage
- Organization-based authentication
- Input validation and sanitization
- Password strength requirements
- Subdomain availability checking
- Error handling without exposing sensitive information

## User Flow
1. **New Users**: Landing page → Signup (2-step) → Login → App
2. **Existing Users**: Landing page → Login → App
3. **Authenticated Users**: Direct access to app, landing page redirects to app

## Form Validation
### Signup Form
- **Business Name**: Minimum 2 characters
- **Subdomain**: 3-20 characters, lowercase alphanumeric and hyphens only
- **Email**: Valid email format
- **Phone**: Minimum 10 characters
- **Password**: Minimum 8 characters with uppercase, lowercase, and number
- **Confirm Password**: Must match password

### Login Form
- **Email**: Valid email format
- **Password**: Required field

## Styling
Uses Tailwind CSS with shadcn/ui components for:
- Responsive design
- Consistent styling
- Accessibility features
- Modern UI patterns
