import { useEffect, useState, forwardRef } from 'react';
import { createClient } from '../utils/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient();

interface Category {
  id: string;
  name: string;
}

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
    <header ref={ref} className="bg-gray-100 py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-center space-x-4">
        {categories.map((category) => (
          <Link className="text-lg font-medium text-gray-700 hover:text-blue-500" key={category.id} href={`/categories/${category.id}`}>
            {category.name}
          </Link>
        ))}
      </div>
    </header>
  );
});

CategoriesHeader.displayName = 'CategoriesHeader';

export default CategoriesHeader;
