import React from "react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full lg:w-[880px] text-cozy-100 px-4 lg:px-0 min-h-[calc(100vh-(124px+137px+128px))] mx-auto mt-[60px] md:mt-[124px]">
      {children}
    </main>
  );
}
