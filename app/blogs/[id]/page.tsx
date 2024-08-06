'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '../../../utils/supabase/client'; // Adjust the import path as necessary
import { PostgrestError } from '@supabase/supabase-js';
import DOMPurify from 'dompurify';
import type { BlogPost } from '@/interfaces/blog';  // Adjust the import path as necessary

const supabase = createClient();

const BlogPost = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogPost() {
      if (!id) return; // Ensure ID is present

      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            *,
            authors (name),
            categories (name),
            sub_categories!blog_posts_sub_category_id_fkey(name) // Specify the exact relationship name here
          `)
          .eq('blog_id', id) // Use 'blog_id' for filtering
          .single(); // Fetch a single record

        if (error) {
          throw error as PostgrestError;
        }

        setBlogPost(data as unknown as BlogPost); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching blog post:', (error as PostgrestError).message);
        setError('Failed to load blog post. Please try again later.'); // Set error message
      }
    }

    fetchBlogPost();
  }, [id]);

  if (error) {
    return <div className="text-center mt-8">{error}</div>; // Display error message
  }

  if (!blogPost) {
    return <div className="text-center mt-8">Loading...</div>; // Display loading state
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-semibold mb-4">{blogPost.title}</h1>
        <div className="flex justify-between items-center mb-4">
          <div>
            {blogPost.authors && <p className="text-gray-700"><strong>Author:</strong> {blogPost.authors.name}</p>}
            {blogPost.categories && <p className="text-gray-700"><strong>Category:</strong> {blogPost.categories.name}</p>}
            {blogPost.sub_categories && <p className="text-gray-700"><strong>Subcategory:</strong> {blogPost.sub_categories.name}</p>}
          </div>
          <p className="text-sm text-gray-500">{new Date(blogPost.created_at).toLocaleDateString()}</p>
        </div>
        {blogPost.img && <img src={blogPost.img} alt={blogPost.title} className="rounded-lg mb-4 mx-auto" style={{ display: 'block' }} />}
        <div
          className="text-gray-700 mb-4"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogPost.content) }}
        />
      </div>
    </div>
  );
};

export default BlogPost;
