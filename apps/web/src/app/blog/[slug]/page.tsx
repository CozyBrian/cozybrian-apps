import { format } from "date-fns";
import { notFound } from "next/navigation";
import { unstable_ViewTransition as ViewTransition } from "react";

import { getMDXData, getPosts } from "@/lib/posts";

import { getMDXComponents } from "../../../../mdx-components";
type pageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: pageProps) {
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
    description: String(metadata?.description ?? ""),
    // openGraph: {
    //   images: [
    //     {
    //       url: `/api/og/${slug}`,
    //       width: 1200,
    //       height: 630,
    //     },
    //   ],
    // },
  };
}

export default async function Page({ params }: pageProps) {
  const { slug } = await params;
  const mdxFile = await getMDXData(slug);
  if (!mdxFile) {
    return notFound();
  }
  const components = getMDXComponents();
  const { metadata, default: Content } = mdxFile;

  return (
    <div>
      <ViewTransition name={slug}>
        <h1 className="text-3xl font-bold mb-1">{metadata.title}</h1>
      </ViewTransition>
      <p className="text-sm text-cozy-500">
        {format(new Date(metadata.date), "dd MMM yyyy")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 mt-5">
        <div className="col-span-1 md:col-span-3">
          <Content components={components} />
        </div>
      </div>
    </div>
  );
}
