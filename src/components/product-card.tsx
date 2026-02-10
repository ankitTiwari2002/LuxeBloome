'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/types';
import { ReviewStars } from './review-stars';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
    const image = PlaceHolderImages.find(p => p.id === product.images[0]);
    const { addToCart } = useCart();
    const { toast } = useToast();

    const handleAddToCart = () => {
        addToCart(product);
        toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart.`,
        });
    }

  return (
    <Card className="group overflow-hidden flex flex-col h-full shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.id}`} className="block">
          {image && 
            <Image
                src={image.imageUrl}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-auto object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={image.imageHint}
            />
          }
        </Link>
        {product.compareAtPrice && (
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
            Sale
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`}>
          <CardTitle className="text-lg font-semibold font-headline tracking-normal hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        <div className="flex items-center mt-2">
            <ReviewStars rating={product.rating} />
            <span className="text-xs text-muted-foreground ml-2">({product.reviewCount} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-baseline gap-2">
            <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
            {product.compareAtPrice && (
                <p className="text-sm text-muted-foreground line-through">${product.compareAtPrice.toFixed(2)}</p>
            )}
        </div>
        <Button size="sm" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
