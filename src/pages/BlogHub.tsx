import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CTABand from "@/components/shared/CTABand";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const BlogHub = () => {
  const { data: posts } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data } = await supabase.from("blog_posts").select("*").order("published_at", { ascending: false });
      return data || [];
    },
  });

  return (
    <Layout>
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">Blog</h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">Tips, inspiration, and updates from Simply Delicious Catering.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          {posts && posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card key={post.id} className="group transition-shadow hover:shadow-lg">
                  {post.featured_image && (
                    <img src={post.featured_image} alt={post.title} className="aspect-video w-full rounded-t-lg object-cover" loading="lazy" />
                  )}
                  <CardContent className="p-6">
                    {post.category && <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">{post.category}</span>}
                    <h3 className="mb-2 font-display text-lg font-semibold">{post.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="text-sm font-medium text-primary hover:underline">
                      Read more →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Blog posts coming soon! Stay tuned for catering tips and event inspiration.</p>
          )}
        </div>
      </section>

      <CTABand />
    </Layout>
  );
};

export default BlogHub;
