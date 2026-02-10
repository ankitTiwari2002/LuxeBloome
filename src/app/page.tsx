import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowRight,
  ChevronRight,
  Mail,
  Truck,
  Heart,
  Sparkles,
  Star,
} from 'lucide-react';

import { bundles, products, reviews } from '@/lib/data';
import { getProductById } from '@/lib/data';
import { Product } from '@/lib/types';
import { ReviewStars } from '@/components/review-stars';
import { ProductCard } from '@/components/product-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const featuredBundle = bundles[0];
  const bundleProducts = featuredBundle.productIds.map(id => getProductById(id)).filter(p => p) as Product[];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] md:h-[80vh] text-white">
          {heroImage &&
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          }
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in-down">
              Unleash Your Inner Radiance
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90 animate-fade-in-up">
              Discover our curated collection of high-quality beauty products designed to make you shine.
            </p>
            <Button asChild size="lg" className="mt-8 animate-fade-in-up transition-transform duration-300 hover:scale-105">
              <Link href="#featured-products">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-background border shadow-md mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline text-xl font-semibold">Cruelty-Free</h3>
                <p className="text-muted-foreground mt-2">Ethically sourced and never tested on animals. Beauty with a conscience.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-background border shadow-md mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline text-xl font-semibold">Natural Ingredients</h3>
                <p className="text-muted-foreground mt-2">Harnessing the power of nature for a healthy, vibrant glow.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-background border shadow-md mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline text-xl font-semibold">Fast Shipping</h3>
                <p className="text-muted-foreground mt-2">Get your glow on faster with our quick and reliable delivery.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section id="featured-products" className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Featured Products</h2>
            <p className="mt-4 max-w-xl mx-auto text-center text-muted-foreground">
              Handpicked favorites that our customers can't get enough of.
            </p>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Bundle Section */}
        <section className="py-12 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <Card className="overflow-hidden md:grid md:grid-cols-2 md:gap-8 items-center shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
              <CardContent className="p-0 h-64 md:h-auto">
                {PlaceHolderImages.find(p => p.id === featuredBundle.image) &&
                  <Image
                    src={PlaceHolderImages.find(p => p.id === featuredBundle.image)!.imageUrl}
                    alt={featuredBundle.title}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    data-ai-hint={PlaceHolderImages.find(p => p.id === featuredBundle.image)!.imageHint}
                  />
                }
              </CardContent>
              <div className="p-6 md:p-10">
                <Badge variant="outline" className="text-accent border-accent">Limited Time Offer</Badge>
                <h3 className="font-headline text-3xl font-bold mt-4">{featuredBundle.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  Get the perfect skincare routine with our curated bundle. Includes our best-sellers for a complete glow-up.
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">${featuredBundle.price}</span>
                  <span className="line-through text-muted-foreground">${featuredBundle.originalPrice}</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  {bundleProducts.map(p => (
                    <li key={p.id} className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span>{p.name}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="mt-6 w-full md:w-auto">
                  Add Bundle to Cart
                </Button>
              </div>
            </Card>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">What Our Customers Say</h2>
            <p className="mt-4 max-w-xl mx-auto text-center text-muted-foreground">
              Real stories from real beauty lovers.
            </p>
            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full max-w-4xl mx-auto mt-12"
            >
              <CarouselContent>
                {reviews.map((review, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="flex flex-col justify-between h-full shadow-lg">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold">{review.author}</CardTitle>
                            <ReviewStars rating={review.rating} />
                          </div>
                          <p className="text-sm font-medium text-primary pt-1">{review.title}</p>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">"{review.body}"</p>
                        </CardContent>
                        <CardFooter>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 md:py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Mail className="h-12 w-12 mx-auto text-primary" />
              <h2 className="font-headline text-3xl md:text-4xl font-bold mt-4">Join The Bloom Club</h2>
              <p className="mt-4 text-muted-foreground">
                Sign up for exclusive offers, new product announcements, and beauty tips from our experts.
              </p>
              <form className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow bg-background"
                />
                <Button type="submit" className="shrink-0">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
