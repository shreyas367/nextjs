"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-semibold">Sign In</h1>

      {/* Credential login */}
      <form onSubmit={handleCredentialsLogin} className="flex flex-col gap-2 w-full max-w-sm">
        <input
          className="border p-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Sign In with Email
        </button>
      </form>

      {/* OR Divider */}
      <div className="text-gray-500 text-sm">— or —</div>

      {/* Google login */}
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-red-500 text-white p-2 rounded w-full max-w-sm"
      >
        Sign In with Google
      </button>

      {/* GitHub login */}
      <button
        onClick={() => signIn("github", { callbackUrl: "/" })}
        className="bg-gray-800 text-white p-2 rounded w-full max-w-sm"
      >
        Sign In with GitHub
      </button>
    </div>
  );
}
