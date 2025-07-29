import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageCircle, Sparkles } from 'lucide-react';
import { dbConnect } from "@/lib/dbconnect";
import UserModel from '@/model/user';
import MessageForm from '@/components/message-form';

interface Props {
  params: {
    username: string;
  };
}


const suggestedMessages = [
  "What's something that recently made you smile?",
  "If you could master any skill instantly, what would it be?",
  "What’s your dream travel destination and why?",
  "What motivates you when you’re feeling low?",
  "What’s a small thing that brings you a lot of joy?",
  "What’s a quote or saying you try to live by?",
  "If you had a podcast, what would it be about?",
  "What's your favorite way to relax after a long day?",
  "Who inspires you the most and why?",
  "What's a fun fact about you most people don’t know?",
  "What’s one movie or show you could rewatch forever?",
  "If you could talk to your future self, what would you ask?",
  "What’s a hobby you’ve always wanted to try?",
  "What’s a book that changed how you think about life?",
  "What’s something you’ve done recently that you’re proud of?",
  "How do you usually spend your weekends?",
  "If you could live in any fictional universe, which one?",
  "What does your ideal day look like?",
  "What kind of music lifts your mood instantly?",
  "What's one goal you’re excited to achieve this year?"
];

export default async function PublicProfilePage({ params }: Props) {
  await dbConnect();
  const { username } = params;

  const user = await UserModel.findOne({ username }).select('username isAcceptingMessage');
  if (!user) return notFound();

  // // ✅ Fetch suggestions from API
  // const suggestionsRes = await fetch(`${process.env}/api/suggest-messages`, {
  //   method: 'POST',
  //   cache: 'no-store',
  // });
  // const data = await suggestionsRes.json();
  // const suggestions = Array.isArray(data.suggestions) ? data.suggestions : [];

  return (
    <main className="min-h-screen p-6 bg-gray-100 dark:bg-black dark:text-white flex items-center justify-center">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageCircle className="w-5 h-5" />
            Send anonymous message to @{username}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!user.isAcceptingMessage ? (
            <p className="text-red-500 text-sm font-medium">
              This user is not accepting messages right now.
            </p>
          ) : (
            <>
              <MessageForm username={username} />
                <div className="mt-6">
                <h3 className="text-md font-semibold mb-2">Need ideas? Try one of these:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {suggestedMessages.map((msg, i) => (
                    <li key={i}>{msg}</li>
                  ))}
                </ul>
              </div>

              

              {/* ✅ Suggestions UI */}
              {/* {suggestions.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    <Sparkles className="w-4 h-4" />
                    Suggested Messages
                  </div>
                  <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-200">
                    {suggestions.map((msg: string, index: number) => (
                      <li
                        key={index}
                        className="bg-gray-200 dark:bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition cursor-pointer"
                        onClick={() => {
                          const textarea = document.querySelector('textarea');
                          if (textarea) {
                            (textarea as HTMLTextAreaElement).value = msg;
                          }
                        }}
                      >
                        {msg}
                      </li>
                    ))}
                  </ul>
                </div>
              )} */}
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
