import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { useCallback } from "react";

function RecentExpensesScreen() {
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [error, setError] = useState();
  const { expenses, setExpenses } = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses();
        setExpenses(expenses);
      } catch (error) {
        setError(`Couldn't fetch expenses!`);
      } finally {
        setIsFetchingData(false);
      }
    }
    getExpenses();
  }, []);

  const confirmErrorPressHandler = useCallback(() => {
    setError(null);
  }, []);

  if (error && !isFetchingData)
    return (
      <ErrorOverlay message={error} onConfirm={confirmErrorPressHandler} />
    );

  if (isFetchingData) return <LoadingOverlay />;

  const filteredExpenses = expenses.filter((expense) => {
    const dateNow = new Date();
    const date7DaysAgo = getDateMinusDays(dateNow, 7);
    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      periodName="Last 7 days"
      expenses={filteredExpenses}
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpensesScreen;
