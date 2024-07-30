// pages/blogs/index.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient();

interface BlogPost {
  id: string;
  title: string;
  content: string;
  img?: string;
  created_at: string;
}

const Blogs = () => {
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) {
          throw error as PostgrestError;
        }

        if (data && data.length > 0) {
          setFeaturedPost(data[0]);
          setBlogPosts(data.slice(1));
        }
      } catch (error) {
        console.error('Error fetching blog posts:', (error as Error).message);
      }
    }

    fetchBlogPosts();
  }, []);

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Newest Blog</h1>
      {featuredPost && (
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg shadow-md p-6 mb-8">
          {featuredPost.img && <img src={featuredPost.img} alt={featuredPost.title} className="rounded-lg mb-4 w-full h-60 object-cover" />}
          <h2 className="text-3xl font-semibold mb-2">{featuredPost.title}</h2>
          <p className="text-gray-700 mb-4">{featuredPost.content.substring(0, 150)}...</p>
          <p className="text-sm text-gray-500 mb-4">{new Date(featuredPost.created_at).toLocaleDateString()}</p>
          <Link href={`/blogs/${featuredPost.id}`} className="text-blue-600 font-medium hover:underline">
            Read More
          </Link>
        </div>
      )}
      <h1 className="text-4xl font-bold mb-8 text-center">All Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:-translate-y-1 hover:shadow-lg">
            {post.img && <img src={post.img} alt={post.title} className="rounded-lg mb-4 w-full h-60 object-cover" style={{ aspectRatio: '1 / 1' }} />}
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-4">{new Date(post.created_at).toLocaleDateString()}</p>
            <Link href={`/blogs/${post.id}`} className="text-blue-600 font-medium hover:underline">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
