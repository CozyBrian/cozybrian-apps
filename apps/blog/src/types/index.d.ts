declare module "@prisma/nextjs-monorepo-workaround-plugin" {
  export class PrismaPlugin {
    constructor();
  }
}

// mdx.d.ts
declare module "*.mdx" {
  import { MDXProps } from "mdx/types";
  import { ComponentType } from "react";

  export const metadata: Record<
    | "title"
    | "description"
    | "date"
    | "tags"
    | "slug"
    | "image"
    | "author"
    | ({} & string),
    string
  >;
  const MDXComponent: ComponentType<MDXProps>;
  export default MDXComponent;
}
