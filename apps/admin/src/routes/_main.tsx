import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute("/_main")({
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: MainLayout,
});

function MainLayout() {
  return (
    <main className="flex flex-row w-screen h-screen overflow-clip scrollbar-none">
      <Outlet />
    </main>
  );
}
