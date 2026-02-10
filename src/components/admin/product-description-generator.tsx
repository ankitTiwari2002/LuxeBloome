'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  GenerateProductDescriptionInput,
  generateProductDescription,
} from '@/ai/flows/generate-product-descriptions';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  productName: z.string().min(1, 'Product name is required.'),
  productFeatures: z.string().min(1, 'Please list at least one feature.'),
  productBenefits: z.string().min(1, 'Please list at least one benefit.'),
  targetCustomer: z.string().min(1, 'Target customer is required.'),
  brandVoice: z.enum(['premium', 'playful', 'minimal', 'bold']),
});

export default function ProductDescriptionGenerator() {
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productFeatures: '',
      productBenefits: '',
      targetCustomer: '',
      brandVoice: 'premium',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedDescription('');
    try {
      const input: GenerateProductDescriptionInput = values;
      const result = await generateProductDescription(input);
      setGeneratedDescription(result.productDescription);
    } catch (error) {
      console.error('Error generating description:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate product description. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Radiant Glow Serum" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productFeatures"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Features</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., Vitamin C, Hyaluronic Acid, Lightweight" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productBenefits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Benefits</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., Brightens skin, Reduces dark spots, Hydrates" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targetCustomer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Customer</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 25-40, concerned with aging, mid-range budget" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brandVoice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Voice</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a brand voice" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="playful">Playful</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="bold">Bold</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Generate Description
          </Button>
        </form>
      </Form>
      <div className="space-y-4">
        <Label>Generated Description</Label>
        <Textarea
          value={generatedDescription}
          readOnly
          placeholder="Your AI-generated product description will appear here..."
          className="min-h-[300px] bg-muted"
        />
        <Button 
            onClick={() => navigator.clipboard.writeText(generatedDescription)} 
            disabled={!generatedDescription}
            variant="outline"
        >
            Copy to Clipboard
        </Button>
      </div>
    </div>
  );
}
