import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  getProductById,
  getReviewsByProductId,
  products,
} from '@/lib/data';
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
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ProductPurchaseForm } from '@/components/product-purchase-form';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const reviews = getReviewsByProductId(params.id);
  const productImages = product.images.map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image Gallery */}
        <Carousel className="w-full">
          <CarouselContent>
            {productImages.map((image, index) => (
              image && <CarouselItem key={image.id}>
                <Card className="overflow-hidden">
                  <Image
                    src={image.imageUrl}
                    alt={`${product.name} - image ${index + 1}`}
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover aspect-square"
                    data-ai-hint={image.imageHint}
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

      {/* Reviews Section */}
      <div className="mt-12 md:mt-20">
        <h2 className="font-headline text-3xl font-bold text-center">Customer Reviews</h2>
        <Separator className="my-6" />
        <div className="space-y-8">
          {reviews.map(review => (
            <Card key={review.id} className="shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{review.author}</CardTitle>
                    <p className="text-sm font-bold text-primary pt-1">{review.title}</p>
                  </div>
                  <ReviewStars rating={review.rating} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">"{review.body}"</p>
                <p className="text-xs text-muted-foreground mt-4">{review.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
