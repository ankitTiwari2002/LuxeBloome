import { Product } from './types';

type ApiProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

function mapApiProductToProduct(apiProduct: ApiProduct): Product {
  return {
    id: String(apiProduct.id),
    name: apiProduct.title,
    price: apiProduct.price,
    description: apiProduct.description,
    category: apiProduct.category,
    images: [apiProduct.image],
    rating: apiProduct.rating.rate,
    reviewCount: apiProduct.rating.count,
    tags: apiProduct.category.split(' '),
  };
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) {
      console.error('Failed to fetch products');
      return [];
    }
    const apiProducts: ApiProduct[] = await res.json();
    return apiProducts.map(mapApiProductToProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
      return undefined;
    }
    const apiProduct: ApiProduct | null = await res.json();
    if (!apiProduct) return undefined;

    return mapApiProductToProduct(apiProduct);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return undefined;
  }
}
