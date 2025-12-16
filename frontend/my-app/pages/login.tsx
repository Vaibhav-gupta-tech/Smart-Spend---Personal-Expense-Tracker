// import { useState } from "react";
// import { useRouter } from "next/router";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     // prefer environment-configured API base URL; fall back to localhost backend
//     const API_URL = (process.env.NEXT_PUBLIC_API_URL as string) || "http://localhost:8000";
//     const res = await fetch(`${API_URL}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await res.json();
//     if (data.access_token) {
//       localStorage.setItem("token", data.access_token);
//       router.push("/expenses");
//     } else {
//       alert("Login failed");
//     }
//   }

//   return (
//     <div className="p-6">
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
//         <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// // docker compose -f ~/SmartSpend/Smart-Spend---Personal-Expense-Tracker/expense-tracker/docker-compose.yml up --build
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      router.push("/expenses");
    } else {
      alert("Login failed");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-blue-600 to-purple-700">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Expense Tracker Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
