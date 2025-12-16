/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// type Expense = {
//   id: number;
//   amount: number;
//   category: string;
//   description?: string;
//   created_at: string;
// };

// export default function ExpensesPage() {
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const router = useRouter();

//   function token() {
//     return localStorage.getItem("token");
//   }

//   async function load() {
//     const t = token();
//     if (!t) return router.push("/login");
//     const res = await fetch("http://localhost:8000/expenses/my", { headers: { Authorization: `Bearer ${t}` }});
//     if (res.status === 401) {
//       localStorage.removeItem("token");
//       return router.push("/login");
//     }
//     const data = await res.json();
//     setExpenses(data);
//   }

//   // eslint-disable-next-line react-hooks/set-state-in-effect
//   useEffect(() => { load(); }, []);

//   async function handleAdd(e: React.FormEvent) {
//     e.preventDefault();
//     const t = token();
//     if (!t) return alert("Login first");
//     const res = await fetch("http://localhost:8000/expenses/add", {
//       method: "POST",
//       headers: { "Content-Type":"application/json", Authorization: `Bearer ${t}` },
//       body: JSON.stringify({ amount: Number(amount), category, description })
//     });
//     if (res.ok) {
//       setAmount(""); setCategory(""); setDescription("");
//       load();
//     } else {
//       const err = await res.json();
//       alert(JSON.stringify(err));
//     }
//   }

//   async function handleDelete(id: number) {
//     const t = token();
//     await fetch(`http://localhost:8000/expenses/${id}`, { method: "DELETE", headers: { Authorization:`Bearer ${t}` }});
//     load();
//   }

//   async function handleUpdate(id: number) {
//     const t = token();
//     const newAmount = prompt("New amount");
//     if (!newAmount) return;
//     await fetch(`http://localhost:8000/expenses/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type":"application/json", Authorization:`Bearer ${t}` },
//       body: JSON.stringify({ amount: Number(newAmount) })
//     });
//     load();
//   }

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>My Expenses</h1>

//       <form onSubmit={handleAdd}>
//         <input placeholder="amount" value={amount} onChange={e => setAmount(e.target.value)} />
//         <input placeholder="category" value={category} onChange={e => setCategory(e.target.value)} />
//         <input placeholder="description" value={description} onChange={e => setDescription(e.target.value)} />
//         <button type="submit">Add</button>
//       </form>

//       <ul>
//         {expenses.map(x => (
//           <li key={x.id}>
//             {x.amount} — {x.category} — {x.description} — {new Date(x.created_at).toLocaleString()}
//             <button onClick={() => handleUpdate(x.id)}>Edit</button>
//             <button onClick={() => handleDelete(x.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Expense = {
  id: number;
  amount: number;
  category: string;
  description?: string;
  created_at: string;
};

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  function token() {
    return localStorage.getItem("token");
  }

  async function load() {
    const t = token();
    if (!t) return router.push("/login");

    const res = await fetch("http://localhost:8000/expenses/my", {
      headers: { Authorization: `Bearer ${t}` },
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      return router.push("/login");
    }

    const data = await res.json();
    setExpenses(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const t = token();

    await fetch("http://localhost:8000/expenses/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`,
      },
      body: JSON.stringify({
        amount: Number(amount),
        category,
        description,
      }),
    });

    setAmount("");
    setCategory("");
    setDescription("");
    load();
  }

  async function handleDelete(id: number) {
    const t = token();
    await fetch(`http://localhost:8000/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
    load();
  }

  async function handleUpdate(id: number) {
    const t = token();
    const newAmount = prompt("Enter new amount");
    if (!newAmount) return;

    await fetch(`http://localhost:8000/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`,
      },
      body: JSON.stringify({ amount: Number(newAmount) }),
    });

    load();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">My Expenses</h1>

        <form
          onSubmit={handleAdd}
          className="bg-white p-4 rounded shadow mb-6 grid gap-4 md:grid-cols-4"
        >
          <input
            className="border px-3 py-2 rounded"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            className="border px-3 py-2 rounded"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            className="border px-3 py-2 rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="bg-blue-600 text-white rounded hover:bg-blue-700">
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {expenses.map((x) => (
            <li
              key={x.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  ₹{x.amount} — {x.category}
                </p>
                <p className="text-sm text-gray-500">{x.description}</p>
                <p className="text-xs text-gray-400">
                  {new Date(x.created_at).toLocaleString()}
                </p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => handleUpdate(x.id)}
                  className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(x.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
