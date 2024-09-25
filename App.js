import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageExpensesScreen from './screens/ManageExpensesScreen';
import RecentExpensesScreen from './screens/RecentExpensesScreen';
import AllExpensesScreen from './screens/AllExpensesScreen';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';
import { StatusBar } from 'expo-status-bar';

const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabsScreens() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: 'white',
        headerRight: ({ tintColor }) => (
          <IconButton
            name='add'
            color={tintColor}
            size={18}
            onPress={() => {
              navigation.navigate('ManageExpenses');
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name='AllExpenses'
        component={AllExpensesScreen}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ size, color }) => {
            return <Ionicons name='calendar' color={color} size={size} />;
          },
        }}
      />
      <BottomTabs.Screen
        name='RecentExpenses'
        component={RecentExpensesScreen}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent Expenses',
          tabBarIcon: ({ size, color }) => {
            return <Ionicons name='hourglass' color={color} size={size} />;
          },
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
              },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              name='OverviewExpenses'
              component={BottomTabsScreens}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='ManageExpenses'
              component={ManageExpensesScreen}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
