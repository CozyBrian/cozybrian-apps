import Link from "next/link";
import React, { unstable_ViewTransition as ViewTransition } from "react";

const WorkSection = () => {
  return (
    <section className="w-full flex flex-col gap-2.5">
      <h2 className="text-cozy-50 tracking-wide font-semibold">Recent Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
        <Link
          href="/works/ghana-passport-tracking"
          className="flex flex-col gap-2 p-3 text-sm bg-cozy-950 hover:bg-cozy-900 transition-colors"
        >
          <ViewTransition name="passport-title">
            <h3 className="font-bold">Passport Tracking System for Ghana</h3>
          </ViewTransition>
          <p className="text-cozy-100">
            An integrated, end-to-end solution designed to ensure secure,
            efficient, and transparent delivery of passports to citizens across
            the country.
          </p>
        </Link>
      </div>
    </section>
  );
};

export default WorkSection;
