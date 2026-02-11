'use server';

/**
 * @fileOverview A shopping assistant AI flow for LuxeBloom.
 *
 * - shoppingAssistant - A function that provides shopping assistance.
 * - ShoppingAssistantInput - The input type for the shoppingAssistant function.
 * - ShoppingAssistantOutput - The return type for the shoppingAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { products } from '@/lib/data';
import { Product } from '@/lib/types';

// Simple stringify for the prompt, can be improved later if needed.
const productCatalogForPrompt = JSON.stringify(
    products.map((p: Product) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        tags: p.tags,
    })),
    null,
    2
);

const ShoppingAssistantInputSchema = z.object({
  query: z.string().describe("The user's question about products or for recommendations."),
});
export type ShoppingAssistantInput = z.infer<typeof ShoppingAssistantInputSchema>;

const ShoppingAssistantOutputSchema = z.object({
  response: z.string().describe("The AI assistant's helpful response."),
});
export type ShoppingAssistantOutput = z.infer<typeof ShoppingAssistantOutputSchema>;

export async function shoppingAssistant(
  input: ShoppingAssistantInput
): Promise<ShoppingAssistantOutput> {
  return shoppingAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'shoppingAssistantPrompt',
  input: {schema: ShoppingAssistantInputSchema.extend({ productCatalog: z.string() })},
  output: {schema: ShoppingAssistantOutputSchema},
  prompt: `You are a friendly and helpful AI shopping assistant for LuxeBloom, a luxury beauty and skincare store.

Your goal is to help users find the right products and have a great shopping experience. Use the provided product catalog to answer questions and make recommendations.

Keep your answers short and to the point. Be conversational and engaging, but concise.

If a user asks for a product you don't have, you can suggest a similar product from the catalog.

Product Catalog:
{{{productCatalog}}}

User's Query:
{{{query}}}

Assistant's Response:`,
});

const shoppingAssistantFlow = ai.defineFlow(
  {
    name: 'shoppingAssistantFlow',
    inputSchema: ShoppingAssistantInputSchema,
    outputSchema: ShoppingAssistantOutputSchema,
  },
  async (input) => {
    const {output} = await prompt({ ...input, productCatalog: productCatalogForPrompt });
    return output!;
  }
);
