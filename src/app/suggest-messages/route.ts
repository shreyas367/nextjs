import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

// ✅ Use edge-friendly OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // make sure it's set in .env.local
});

// ✅ Edge runtime
export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // ✅ Call OpenAI API
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  });

  // ✅ Convert to a stream
  const stream = OpenAIStream(response);

  // ✅ Return the stream to frontend
  return new StreamingTextResponse(stream);
}
