import {
  getMDXData,
  getPosts,
  getMDXComponents,
  TableOfContents,
} from "@cozy/blog";
import { format } from "date-fns";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { ViewTransition } from "react";

type pageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {
  const { slug } = await params;
  const mdxData = await getMDXData(slug);

  if (!mdxData) {
    return {
      title: "404",
      description: "The requested post could not be found.",
    };
  }

  const { metadata } = mdxData;

  return {
    title: String(metadata?.title ?? slug),
    description: String(metadata?.summary ?? ""),
    openGraph: {
      title: String(metadata?.title ?? slug),
      description: String(metadata?.summary ?? ""),
      type: "article",
      url: `https://www.cozybrian.com/blog/${slug}`,
      authors: ["Brian Newton <https://www.cozybrian.com>"],
      images: [
        {
          url: `/api/og/${slug}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Page({ params }: pageProps) {
  const { slug } = await params;
  const mdxFile = await getMDXData(slug);
  if (!mdxFile) {
    return notFound();
  }
  const components = getMDXComponents();
  const { metadata, default: Content, headings } = mdxFile;

  return (
    <ViewTransition>
      <div>
        <ViewTransition name={slug}>
          <h1 className="text-3xl font-bold mb-1">{metadata.title}</h1>
        </ViewTransition>
        <p className="text-sm text-cozy-500">
          {format(new Date(metadata.date), "dd MMM yyyy")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-5">
          <div className="col-span-1 md:col-span-3">
            <Content components={components} />
          </div>
          <aside className="hidden md:block col-span-1">
            <TableOfContents data={headings} />
          </aside>
        </div>
      </div>
    </ViewTransition>
  );
}
