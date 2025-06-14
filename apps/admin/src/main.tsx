import './index.css'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthQueryProvider } from '@daveyplate/better-auth-tanstack';
// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { authClient } from './lib/auth'

type SessionData = ReturnType<typeof authClient["useSession"]>

// Create a new router instance
const router = createRouter({ 
  routeTree,
  context: {
    session: null as unknown as SessionData,
  }
})

const queryClient = new QueryClient();

function InnerApp() {
  const session = authClient.useSession();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ session }} />
    </QueryClientProvider>
  );
}

function App() {
  return (
    <AuthQueryProvider>
      <InnerApp />
    </AuthQueryProvider>
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
