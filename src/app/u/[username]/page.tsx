import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageCircle } from 'lucide-react';
import { dbConnect } from "@/lib/dbconnect";
import UserModel from '@/model/user';
import MessageForm from '@/components/message-form';


interface Props {
  params: {
    username: string;
  };
}

export default async function PublicProfilePage({ params }: Props) {
  await dbConnect();
  const { username } = params;

  const user = await UserModel.findOne({ username }).select('username isAcceptingMessage');
  if (!user) return notFound();

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
            <MessageForm username={username} />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
