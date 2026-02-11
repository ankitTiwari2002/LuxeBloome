'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUser } from '@/firebase';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2, Lock, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  // Shipping
  shippingName: z.string().min(1, 'Full name is required.'),
  shippingAddress: z.string().min(1, 'Address is required.'),
  shippingCity: z.string().min(1, 'City is required.'),
  shippingState: z.string().min(1, 'State is required.'),
  shippingZip: z.string().min(1, 'ZIP code is required.'),

  // Payment
  cardName: z.string().min(1, 'Name on card is required.'),
  cardNumber: z.string().min(16, 'Card number must be 16 digits.').max(16, 'Card number must be 16 digits.'),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\s*\/\s*([0-9]{2})$/, 'Must be in MM/YY format.'),
  cardCvc: z.string().min(3, 'CVC must be 3-4 digits.').max(4, 'CVC must be 3-4 digits.'),
});


export default function CheckoutPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login?redirect=/checkout');
    }
  }, [user, isUserLoading, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shippingName: '',
      shippingAddress: '',
      shippingCity: '',
      shippingState: '',
      shippingZip: '',
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
        title: "Payment Successful!",
        description: "Your order has been placed.",
    });

    clearCart();
    router.replace('/checkout/success');
  }

  if (isUserLoading || !user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (cartItems.length === 0 && !isProcessing) {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
            <p className="mt-4 text-muted-foreground">You can't checkout without any items!</p>
            <Button onClick={() => router.push('/products')} className="mt-6">
                Continue Shopping
            </Button>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Checkout</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Complete your order securely.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Shipping Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField control={form.control} name="shippingName" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl><Input {...field} placeholder="Jane Doe" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="shippingAddress" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl><Input {...field} placeholder="123 Bloom St" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <div className="grid grid-cols-3 gap-4">
                                    <FormField control={form.control} name="shippingCity" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl><Input {...field} placeholder="Beauty City" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="shippingState" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State</FormLabel>
                                            <FormControl><Input {...field} placeholder="CA" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="shippingZip" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ZIP Code</FormLabel>
                                            <FormControl><Input {...field} placeholder="90210" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Details</CardTitle>
                                <CardDescription className="flex items-center gap-2 text-xs">
                                    <Lock className="h-3 w-3" />
                                    This is a simulated payment. Do not enter real card details.
                                </CardDescription>
                            </CardHeader>
                             <CardContent className="space-y-4">
                                <FormField control={form.control} name="cardName" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name on Card</FormLabel>
                                        <FormControl><Input {...field} placeholder="Jane Doe" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="cardNumber" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Card Number</FormLabel>
                                        <FormControl><Input {...field} placeholder="•••• •••• •••• ••••" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField control={form.control} name="cardExpiry" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Expiration (MM/YY)</FormLabel>
                                            <FormControl><Input {...field} placeholder="MM/YY" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="cardCvc" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>CVC</FormLabel>
                                            <FormControl><Input {...field} placeholder="123" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                             </CardContent>
                        </Card>

                        <Button type="submit" className="w-full h-12 text-lg" disabled={isProcessing}>
                            {isProcessing ? (
                                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                            ) : (
                                <CreditCard className="mr-2 h-5 w-5" />
                            )}
                            {isProcessing ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
                        </Button>
                    </form>
                </Form>
            </div>

            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {cartItems.map(item => {
                                const image = item.images[0];
                                return (
                                <div key={item.id} className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        {image && (
                                            <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                                            <Image src={image} alt={item.name} fill className="object-cover" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            )})}
                        </div>
                        <Separator className="my-6" />
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Subtotal</p>
                                <p>${cartTotal.toFixed(2)}</p>
                            </div>
                             <div className="flex justify-between">
                                <p className="text-muted-foreground">Shipping</p>
                                <p>Free</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Taxes</p>
                                <p>Calculated at next step</p>
                            </div>
                        </div>
                         <Separator className="my-6" />
                         <div className="flex justify-between font-bold text-lg">
                            <p>Total</p>
                            <p>${cartTotal.toFixed(2)}</p>
                         </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
