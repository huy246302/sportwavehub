'use client';

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
          .order('created_at', { ascending: false })
          .limit(8);  // Fetch only the 8 newest posts
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

  // Custom Arrows for Carousel Navigation
  const CustomPrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} custom-prev-arrow`}
        onClick={onClick}
        style={{ ...props.style, display: "block", left: "-15px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
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
        style={{ ...props.style, display: "block", right: "-15px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
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
    dotsClass: "slick-dots", // Use the default class or your custom one
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto mt-12 px-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">Blog Posts</h1>
      <Slider {...carouselSettings}>
        {blogPosts.map((post) => (
          <Link
            className="block p-4 blog-post-card cursor-pointer"
            key={post.blog_id}
            href={`/blogs/${post.blog_id}`}
            passHref
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              {post.img && (
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2" style={{ minHeight: '4.5rem' }}>
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
