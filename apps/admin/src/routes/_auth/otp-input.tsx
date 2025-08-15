import { Button, Label, toast } from "@cozy/ui";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Formik, Form } from "formik";
import { ChevronLeft } from "lucide-react";
import * as Yup from "yup";

import { OTPInputField } from "@/components/misc/otp-input";
import { authClient } from "@/lib/auth";

const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

export const Route = createFileRoute("/_auth/otp-input")({
  validateSearch: (search) => {
    return {
      email: search.email ? String(search.email) : undefined,
    };
  },
  beforeLoad: ({ search }) => {
    if (!search.email) {
      return redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { email } = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="relative sm:mx-auto sm:w-full sm:max-w-sm">
          <button
            onClick={() => navigate({ to: "/login" })}
            className="absolute -top-8 flex flex-row items-center group text-primary hover:text-primary/90 transition-colors"
          >
            <ChevronLeft size={22} className="group-hover:-translate-x-1 transition" /> Back
          </button>
          <h2 className="text-xl font-semibold text-card-foreground">Enter your OTP</h2>
          <Formik
            validateOnMount
            initialValues={{ otp: "" }}
            validationSchema={otpSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);

              const { data, error } = await authClient.signIn.emailOtp({
                email: email,
                otp: values.otp,
              });

              if (error) {
                toast.error(error.message, {
                  description: `error code: ${error.code}. Please try again.`,
                });
              }

              if (data) {
                navigate({ to: "/" });
              }
              setSubmitting(false);
            }}
          >
            {({ values, setFieldValue, errors, touched, isSubmitting, isValid }) => (
              <Form className="mt-2">
                <Label htmlFor="otp" className="font-medium text-foreground mb-2">
                  One-Time Password
                </Label>
                <OTPInputField
                  name="otp"
                  value={values.otp}
                  onChange={(value) => setFieldValue("otp", value)}
                />
                {errors.otp && touched.otp && (
                  <div className="text-red-800 text-xs mt-1">{errors.otp}</div>
                )}
                <Button
                  type="submit"
                  disabled={!isValid}
                  isLoading={isSubmitting}
                  className="mt-4 w-full"
                >
                  Sign in
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
