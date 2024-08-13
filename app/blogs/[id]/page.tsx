'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '../../../utils/supabase/client'; // Adjust the import path as necessary
import DOMPurify from 'dompurify';

// TypeScript interfaces for the expected data structure
interface Author {
  name: string;
}

interface Category {
  name: string;
}

interface SubCategory {
  name: string;
}

interface Tag {
  name: string;
}

interface BlogPost {
  title: string;
  content: string;
  created_at: string;
  img: string;
  blog_id: string;
  author_id: string;
  category_id: string;
  sub_category_id: string;
  tag_id: string;
  authors: Author;
  categories: Category;
  sub_categories: SubCategory;
  tags: Tag;
}

// Initialize the Supabase client
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
            sub_categories!blog_posts_sub_category_id_fkey (name),
            tags (name)
          `)
          .eq('blog_id', id) // Use 'blog_id' for filtering
          .single(); // Fetch a single record

        if (error) {
          throw error;
        }

        setBlogPost(data as unknown as BlogPost); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching blog post:', (error as Error).message);
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
            {blogPost.tags && <p className="text-gray-700"><strong>Tag:</strong> {blogPost.tags.name}</p>}
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
