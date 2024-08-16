import { notFound } from 'next/navigation';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import { createClient } from '../../../utils/supabase/client';
import { BlogPost } from '../../../interfaces/blog';

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

// Initialize Supabase client
const supabase = createClient();

export async function generateStaticParams() {
  const { data: posts } = await supabase.from('blog_posts').select('blog_id');

  return posts?.map((post) => ({
    id: post.blog_id,
  })) || [];
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { data: blogPost } = await supabase
    .from('blog_posts')
    .select('title')
    .eq('blog_id', params.id)
    .single();

  if (!blogPost) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: blogPost.title,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = params;

  const { data: blogPost, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      authors (name),
      categories (name),
      sub_categories!blog_posts_sub_category_id_fkey (name),
      tags (name)
    `)
    .eq('blog_id', id)
    .single();

  if (error || !blogPost) {
    notFound(); // Render 404 page if blog post not found
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-semibold mb-4">{blogPost.title}</h1>
        <div className="flex justify-between items-center mb-4">
          <div>
            {blogPost.authors && (
              <p className="text-gray-700">
                <strong>Author:</strong> {blogPost.authors.name}
              </p>
            )}
            {blogPost.categories && (
              <p className="text-gray-700">
                <strong>Category:</strong> {blogPost.categories.name}
              </p>
            )}
            {blogPost.sub_categories && (
              <p className="text-gray-700">
                <strong>Subcategory:</strong> {blogPost.sub_categories.name}
              </p>
            )}
            {blogPost.tags && (
              <p className="text-gray-700">
                <strong>Tag:</strong> {blogPost.tags.name}
              </p>
            )}
          </div>
          <p className="text-sm text-gray-500">
            {new Date(blogPost.created_at).toLocaleDateString()}
          </p>
        </div>
        {blogPost.img && (
          <Image
            src={blogPost.img}
            alt={blogPost.title}
            className="rounded-lg mb-4 mx-auto"
            width={770}
            height={400}
            layout="responsive"
            priority
          />
        )}
        <div
          className="text-gray-700 mb-4"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blogPost.content),
          }}
        />
      </div>
    </div>
  );
}
