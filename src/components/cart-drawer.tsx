'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

export function CartDrawer() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Open cart">
          <ShoppingBag className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {cartCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Shopping Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-6 p-6">
              {cartItems.map((item) => {
                const imageUrl = item.images[0];
                return (
                  <div key={item.id} className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {imageUrl && (
                        <div className="relative h-20 w-20 overflow-hidden rounded-md border">
                          <Link href={`/products/${item.id}`}>
                            <Image
                              src={imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </Link>
                        </div>
                      )}
                      <div>
                        <SheetClose asChild>
                          <Link href={`/products/${item.id}`} className="font-semibold hover:underline">
                            {item.name}
                          </Link>
                        </SheetClose>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                        <div className="mt-2 flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10) || 1)}
                            className="h-7 w-12 border-x-0 text-center"
                            aria-label="Item quantity"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )
              })}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="p-6">
                <div className="w-full space-y-4">
                    <div className="flex justify-between font-semibold">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
                    <SheetClose asChild>
                      <Button asChild className="w-full" size="lg">
                        <Link href="/checkout">Checkout</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                         <Button variant="link" className="w-full">Continue Shopping</Button>
                    </SheetClose>
                </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty.</p>
             <SheetClose asChild>
                <Button asChild>
                    <Link href="/products">Start Shopping</Link>
                </Button>
             </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
