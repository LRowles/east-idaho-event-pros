import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import CTABand from "@/components/shared/CTABand";
import { supabase } from "@/integrations/supabase/client";

const BlogPost = () => {
  const { postSlug } = useParams<{ postSlug: string }>();

  const { data: post } = useQuery({
    queryKey: ["blog-post", postSlug],
    queryFn: async () => {
      const { data } = await supabase.from("blog_posts").select("*").eq("slug", postSlug).single();
      return data;
    },
  });

  useEffect(() => {
    if (!post) return;
    document.title = post.seo_title || `${post.title} | Simply Delicious Catering`;
    const desc = post.seo_description || post.excerpt;
    if (desc) document.querySelector('meta[name="description"]')?.setAttribute("content", desc);
  }, [post]);

  if (!post) return <Layout><div className="container py-20 text-center text-muted-foreground">Loading...</div></Layout>;

  return (
    <Layout>
      <article className="py-16">
        <div className="container max-w-3xl">
          {post.category && (
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">{post.category}</span>
          )}
          <h1 className="mb-4 font-display text-3xl font-bold md:text-4xl">{post.title}</h1>
          {post.published_at && (
            <p className="mb-8 text-sm text-muted-foreground">
              {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          )}
          {post.featured_image && (
            <img src={post.featured_image} alt={post.title} className="mb-8 max-h-[560px] w-full rounded-[18px] border object-cover shadow-card" loading="lazy" />
          )}
          <div className="prose max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: post.content || "" }} />
          <div className="mt-12">
            <Link to="/blog" className="text-sm font-medium text-primary hover:underline">← Back to Blog</Link>
          </div>
        </div>
      </article>
      <CTABand />
    </Layout>
  );
};

export default BlogPost;
