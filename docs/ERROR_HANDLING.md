# Error Handling System

## Overview
The POS system includes comprehensive error handling for various scenarios, especially organization-related errors.

## Error Types

### 1. Organization Not Found (404)
**Scenario**: User tries to access a subdomain that doesn't exist
- **URL**: `nonexistent.pos.com` or `localhost:5174/login?org=nonexistent`
- **Component**: `OrganizationNotFound`
- **Features**:
  - Clear error message with organization name
  - Suggestions for resolution
  - Links to main site and signup
  - Professional design with red color scheme

### 2. Application Errors (500+)
**Scenario**: Unexpected JavaScript errors or API failures
- **Component**: `ErrorBoundary`
- **Features**:
  - Catches React component errors
  - Shows user-friendly error message
  - Refresh and home navigation options
  - Error details in development mode

### 3. Network/API Errors
**Scenario**: Server is down or network issues
- **Handled by**: Individual components with try/catch
- **Features**:
  - Toast notifications for API failures
  - Specific error messages based on error type
  - Graceful degradation

## Error Flow

### Organization Validation Flow
```
User visits subdomain → OrganizationChecker → API call to verify org
├── Success: Continue to requested page
├── 404: Show OrganizationNotFound page
└── Other error: Show error message with retry option
```

### Login Error Flow
```
User submits login → Auth Store validates
├── Invalid credentials: Show form error
├── Organization not found: Redirect to OrganizationNotFound
└── Network error: Show toast notification
```

## Components

### OrganizationChecker
- **Location**: `src/components/auth/OrganizationChecker.tsx`
- **Purpose**: Validates organization exists before allowing access
- **Usage**: Wraps login and app routes
- **Error States**:
  - Loading: Shows loading screen
  - Not found: Shows OrganizationNotFound component
  - Network error: Shows specific error message

### OrganizationNotFound
- **Location**: `src/components/errors/OrganizationNotFound.tsx`
- **Purpose**: 404 page for missing organizations
- **Features**:
  - Organization name in error message
  - Action buttons (main site, create org)
  - Support contact information
  - Professional error design

### ErrorBoundary
- **Location**: `src/components/errors/ErrorBoundary.tsx`
- **Purpose**: Catches unexpected React errors
- **Features**:
  - Prevents white screen crashes
  - Error details for debugging
  - Recovery options (refresh, home)
  - Wraps entire application

## Error Messages

### Organization Not Found
```
"Organization Not Found"
"The organization you're looking for doesn't exist"
"'{subdomain}' Not Found"
"The organization '{subdomain}' does not exist or may have been removed."
```

### API Error Messages
- **404**: "Organization '{subdomain}' does not exist"
- **500**: "Server error while checking organization '{subdomain}'. Please try again later."
- **Network**: "Unable to verify organization '{subdomain}'. Please check your connection."

## Development Testing

### Test Organization Not Found
```bash
# Visit non-existent organization
http://localhost:5174/login?org=doesnotexist
http://localhost:5174/app/pos?org=invalid

# Should show OrganizationNotFound component
```

### Test Error Boundary
```javascript
// Add to any component to trigger error boundary
throw new Error('Test error boundary');
```

### Test API Errors
- Disconnect network and try to login
- Use invalid API endpoints
- Simulate server errors

## User Experience

### Clear Error Communication
- **What happened**: Clear description of the error
- **Why it happened**: Context about the issue
- **What to do**: Specific action steps
- **How to get help**: Support contact information

### Recovery Options
- **Refresh**: Retry the current action
- **Go Home**: Navigate to safe starting point
- **Create Account**: For missing organizations
- **Contact Support**: For persistent issues

## Best Practices

### Error Handling
1. **Always catch API calls** with try/catch
2. **Provide specific error messages** based on error type
3. **Offer recovery actions** for users
4. **Log errors** for debugging
5. **Don't expose sensitive information** in error messages

### User Experience
1. **Show loading states** during async operations
2. **Use consistent error styling** across the app
3. **Provide helpful action buttons**
4. **Make error messages human-readable**
5. **Include support contact information**

## Error Monitoring
Consider integrating error monitoring services:
- Sentry for error tracking
- LogRocket for session replay
- Custom error reporting to your backend
