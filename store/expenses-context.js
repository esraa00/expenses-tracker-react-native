import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (expenseId) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.payload.reverse();
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = {
        ...state[updatableExpenseIndex],
        ...action.payload.expense,
      };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatableExpense;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function setExpenses(expenses) {
    dispatch({ type: 'SET', payload: expenses });
  }

  function addExpense(expense) {
    dispatch({ type: 'ADD', payload: expense });
  }

  function deleteExpense(expenseId) {
    dispatch({ type: 'DELETE', payload: expenseId });
  }

  function updateExpense(id, expense) {
    dispatch({ type: 'UPDATE', payload: { id, expense } });
  }

  const value = {
    setExpenses,
    addExpense,
    deleteExpense,
    updateExpense,
    expenses: expensesState,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
