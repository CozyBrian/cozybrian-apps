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
export type MDXFileMeta = {
  title: string;
  summary: string;
  date: string;
  tags?: string[];
  slug?: string;
  image?: string;
  draft?: boolean;
  [key: string]: string | string[] | undefined;
};

export type MDXFile = {
  default: React.ComponentType<MDXProps>;
  metadata: MDXFileMeta;
};

export type MDXHeader = {
  level: number;
  title: string;
  id: string;
};
