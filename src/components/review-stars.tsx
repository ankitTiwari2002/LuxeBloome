import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

type ReviewStarsProps = {
  rating: number;
  className?: string;
  starClassName?: string;
};

export function ReviewStars({ rating, className, starClassName }: ReviewStarsProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className={cn('h-4 w-4 text-primary fill-primary', starClassName)} />
      ))}
      {halfStar && <StarHalf key="half" className={cn('h-4 w-4 text-primary fill-primary', starClassName)} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={cn('h-4 w-4 text-muted-foreground/50 fill-muted-foreground/20', starClassName)} />
      ))}
    </div>
  );
}
