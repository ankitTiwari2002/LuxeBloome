// src/ai/flows/ai-sidekick-suggestions.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing AI-powered suggestions
 * to store administrators for optimizing their online store. It covers section layout,
 * copy improvements, navigation optimization, and SEO descriptions.
 *
 * - aiSidekickSuggestions - A function that takes a topic and content as input and returns AI suggestions.
 * - AiSidekickSuggestionsInput - The input type for the aiSidekickSuggestions function.
 * - AiSidekickSuggestionsOutput - The return type for the aiSidekickSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSidekickSuggestionsInputSchema = z.object({
  topic: z
    .string()
    .describe(
      'The area for which suggestions are requested (e.g., section layout, copy improvements, navigation optimization, SEO descriptions).'
    ),
  content: z.string().describe('The existing content or description to be optimized.'),
});
export type AiSidekickSuggestionsInput = z.infer<typeof AiSidekickSuggestionsInputSchema>;

const AiSidekickSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of AI-generated suggestions.'),
});
export type AiSidekickSuggestionsOutput = z.infer<typeof AiSidekickSuggestionsOutputSchema>;

export async function aiSidekickSuggestions(
  input: AiSidekickSuggestionsInput
): Promise<AiSidekickSuggestionsOutput> {
  return aiSidekickSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSidekickSuggestionsPrompt',
  input: {schema: AiSidekickSuggestionsInputSchema},
  output: {schema: AiSidekickSuggestionsOutputSchema},
  prompt: `You are an AI assistant providing suggestions for e-commerce store optimization.

You will be given a topic and existing content. Generate a list of suggestions to improve the store in that area.

Topic: {{{topic}}}
Content: {{{content}}}

Suggestions:`, // Ensure the prompt ends with "Suggestions:"
});

const aiSidekickSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiSidekickSuggestionsFlow',
    inputSchema: AiSidekickSuggestionsInputSchema,
    outputSchema: AiSidekickSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
