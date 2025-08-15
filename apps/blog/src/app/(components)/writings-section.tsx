import { AnimatedBackground } from "@cozy/ui";
import { format } from "date-fns";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

import { getPosts } from "@/lib/posts";

const WritingsSection = async () => {
  const posts = await getPosts();

  return (
    <section className="w-full flex flex-col gap-2.5">
      <h2 className="text-cozy-50 tracking-wide font-semibold">Writings</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-2 flex flex-col gap-1.5">
          <AnimatedBackground enableHover className="bg-cozy-950">
            {posts.map((post) => (
              <Link
                href={`/${post.slug}`}
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
      <p className="text-xs font-montserrat text-cozy-400">
        more coming soon...
      </p>
    </section>
  );
};

export default WritingsSection;
