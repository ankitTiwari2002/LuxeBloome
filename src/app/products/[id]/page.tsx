import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  getProductById,
  getAllProducts,
} from '@/lib/api';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ReviewStars } from '@/components/review-stars';
import { ProductPurchaseForm } from '@/components/product-purchase-form';

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage(props: { params: { id: string } }) {
  const { params } = props;
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }
  
  const productImages = product.images;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image Gallery */}
        <Carousel className="w-full">
          <CarouselContent>
            {productImages.map((image, index) => (
              <CarouselItem key={index}>
                <Card className="overflow-hidden">
                  <Image
                    src={image}
                    alt={`${product.name} - image ${index + 1}`}
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
           <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
           <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        </Carousel>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">{product.name}</h1>
          
          <div className="mt-4 flex items-center gap-4">
            <ReviewStars rating={product.rating} />
            <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-xl line-through text-muted-foreground">${product.compareAtPrice.toFixed(2)}</span>
            )}
          </div>

          <ProductPurchaseForm product={product} />

        </div>
      </div>
    </div>
  );
}
