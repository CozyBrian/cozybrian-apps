import { MDXProps } from "mdx/types";

export type MDXFileMeta = {
  title: string;
  summary: string;
  date: string;
  tags?: string[];
  slug?: string;
  image?: string;
  draft?: boolean;
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
