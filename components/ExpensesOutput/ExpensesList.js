import { FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';

function renderExpenseItem({ item }) {
  return <ExpenseItem expense={item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={({ id }) => id}
      renderItem={renderExpenseItem}
    />
  );
}

export default ExpensesList;
