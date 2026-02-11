'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { Product } from '@/lib/types';
import { getAllProducts } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAndFilterProducts() {
      if (!query) {
        setFilteredProducts([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const allProducts = await getAllProducts();
      const lowercasedQuery = query.toLowerCase();
      const results = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercasedQuery) ||
          product.description.toLowerCase().includes(lowercasedQuery) ||
          product.category.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(results);
      setIsLoading(false);
    }

    fetchAndFilterProducts();
  }, [query]);

  if (isLoading) {
    return (
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-[400px] w-full" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          Search Results {query && `for "${query}"`}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No products found matching your search.</p>
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Suspense>
        <SearchResults />
      </Suspense>
    </div>
  );
}
