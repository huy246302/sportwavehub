'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';
import Link from 'next/link';
import type { BlogPost } from '@/interfaces/blog'; // Type-only import

const supabase = createClient();

const Blogs = () => {
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<BlogPost[]>([]);
  const [showMore, setShowMore] = useState(true);

  const initialCount = 6;
  const incrementCount = 3;

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
          const posts = data.slice(1);
          setBlogPosts(posts);
          setVisiblePosts(posts.slice(0, initialCount));
        }
      } catch (error) {
        console.error('Error fetching blog posts:', (error as Error).message);
      }
    }

    fetchBlogPosts();
  }, []);

  const handleShowMore = () => {
    const nextVisiblePosts = blogPosts.slice(0, visiblePosts.length + incrementCount);
    setVisiblePosts(nextVisiblePosts);
    if (nextVisiblePosts.length >= blogPosts.length) {
      setShowMore(false);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Newest Blog</h1>
      {featuredPost && (
        <Link href={`/blogs/${featuredPost.id}`}>
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg shadow-md p-6 mb-8 transition-transform transform hover:-translate-y-1 hover:shadow-lg cursor-pointer">
            {featuredPost.img && <img src={featuredPost.img} alt={featuredPost.title} className="rounded-lg mb-4 w-full h-60 object-cover" />}
            <h2 className="text-3xl font-semibold mb-2 truncate">{featuredPost.title}</h2>
            <p className="text-gray-700 mb-4 truncate" dangerouslySetInnerHTML={{ __html: featuredPost.content.substring(0, 300) + '...' }}></p>
            <p className="text-sm text-gray-500">{new Date(featuredPost.created_at).toLocaleDateString()}</p>
          </div>
        </Link>
      )}
      <h1 className="text-4xl font-bold mb-8 text-center">All Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePosts.map((post) => (
          <Link href={`/blogs/${post.id}`} key={post.id}>
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-lg cursor-pointer max-h-[600px]">
              {post.img && <img src={post.img} alt={post.title} className="rounded-lg mb-4 w-full h-60 object-cover" style={{ aspectRatio: '1 / 1' }} />}
              <div className="flex-1 flex flex-col">
                <h2 className="text-xl font-semibold mb-2 overflow-hidden" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>{post.title}</h2>
                <p className="text-sm text-gray-500 mb-4">{new Date(post.created_at).toLocaleDateString()}</p>
                <p className="text-gray-700 flex-1 overflow-hidden" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }} dangerouslySetInnerHTML={{ __html: post.content.substring(0, 300) + '...' }}></p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {showMore && (
        <div className="text-center mt-8">
          <button 
            onClick={handleShowMore} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;
