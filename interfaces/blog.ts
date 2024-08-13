export interface Author {
  author_id: string;
  name: string;
  email: string;
}

export interface BlogPost {
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


export interface Category {
  category_id: string;
  name: string;
}

export interface SubCategory {
  sub_category_id: string;
  name: string;
  category_id: string;
}

export interface Tag {
  tag_id: string;
  name: string;
}
