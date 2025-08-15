import React from "react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full lg:w-[880px] text-cozy-100 px-4 lg:px-0 lg:min-h-[calc(100vh-(128px+137px+80px))] mx-auto mt-[68px] md:mt-[128px]">
      {children}
    </main>
  );
}
