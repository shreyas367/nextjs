import { NextResponse } from 'next/server'
import { User } from '@/model/user'
import { dbConnect } from '@/lib/dbconnect'

function generateSuggestions(username: string) {
  const randomNum = () => Math.floor(Math.random() * 1000)
  return [
    `${username}${randomNum()}`,
    `${username}_dev`,
    `${username}.${randomNum()}`,
    `${username}_x`,
  ]
}

export async function POST(req: Request) {
  await dbConnect()

  const { username } = await req.json()

  if (!username) {
    return NextResponse.json({ message: 'Username is required' }, { status: 400 })
  }

  const user = await User.findOne({ username })

  return NextResponse.json({
    exists: !!user,
    suggestions: user ? generateSuggestions(username) : [],
  })
}
