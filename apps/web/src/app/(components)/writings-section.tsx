import { getPosts } from "@cozy/blog";
import { AnimatedBackground } from "@cozy/ui";
import { format } from "date-fns";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

const WritingsSection = async () => {
  const allPosts = await getPosts();
  const posts = allPosts.slice(0, 4);

  const hasMorePosts = allPosts.length > 4;
  return (
    <section className="w-full flex flex-col gap-2.5">
      <h2 className="text-cozy-50 tracking-wide font-semibold">Writings</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-2 flex flex-col gap-1.5">
          <AnimatedBackground enableHover className="bg-cozy-950">
            {posts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                data-id={`card-${post.slug}`}
                className="w-full flex text-sm"
              >
                <div className="flex flex-1 flex-row py-2.5 px-2 gap-2">
                  <div className="flex-1 flex flex-col gap-1">
                    <ViewTransition name={post.slug}>
                      <h3 className="font-medium text-cozy-100">
                        {post.title}
                      </h3>
                    </ViewTransition>
                    <p className="text-xs text-cozy-400">{post.summary}</p>
                  </div>
                  <small className="text-xs font-bold text-cozy-400/80 font-montserrat">
                    {format(new Date(post.date), "dd MMM")}
                  </small>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </div>
      {hasMorePosts && (
        <Link
          href={process.env.NEXT_PUBLIC_BLOG_URL || "http://localhost:3001"}
          className="text-sm font-medium text-cozy-300 hover:text-cozy-100 transition-colors"
        >
          View more
        </Link>
      )}
    </section>
  );
};

export default WritingsSection;
