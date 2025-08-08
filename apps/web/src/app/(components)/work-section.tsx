import Link from "next/link";
import React from "react";

const WorkSection = () => {
  return (
    <section className="w-full flex flex-col gap-2.5">
      <h2 className="text-cozy-50 tracking-wide">Recent Work</h2>
      <div className="grid grid-cols-3 gap-2.5">
        <Link
          href="/work/passport-project"
          className="flex flex-col gap-2 p-3 text-sm bg-cozy-950 hover:bg-cozy-900 transition-colors"
        >
          <h3 className="font-bold">Passport Tracking System for Ghana</h3>
          <p className="text-cozy-50">
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
