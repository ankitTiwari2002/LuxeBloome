import { Flower2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Flower2 className="h-7 w-7 text-primary" />
      <span className="font-headline text-2xl font-bold tracking-wide text-foreground">
        LuxeBloom
      </span>
    </div>
  );
}
