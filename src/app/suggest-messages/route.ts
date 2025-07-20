
import OpenAI from 'openai';

// ✅ Use edge-friendly OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // make sure it's set in .env.local
});

// ✅ Edge runtime
export const runtime = 'edge';

export async function POST(req: Request) {
 try{


    const prompt ="create a list of three open-ended and engaging questions that can be used to start a conversation with a user. The questions should be designed to encourage thoughtful responses and foster meaningful dialogue. Each question should be unique and not overly generic. The questions should be suitable for a wide range of topics and should not be too personal or intrusive.|| for example : your output should be structered like tthis: 'what's your favorite book and why?|| what hobbies do you enjoy in your free time?|| if you could travel anywhere in the world, where would you go and why?' positive and welcoming tone.';";
     const { messages } = await req.json();

  // ✅ Call OpenAI API
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    max_tokens: 100,
    messages: [
      { role: 'user', content: prompt }
    ],
  });

  

 }
    catch (error) {
        if(error instanceof OpenAI.APIError) {
            console.error('OpenAI API error:', error.message);
            return new Response(JSON.stringify({ error: 'OpenAI API error' }), { status: 500 });
        }
        if(error instanceof OpenAI.APIConnectionError) {
            console.error('OpenAI API connection error:', error.message);
            return new Response(JSON.stringify({ error: 'Failed to connect to OpenAI API' }), { status: 500 });
        }
        

        console.error('Error in OpenAI API call:', error);
        return new Response(JSON.stringify({ error: 'Failed to process request' }), { status: 500 });
    }
    
    // ✅ Return the response
    return new Response(JSON.stringify({ success: true, message: 'Message sent successfully' }), { status: 200 });



   
}
