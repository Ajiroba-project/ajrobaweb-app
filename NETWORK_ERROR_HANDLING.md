# Network Error Handling Implementation

## Summary
Implemented comprehensive network error handling across the Ajiroba app to gracefully handle connection issues, retries, and user feedback.

## Files Created

### `/src/lib/networkErrorHandler.ts`
New utility module providing:
- **Online/Offline Detection**: Tracks browser network status
- **Automatic Retry Logic**: Exponential backoff for failed requests
- **User-Friendly Messages**: Clear error messages for different failure types
- **Axios Interceptors**: Global request/response handling
- **Error Classification**: Distinguishes between network errors (retryable) and HTTP errors

#### Key Features:
1. **Network Status Tracking**: Listens to `online`/`offline` events
2. **Configurable Retry**: 3 retries with exponential backoff (1s, 2s, 4s)
3. **Toast Notifications**: Shows appropriate messages without spamming
4. **Error Categorization**:
   - Network errors: No response, timeouts, connection refused
   - HTTP 4xx: Client errors (don't retry except 408, 429)
   - HTTP 5xx: Server errors (retry with backoff)

## Files Updated

### 1. `/src/app/component/Header.tsx`
**Changes:**
- Added import for network error handlers
- Updated `fetchCartItems()` to use `apiCallWithRetry()`
- Cart now silently fails on network errors (no spam toasts)
- Retries 2 times before giving up
- Sets cart to empty on failure rather than breaking

### 2. `/src/app/cart/page.tsx`
**Changes:**
- Added import for network error handlers
- Updated `fetchCartItems()` with retry logic
- Updated `handleIncrement()` with network error handling
- Updated `handleDecrement()` with network error handling
- Updated `handleDelete()` with network error handling
- All cart operations now:
  - Retry on network failures
  - Show clear error messages
  - Handle timeouts gracefully

### 3. `/src/hooks/useGetData.ts`
**Changes:**
- Added error handling in `fetchDatanew()`
- Network errors return placeholder data instead of throwing
- Prevents app crashes from failed data fetching
- 30-second timeout on all requests

### 4. `/src/app/wallet/components/WalletBalance.tsx`
**Changes:**
- Fixed "Payment already verified" handling (400 error treated as success)
- Added background balance refresh after success/failure
- Improved error detection and messaging
- Updated retry logic to stop on 4xx errors

## Error Messages Implemented

### Network Errors (Auto-retry):
- `"Unable to connect to server. Please check your internet connection."`
- `"Request timed out. Please try again."`
- `"Connection timed out. Server may be busy."`
- `"Server not found. Please try again later."`
- `"Connection refused. Server may be down."`

### HTTP Errors:
- `400`: "Bad request. Please check your input."
- `401`: "Session expired. Please log in again."
- `403`: "Access denied. You don't have permission."
- `404`: "Resource not found."
- `408`: "Request timeout. Please try again."
- `429`: "Too many requests. Please wait a moment."
- `500`: "Server error. Please try again later."
- `502`: "Server unavailable. Please try again later."
- `503`: "Service unavailable. Server may be down."
- `504`: "Gateway timeout. Please try again later."

## Usage Examples

### Basic API Call with Retry:
```typescript
import { apiCallWithRetry } from "@/lib/networkErrorHandler";

const fetchData = async () => {
  const response = await apiCallWithRetry(
    () => axios.get('/api/data'),
    {
      showToast: true,
      shouldRetry: true,
      maxRetries: 3,
      retryDelay: 1000,
    }
  );
  
  if (response) {
    // Handle success
  }
};
```

### Handle Network Error Directly:
```typescript
import { handleNetworkError } from "@/lib/networkErrorHandler";

try {
  const response = await axios.get('/api/data');
} catch (error) {
  const { message, shouldRetry, isRetryable } = handleNetworkError(error, {
    showToast: true,
    customMessage: "Custom error message"
  });
  
  if (isRetryable && shouldRetry) {
    // Retry logic
  }
}
```

### Create Axios Instance with Interceptors:
```typescript
import { createAxiosInstance } from "@/lib/networkErrorHandler";

const api = createAxiosInstance({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 30000,
});

// All requests through this instance will have automatic retry
```

## Benefits

1. **Better UX**: Users see clear, actionable error messages
2. **Automatic Recovery**: Network issues auto-retry without user action
3. **No Spam**: Toast notifications are rate-limited and context-aware
4. **Graceful Degradation**: App continues to work even with poor connectivity
5. **Centralized Logic**: All error handling in one place, easy to maintain
6. **Developer Friendly**: Detailed console logging for debugging

## Next Steps

To extend this to other parts of the app:

1. Import the error handler in other components:
   ```typescript
   import { handleNetworkError, apiCallWithRetry } from "@/lib/networkErrorHandler";
   ```

2. Wrap existing axios calls with `apiCallWithRetry()`

3. For critical operations (payments), set `shouldRetry: false`

4. For background data fetching, set `showToast: false` to avoid annoying users

## Browser Console Logging

The handler logs detailed error information:
```
[Network Error] {
  message: "Network Error",
  code: "ECONNABORTED",
  status: undefined,
  url: "https://api.example.com/data",
  timestamp: "2024-01-15T10:30:00.000Z"
}
```

This helps developers debug issues during development and production.
