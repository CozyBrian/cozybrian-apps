/* eslint-disable react-refresh/only-export-components */
import "./index.css";
import { AuthQueryProvider } from "@daveyplate/better-auth-tanstack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import { authClient } from "./lib/auth";
import { routeTree } from "./routeTree.gen";

type SessionData = ReturnType<(typeof authClient)["useSession"]>;

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    session: null as unknown as SessionData,
  },
});

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
