import './index.css'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import AuthProvider, { useAuth, type IAuthContext } from './providers/auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a new router instance
const router = createRouter({ 
  routeTree,
  context: {
    auth: null as unknown as IAuthContext,
  }
})

const queryClient = new QueryClient();

function InnerApp() {
  const auth = useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ auth }} />
    </QueryClientProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
