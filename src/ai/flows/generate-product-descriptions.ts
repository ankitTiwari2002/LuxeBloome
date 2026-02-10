'use server';

/**
 * @fileOverview AI-powered product description generator for beauty products.
 *
 * - generateProductDescription - A function to generate product descriptions.
 * - GenerateProductDescriptionInput - Input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - Return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the beauty product.'),
  productFeatures: z
    .string()
    .describe('A list of features of the product.'),
  productBenefits: z
    .string()
    .describe('A list of benefits of the product.'),
  targetCustomer: z
    .string()
    .describe('The target customer for the product (age, needs, budget)'),
  brandVoice: z.string().describe('The brand voice (premium, playful, minimal, bold)'),
});
export type GenerateProductDescriptionInput = z.infer<
  typeof GenerateProductDescriptionInputSchema
>;

const GenerateProductDescriptionOutputSchema = z.object({
  productDescription: z
    .string()
    .describe('A compelling product description highlighting key features and benefits.'),
});
export type GenerateProductDescriptionOutput = z.infer<
  typeof GenerateProductDescriptionOutputSchema
>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are a marketing expert specializing in writing compelling product descriptions for beauty products.

  Based on the following information, write a concise and engaging product description that highlights the key features and benefits of the product, while appealing to the target customer.

  Product Name: {{{productName}}}
  Product Features: {{{productFeatures}}}
  Product Benefits: {{{productBenefits}}}
  Target Customer: {{{targetCustomer}}}
  Brand Voice: {{{brandVoice}}}

  Product Description:`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
