'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '../../../utils/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';
import type { BlogPost } from '@/interfaces/blog';  // Adjust the import path as necessary

const supabase = createClient();

const BlogPost = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    async function fetchBlogPost() {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();
        if (error) {
          throw error as PostgrestError;
        }
        setBlogPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', (error as Error).message);
      }
    }

    fetchBlogPost();
  }, [id]);

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-semibold mb-4">{blogPost.title}</h1>
        {blogPost.img && <img src={blogPost.img} alt={blogPost.title} className="rounded-lg mb-4" />}
        <p className="text-gray-700 mb-4">{blogPost.content}</p>
        <p className="text-sm text-gray-500">{new Date(blogPost.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default BlogPost;
