import { Alert, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Button from '../UI/Button';
import Input from './Input';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm({
  title,
  onCancel,
  submitButtonLabel,
  onSubmit,
  defaultValues,
}) {
  const { amount, date, description } = defaultValues || {};
  const [inputs, setInputs] = useState({
    amount: {
      value: amount?.toString() || '',
      isValid: true,
    },
    date: {
      value: date ? getFormattedDate(date) : '',
      isValid: true,
    },
    description: { value: description || '', isValid: true },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: {
          value: enteredValue,
          isValid: true,
        },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateValid = new Date(expenseData.date).toString() !== 'Invalid Date';
    const descriptionValid = expenseData.description.trim().length > 0;

    if (!amountValid || !dateValid || !descriptionValid) {
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountValid },
          date: { value: currentInputs.date.value, isValid: dateValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionValid,
          },
        };
      });
      Alert.alert('Invalid input', 'Please check your input values');
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label='Amount'
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            onChangeText: (enteredValue) => {
              inputChangeHandler('amount', enteredValue);
            },
            value: inputs.amount.value,
            keyboardType: 'decimal-pad',
            autoCorrect: false,
          }}
        />
        <Input
          style={styles.rowInput}
          label='Date'
          invalid={!inputs.date.isValid}
          textInputConfig={{
            onChangeText: (enteredValue) => {
              inputChangeHandler('date', enteredValue);
            },
            value: inputs.date.value,
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            autoCorrect: false,
          }}
        />
      </View>
      <Input
        label='Description'
        invalid={!inputs.description.isValid}
        textInputConfig={{
          onChangeText: (enteredValue) => {
            inputChangeHandler('description', enteredValue);
          },
          value: inputs.description.value,
          autoCorrect: false,
          multiline: true,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values, please check your entered data!
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button mode='flat' onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 24,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
