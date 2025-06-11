import { createFileRoute } from '@tanstack/react-router'
import { Button, Input, Label } from '@cozy/ui'

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-xl font-semibold text-foreground">
            Log in (hello)
          </h2>
          <form action="#" method="post" className="mt-6">
            <Label htmlFor="email" className="font-medium text-foreground">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="john@company.com"
              className="mt-2"
            />
            <Button type="submit" className="mt-4 w-full">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

