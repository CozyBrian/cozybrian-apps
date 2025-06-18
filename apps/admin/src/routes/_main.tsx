import { authClient } from '@/lib/auth';
import PageLoader from '@/components/layout/PageLoader';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { SidebarProvider, SidebarTrigger } from '@cozy/ui';
import AppSidebar from '@/components/layout/AppSidebar';

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
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-row h-screen overflow-clip scrollbar-none">
        <SidebarTrigger />
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
