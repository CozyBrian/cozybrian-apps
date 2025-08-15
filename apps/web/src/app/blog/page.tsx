import { redirect } from "next/navigation";

import { CONSTANTS } from "@/constant";

function Page() {
  return redirect(CONSTANTS.blog);
}

export default Page;
