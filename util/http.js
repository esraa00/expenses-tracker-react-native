import axios from "axios";

const BACKEND_URL = "https://react-native-8e8fd-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData
  );
  return response.data.name;
}

export async function fetchExpenses() {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);
  const expensesObject = response.data;
  expensesArray = Object.entries(expensesObject).map(([key, value]) => {
    return { id: key, ...value, date: new Date(value.date) };
  });
  return expensesArray;
}

export function updateExpense(id, expenseData) {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
}
