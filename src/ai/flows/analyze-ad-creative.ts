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
  overallAssessment: z
    .string()
    .describe('A concise overall assessment of the advertisement creative.'),
  whatAdIsSaying: z
    .string()
    .describe('A description of the main message or communication of the advertisement.'),
  whoMayAppealTo: z
    .string()
    .describe('An identification of the likely target audience for this advertisement.'),
  whatWorksWell: z.string().describe('The strengths and effective elements of the advertisement.'),
  whatCouldImprove: z
    .string()
    .describe('Suggestions for areas where the advertisement could be improved.'),
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
  prompt: `You are an expert marketing analyst specializing in advertisement creative review. Your task is to analyze the provided ad creative and offer comprehensive feedback.

Focus on these criteria:
1. **Overall Assessment**: A concise summary of the creative's effectiveness.
2. **What This Ad Is Saying**: The core message and value proposition.
3. **Who It May Appeal To**: Detailed target audience profile based on visual and textual signals.
4. **What Works Well**: Visual hierarchy, copy clarity, and design strengths.
5. **What Could Improve**: Specific, actionable suggestions for better engagement or conversion.

Analyze the advertisement objectively and provide high-level professional insights.

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
