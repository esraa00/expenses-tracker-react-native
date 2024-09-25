import { Text, View, StyleSheet, Pressable } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';
import { useNavigation } from '@react-navigation/native';

function ExpenseItem({ expense }) {
  const { navigate } = useNavigation();
  const { description, date, amount } = expense || {};

  function expensePressHandler() {
    navigate('ManageExpenses', {
      expenseId: expense.id,
    });
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.container}>
        <View>
          <Text style={[styles.description, styles.textBase]}>
            {description}
          </Text>
          <Text style={[styles.date, styles.textBase]}>
            {getFormattedDate(date)}
          </Text>
        </View>
        <Text style={styles.amount}>{amount.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary500,
    marginVertical: 8,
    padding: 12,
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: { color: GlobalStyles.colors.primary50 },
  description: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 16,
  },
  date: {
    color: 'white',
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    backgroundColor: 'white',
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    minWidth: 80,
    textAlign: 'center',
  },
});
