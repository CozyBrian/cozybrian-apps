import { createFileRoute } from '@tanstack/react-router'
import { Button, Input, Label, toast } from '@cozy/ui'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { authClient } from '@/lib/auth'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
})

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-xl font-semibold text-card-foreground">
            Log in
          </h2>
          <Formik
            validateOnMount
            initialValues={{ email: '' }}
            validationSchema={loginSchema}
            onSubmit={async (params, { setSubmitting }) => {
              setSubmitting(true)

              const { data, error } = await authClient.emailOtp.sendVerificationOtp({
                email: params.email,
                type: 'sign-in',
              });

              if (error) {
                toast.error(error.message, {
                  description: `error code: ${error.code}. Please try again.`,
                });
              }

              if (data) {
                toast.success('Verification email sent! Please check your inbox.');
                navigate({ to: '/otp-input', search: { email: params.email } });
              }
              setSubmitting(false);
            }}
          >
            {({ errors, touched, isSubmitting, isValid }) => (
              <Form className="mt-2">
                <Label htmlFor="email" className="font-light text-foreground">
                  Email
                </Label>
                <Field
                  as={Input}
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="john@company.com"
                  className="mt-2"
                />
                {errors.email && touched.email && (
                  <div className="text-red-800 text-xs mt-1">{errors.email}</div>
                )}
                <Button 
                  type="submit"
                  disabled={!isValid}
                  isLoading={isSubmitting} 
                  className="mt-4 w-full"
                >
                  Continue
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

