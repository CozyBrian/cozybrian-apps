import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { authClient } from '@/lib/auth';

type SessionData = ReturnType<typeof authClient["useSession"]>

interface MyRouterContext {
  session: SessionData;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <main className='dark bg-background'>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </main>
  ),
});
