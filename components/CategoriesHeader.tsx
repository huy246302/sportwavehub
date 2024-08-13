import { useEffect, useState, forwardRef } from 'react';
import { createClient } from '../utils/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';
import Link from 'next/link';
import type { Category } from '@/interfaces/blog'; // Type-only import

const supabase = createClient();

const CategoriesHeader = forwardRef<HTMLDivElement>((_, ref) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true });
        if (error) {
          throw error as PostgrestError;
        }
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', (error as Error).message);
      }
    }

    fetchCategories();
  }, []);

  return (
    <header ref={ref} className="bg-gray-100 py-2 md:py-4 shadow-md">
      <div className="container mx-auto px-2 md:px-4 flex flex-wrap justify-center space-x-2 md:space-x-4 overflow-x-auto">
        {categories.map((category) => (
          <Link 
            className="text-sm md:text-lg font-medium text-gray-700 hover:text-blue-500 whitespace-nowrap" 
            key={category.category_id} 
            href={`/categories/${category.category_id}`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </header>
  );
});

CategoriesHeader.displayName = 'CategoriesHeader';

export default CategoriesHeader;
