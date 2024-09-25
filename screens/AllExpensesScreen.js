import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';

function AllExpensesScreen() {
  const { expenses } = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      periodName='Total'
      expenses={expenses}
      fallbackText='No registered expenses found!'
    />
  );
}

export default AllExpensesScreen;
