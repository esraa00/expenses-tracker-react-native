import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useContext, useState, useCallback, useLayoutEffect } from "react";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpensesScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const expenseContext = useContext(ExpensesContext);
  const { expenseId } = route.params || {};
  const selectedExpense = expenseContext.expenses.find(
    (expense) => expense.id === expenseId
  );
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  const cancelPressHandler = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  async function deleteExpensePressHandler() {
    setIsLoading(true);
    try {
      await deleteExpense(expenseId);
      expenseContext.deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError(`Couldn't delete expense!`);
    } finally {
      setIsLoading(false);
    }
  }

  async function submitHandler(expenseData) {
    setIsLoading(true);
    if (isEditing) {
      try {
        await updateExpense(expenseId, expenseData);
        expenseContext.updateExpense(expenseId, expenseData);
        navigation.goBack();
      } catch (error) {
        setError(`Couldn't update expense!`);
      }
    } else {
      try {
        const id = await storeExpense(expenseData);
        expenseContext.addExpense({ id, ...expenseData });
        navigation.goBack();
      } catch (error) {
        setError(`Couldn't add expense!`);
      }
    }
    setIsLoading(false);
  }

  const confirmErrorPressHandler = useCallback(() => {
    setError(null);
  }, []);

  if (error && !isLoading)
    return (
      <ErrorOverlay message={error} onConfirm={confirmErrorPressHandler} />
    );
  if (isLoading) return <LoadingOverlay />;

  return (
    <View style={styles.container}>
      <ExpenseForm
        title="Your Expense"
        onCancel={cancelPressHandler}
        onSubmit={submitHandler}
        defaultValues={selectedExpense}
        submitButtonLabel={isEditing ? "Update" : "Add"}
      />
      {isEditing && (
        <View style={styles.deleteButtonContainer}>
          <IconButton
            name="trash"
            color={GlobalStyles.colors.error500}
            size={24}
            onPress={deleteExpensePressHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopColor: GlobalStyles.colors.primary200,
    borderTopWidth: 2,
    alignItems: "center",
  },
});
