/* eslint-disable @next/next/no-html-link-for-pages */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/expenses");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      alert("Invalid credentials");
      return;
    }

    const data = await res.json();
    localStorage.setItem("token", data.access_token);
    router.push("/expenses");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          className="border px-3 py-2 rounded w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border px-3 py-2 rounded w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>

        <p className="text-sm text-center">
          New user?{" "}
          <a href="/signup" className="text-blue-600 underline">
            Create account
          </a>
        </p>
      </form>
    </div>
  );
}

