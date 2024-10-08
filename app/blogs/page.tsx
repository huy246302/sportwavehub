'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/interfaces/blog';
import Head from 'next/head';

const supabase = createClient();

const Blogs = () => {
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<BlogPost[]>([]);
  const [showMore, setShowMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initialCount = 6;
  const incrementCount = 3;

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            *,
            authors (
              name
            ),
            categories (
              name
            ),
            sub_categories!blog_posts_sub_category_id_fkey (
              name
            ),
            tags (
              name
            )
          `)
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
        setError('Failed to load blog posts. Please try again later.');
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
    <>
      <Head>
        <title>Blog - SportWaveHub</title>
        <meta name="description" content="Read the latest blog posts on SportWaveHub." />
        <meta property="og:title" content="Blog - SportWaveHub" />
        <meta property="og:description" content="Read the latest blog posts on SportWaveHub." />
      </Head>
      <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Newest Blog</h1>
        {error && <div className="text-center mt-8 text-red-500">{error}</div>}
        {featuredPost ? (
          <Link href={`/blogs/${featuredPost.blog_id}`}>
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg shadow-md p-6 mb-8 transition-transform transform hover:-translate-y-1 hover:shadow-lg cursor-pointer">
              {featuredPost.img && (
                <div className="relative w-full h-60">
                  <Image
                    src={featuredPost.img}
                    alt={featuredPost.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    placeholder="blur"
                    blurDataURL="/path/to/low-quality-placeholder.jpg" // Placeholder image
                  />
                </div>
              )}
              <h2 className="text-3xl font-semibold mb-2 truncate">{featuredPost.title}</h2>
              <p className="text-gray-700 mb-4 truncate" dangerouslySetInnerHTML={{ __html: featuredPost.content.substring(0, 300) + '...' }}></p>
              <p className="text-sm text-gray-500">{new Date(featuredPost.created_at).toLocaleDateString()}</p>
              {featuredPost.categories && <p className="text-sm text-gray-500">Category: {featuredPost.categories.name}</p>}
              {featuredPost.sub_categories && <p className="text-sm text-gray-500">Subcategory: {featuredPost.sub_categories.name}</p>}
            </div>
          </Link>
        ) : (
          <div className="text-center mt-8">Loading...</div>
        )}
        <h1 className="text-4xl font-bold mb-8 text-center">All Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePosts.map((post) => (
            <Link href={`/blogs/${post.blog_id}`} key={post.blog_id}>
              <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-lg cursor-pointer max-h-[600px] blog-post-card">
                {post.img && (
                  <div className="relative w-full h-60">
                    <Image
                      src={post.img}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                      placeholder="blur"
                      blurDataURL="/path/to/low-quality-placeholder.jpg" // Placeholder image
                    />
                  </div>
                )}
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{new Date(post.created_at).toLocaleDateString()}</p>
                <p
                  className="text-gray-700 flex-1 description mb-2"
                  dangerouslySetInnerHTML={{
                    __html: post.content.substring(0, 200) + "...",
                  }}
                ></p>
                {post.categories && (
                  <p className="text-sm text-gray-500">
                    Category: {post.categories.name}
                  </p>
                )}
                {post.sub_categories && (
                  <p className="text-sm text-gray-500">
                    Subcategory: {post.sub_categories.name}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
        {showMore && (
          <div className="text-center mt-8">
            <button 
              onClick={handleShowMore} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
              aria-label="Show more blog posts"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Blogs;
