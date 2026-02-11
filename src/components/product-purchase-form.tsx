'use client';

import { useState } from 'react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { TrustBadges } from '@/components/trust-badges';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '@/components/ui/accordion';
import { CheckCircle } from 'lucide-react';

type ProductPurchaseFormProps = {
    product: Product;
};

export function ProductPurchaseForm({ product }: ProductPurchaseFormProps) {
    const { addToCart } = useCart();
    const { toast } = useToast();
    const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.options?.[0] || null);

    const handleAddToCart = () => {
        // Here we could add logic to handle different variants
        addToCart(product);
        toast({
            description: (
              <div className="flex items-center gap-2 text-success font-medium">
                <CheckCircle className="h-5 w-5" />
                <span>Added successfully</span>
              </div>
            ),
        });
    };

    return (
        <div className="flex flex-col">
            <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>
            
            {product.variants && (
                <div className="mt-6">
                <Label className="text-base font-medium">{product.variants[0].name}</Label>
                <RadioGroup 
                    defaultValue={selectedVariant || undefined}
                    onValueChange={setSelectedVariant}
                    className="mt-2 flex gap-4"
                >
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
                <Button size="lg" className="w-full text-lg h-12" onClick={handleAddToCart}>Add to Cart</Button>
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
    );
}
