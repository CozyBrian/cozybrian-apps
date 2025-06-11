import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { IAuthContext } from '../providers/auth';

interface MyRouterContext {
  auth: IAuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <main className='dark bg-background'>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </main>
  ),
});
