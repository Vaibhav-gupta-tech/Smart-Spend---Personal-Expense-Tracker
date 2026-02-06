import { getToken } from "../utils/token";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export async function getExpenses() {
  const res = await fetch(`${API}/expenses/my`, {
    headers: headers(),
  });

  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addExpense(payload: any) {
  return fetch(`${API}/expenses/add`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload),
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateExpense(id: number, payload: any) {
  return fetch(`${API}/expenses/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(payload),
  });
}

export async function deleteExpense(id: number) {
  return fetch(`${API}/expenses/${id}`, {
    method: "DELETE",
    headers: headers(),
  });
}
