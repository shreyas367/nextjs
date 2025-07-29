import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const runtime = 'edge';

export async function POST() {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions that can be used to start a conversation with a user. " +
      "The questions should encourage thoughtful responses and foster meaningful dialogue. Each question should be unique, positive, and not overly generic. " +
      "Avoid personal or intrusive topics. Respond in this format (no bullets, no explanation): " +
      "'What's your favorite book and why?||What hobbies do you enjoy in your free time?||If you could travel anywhere in the world, where would you go and why?'";

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: 100,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.choices[0]?.message?.content || '';
    const suggestions = text.split('||').map((q) => q.trim()).filter(Boolean);

    return new Response(JSON.stringify({ suggestions }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Suggestion API error:', error);
    return new Response(JSON.stringify({ suggestions: [] }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
