import type { NextApiRequest, NextApiResponse } from 'next';
import { HfInference } from '@huggingface/inference';
import styles from '../../styles/qa.module.css';
// Adjust the path if your .css file is located elsewhere

// Adjust the path if your .css file is located elsewhere

// Ensure that the API key is available
if (!process.env.HUGGINGFACE_API_KEY) {
  throw new Error('Missing HUGGINGFACE_API_KEY in environment variables');
}

// Initialize the Hugging Face Inference client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Parse and validate the input request body
  const { question } = req.body;
  if (!question || typeof question !== 'string') {
    res.status(400).json({ error: 'Invalid or missing question' });
    return;
  }

  try {
    // Log that the request was received
    console.log('Received question:', question);
    console.log('Sending request to Hugging Face API...');

    // Make a text generation call to Hugging Face (using gpt2 in this example)
    const response = await hf.textGeneration({
      model: 'gpt2', // Use a simpler model
      inputs: question,
      parameters: { max_new_tokens: 300, temperature: 0.7 },
    });
    console.log('Response from Hugging Face:', response);

    // Extract the generated text or provide a fallback message
    const answer = response.generated_text || 'No answer generated.';

    // Return the generated text as JSON
    res.status(200).json({ answer });
  } catch (error: any) {
    // Log the error details and return an error status
    console.error('Hugging Face API Error:', error);
    res.status(500).json({ error: 'Failed to generate answer' });
  }
}
