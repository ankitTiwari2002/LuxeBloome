import { ShieldCheck, Truck, Globe } from 'lucide-react';

export function TrustBadges() {
  return (
    <div className="grid grid-cols-3 gap-4 text-center my-6">
      <div className="flex flex-col items-center text-muted-foreground text-xs">
        <ShieldCheck className="h-8 w-8 mb-1" />
        <span>Secure SSL Checkout</span>
      </div>
      <div className="flex flex-col items-center text-muted-foreground text-xs">
        <Truck className="h-8 w-8 mb-1" />
        <span>Free Shipping Over $50</span>
      </div>
      <div className="flex flex-col items-center text-muted-foreground text-xs">
        <Globe className="h-8 w-8 mb-1" />
        <span>Worldwide Delivery</span>
      </div>
    </div>
  );
}
