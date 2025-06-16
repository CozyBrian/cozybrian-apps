import PageLoader from '@/components/layout/PageLoader';
import { authClient } from '@/lib/auth';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute("/_main")({
  beforeLoad: async ({ location }) => {
    const session  = await authClient.getSession();
    if (!session.data?.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  pendingComponent: PageLoader,
  component: MainLayout,
});

function MainLayout() {
  return (
    <div className="flex flex-row w-screen h-screen overflow-clip scrollbar-none">
      <Outlet />
    </div>
  );
}
