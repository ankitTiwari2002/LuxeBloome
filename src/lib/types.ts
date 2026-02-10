export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  tags: string[];
  category: string;
  variants?: { name: string; options: string[] }[];
};

export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
};

export type Bundle = {
  id: string;
  title: string;
  productIds: string[];
  price: number;
  originalPrice: number;
  image: string;
};

export interface CartItem extends Product {
  quantity: number;
}
