import React from "react";

export const metadata = {
  title: {
    default: "Works",
    template: "%s | Brian Newton",
  },
  description: "A showcase of my work and projects.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
