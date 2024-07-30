'use client';

// pages/blog_post.tsx
import { useEffect, useState } from 'react';
import { createClient } from '../utils/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const supabase = createClient();

interface BlogPost {
  id: string;
  title: string;
  content: string;
  img?: string;
  created_at: string;
}

const Carousel = () => {
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
        setBlogPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', (error as Error).message);
      }
    }

    fetchBlogPosts();
  }, []);

  // Configuration for the carousel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (  
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Blog Posts</h1>
      <Slider {...carouselSettings}>
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-post-card">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-2">{post.content}</p>
            {post.img && <img src={post.img} alt={post.title} className="rounded-lg mb-2 blog-post-image" />}
            <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
