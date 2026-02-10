import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  getProductById,
  getReviewsByProductId,
  products,
} from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ReviewStars } from '@/components/review-stars';
import { TrustBadges } from '@/components/trust-badges';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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

          <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>

          {product.variants && (
            <div className="mt-6">
              <Label className="text-base font-medium">{product.variants[0].name}</Label>
              <RadioGroup defaultValue={product.variants[0].options[0]} className="mt-2 flex gap-4">
                {product.variants[0].options.map(option => (
                  <div key={option} className="flex items-center">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="ml-2 cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          <div className="mt-6 p-4 rounded-lg bg-secondary">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="subscription" className="font-bold text-lg text-primary">Subscribe & Save 15%</Label>
                <p className="text-sm text-muted-foreground">Auto-delivery every month</p>
              </div>
              <Switch id="subscription" />
            </div>
          </div>
          
          <div className="mt-6">
            <Button size="lg" className="w-full text-lg h-12">Add to Cart</Button>
          </div>
          
          <TrustBadges />

          <Accordion type="single" collapsible className="w-full mt-6">
            <AccordionItem value="item-1">
              <AccordionTrigger>Benefits</AccordionTrigger>
              <AccordionContent>
                Brightens, hydrates, and evens skin tone.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How to Use</AccordionTrigger>
              <AccordionContent>
                Apply 2-3 drops to clean skin morning and night.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent>
                Free shipping on orders over $50. 30-day money-back guarantee.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
