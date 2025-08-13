import Image from "next/image";
import React from "react";

import { Favicon } from "@/assets/images";

const Footer = () => {
  return (
    <footer className="w-full lg:w-[880px] px-4 lg:px-0 mx-auto flex flex-col gap-8 border-t border-cozy-950 py-4 mt-32">
      <p className="text-xs text-cozy-300 font-montserrat">
        Feel free to reach out if you’d like to work together or just geek out
        over cool tech. <br />{" "}
        <a
          href="mailto:brian@cozybrian.dev"
          className="hover:text-cozy-200 transition-colors"
        >
          brian[at]cozybrian.dev :)
        </a>
      </p>
      <div className="flex flex-row items-center justify-between">
        <p className="font-bold text-sm text-cozy-300">
          © {new Date().getFullYear()} Brian Newton. All rights reserved.
        </p>
        <div className="w-fit flex flex-row items-center h-10">
          <Image
            src={Favicon}
            alt="Brian Newton"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
