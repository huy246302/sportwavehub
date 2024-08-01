// src/interfaces/blog.ts

export interface Author {
    id: string;
    name: string;
    email: string;
  }
  
  export interface BlogPost {
    id: string;
    title: string;
    content: string;
    img?: string;
    created_at: string;
    author_id: Author;
    category_id: Category;
    subcategory_id: SubCategory;
    // tags: Tag[];
  }
  
  export interface Category {
    id: string;
    name: string;
  }
  
  export interface SubCategory {
    id: string;
    name: string;
    categoryId: string;
  }
  
  export interface Tag {
    id: string;
    name: string;
  }
  