import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function ExpensesSummary({ periodName, expenses }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return expense.amount + sum;
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.periodName}>{periodName}</Text>
      <Text style={styles.value}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 5,
  },
  periodName: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 16,
    color: GlobalStyles.colors.primary500,
  },
});
