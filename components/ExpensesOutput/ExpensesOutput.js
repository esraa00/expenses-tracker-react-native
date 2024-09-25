import { View, StyleSheet, Text } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';

function ExpensesOutput({ periodName, expenses, fallbackText }) {
  let content = <Text style={styles.fallbackText}>{fallbackText}</Text>;

  if (expenses.length > 0) content = <ExpensesList expenses={expenses} />;

  return (
    <View style={styles.root}>
      <ExpensesSummary periodName={periodName} expenses={expenses} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  fallbackText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
