import { InputOTP, InputOTPGroup, InputOTPSlot } from "@cozy/ui";
import { OTPInput, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import type React from "react";

export function OTPInputField({
  ...props
}: Omit<React.ComponentProps<typeof OTPInput>, "render" | "maxLength"> & {
  containerClassName?: string;
}) {
  return (
    <InputOTP {...props} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}
