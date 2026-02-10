import Image from 'next/image';
import { Heart, Leaf, Sparkles } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const aboutImage = PlaceHolderImages.find(p => p.id === 'hero-1');

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
            About LuxeBloom
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            We believe in beauty that is kind, conscious, and effective. Our mission is to provide high-quality, natural skincare that makes you feel as good as you look.
          </p>
        </div>

        {aboutImage && (
          <div className="my-12 rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={aboutImage.imageUrl}
              alt="Our mission"
              width={1200}
              height={600}
              className="w-full h-auto object-cover max-h-[500px]"
              data-ai-hint={aboutImage.imageHint}
            />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-12 text-center mt-20">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-headline text-2xl font-semibold">Our Philosophy</h2>
            <p className="mt-2 text-muted-foreground">
              Inspired by nature, backed by science. We harness the power of potent botanicals and safe, effective ingredients to create formulas that deliver visible results.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-headline text-2xl font-semibold">Our Commitment</h2>
            <p className="mt-2 text-muted-foreground">
              We are 100% cruelty-free and committed to sustainable practices. Our packaging is recyclable, and we strive to minimize our environmental footprint every step of the way.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-headline text-2xl font-semibold">Our Promise</h2>
            <p className="mt-2 text-muted-foreground">
              To create luxurious, effective skincare that you can trust. Every product is thoughtfully crafted to be a delightful part of your self-care ritual.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
