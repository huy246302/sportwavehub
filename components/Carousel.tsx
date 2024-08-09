'use client';

// pages/blog_post.tsx
import { useEffect, useState } from 'react';
import { createClient } from '../utils/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/globals.css';
import Link from 'next/link';
import type { BlogPost } from '@/interfaces/blog'; // Type-only import

const supabase = createClient();

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
  const CustomPrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} custom-prev-arrow`}
        onClick={onClick}
        style={{ ...props.style, display: "block", left: "-25px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
    );
  };
  
  const CustomNextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} custom-next-arrow`}
        onClick={onClick}
        style={{ ...props.style, display: "block", right: "-25px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    );
  };
  

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
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
      <h1 className="text-3xl font-semibold mb-4 text-center">Blog Posts</h1>
      <Slider {...carouselSettings}>
        {blogPosts.map((post) => (
          <Link className="p-4 blog-post-card cursor-pointer" key={post.blog_id} href={`/blogs/${post.blog_id}`} passHref>
            <div >
              {post.img && (
                <img
                  src={post.img}
                  alt={post.title}
                  className="rounded-lg mb-2 blog-post-image"
                />
              )}
              <h2 className="text-lg font-semibold mb-1">{post.title}</h2>
              <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
