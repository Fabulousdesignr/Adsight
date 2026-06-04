'use server';
/**
 * @fileOverview An AI agent for analyzing advertisement creatives.
 *
 * - analyzeAdCreative - A function that handles the ad creative analysis process.
 * - AnalyzeAdCreativeInput - The input type for the analyzeAdCreative function.
 * - AnalyzeAdCreativeOutput - The return type for the analyzeAdCreative function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeAdCreativeInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of an advertisement creative, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeAdCreativeInput = z.infer<typeof AnalyzeAdCreativeInputSchema>;

const AnalyzeAdCreativeOutputSchema = z.object({
  adType: z.string().describe('The identified type of advertisement (e.g., Social Media Advertisement, Event Flyer, etc.).'),
  industry: z.string().describe('The identified industry (e.g., Food & Beverage, Fashion & Apparel, etc.).'),
  overallAssessment: z
    .string()
    .describe('A short, expert summary of whether the ad works or not.'),
  whatAdIsSaying: z
    .string()
    .describe('A simple explanation of the main message the ad is trying to get across.'),
  whoMayAppealTo: z
    .string()
    .describe('A clear description of the kind of people who would be interested in this ad.'),
  whatWorksWell: z
    .string()
    .describe('The best parts of the ad that are doing a good job.'),
  whatCouldImprove: z
    .string()
    .describe('Practical, easy-to-fix things that would make the ad more effective.'),
});
export type AnalyzeAdCreativeOutput = z.infer<typeof AnalyzeAdCreativeOutputSchema>;

export async function analyzeAdCreative(
  input: AnalyzeAdCreativeInput
): Promise<AnalyzeAdCreativeOutput> {
  return analyzeAdCreativeFlow(input);
}

const analyzeAdCreativePrompt = ai.definePrompt({
  name: 'analyzeAdCreativePrompt',
  input: { schema: AnalyzeAdCreativeInputSchema },
  output: { schema: AnalyzeAdCreativeOutputSchema },
  prompt: `You are an experienced marketing strategist reviewing an advertisement for a client. 

Your goal is to explain how the ad is performing using simple, everyday language. The person you are talking to is a business owner who doesn't know marketing jargon.

Follow these rules:
1. Identify the **Ad Type** (e.g., Social Media Advertisement, Event Flyer, Promotional Flyer, Banner Advertisement, Product Advertisement, Brand Awareness Advertisement, Digital Advertisement, Recruitment Advertisement).
2. Identify the **Industry** (e.g., Food & Beverage, Financial Services, Fashion & Apparel, Real Estate, Healthcare, Technology, Education, Entertainment, Travel & Hospitality, Retail).
3. Use short, clear sentences.
4. Be practical and helpful.
5. Absolutely no marketing jargon (don't use words like "hierarchy," "value proposition," "conversion," or "engagement").
6. No corporate or academic language.
7. Sound like a confident expert giving friendly advice over coffee.

Provide your feedback in these sections:
- **Ad Type**: Determine the specific format.
- **Industry**: Determine the primary business sector.
- **Overall Assessment**: 1-2 sentences summarizing if the ad is strong or needs work.
- **What This Ad Is Saying**: 2-4 sentences explaining the main point.
- **Who It May Appeal To**: 2-4 sentences describing the target customer.
- **What Works Well**: 2-4 sentences on the specific parts that look good or work well.
- **What Could Improve**: 2-4 sentences with simple, practical tips to make it better.

Advertisement Image: {{media url=photoDataUri}}`,
});

const analyzeAdCreativeFlow = ai.defineFlow(
  {
    name: 'analyzeAdCreativeFlow',
    inputSchema: AnalyzeAdCreativeInputSchema,
    outputSchema: AnalyzeAdCreativeOutputSchema,
  },
  async (input) => {
    const { output } = await analyzeAdCreativePrompt(input);
    if (!output) throw new Error('Analysis failed to generate output');
    return output;
  }
);
