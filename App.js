import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import Home from './pages/Home';
import Task from './pages/Task';
import Summary from './pages/Summary';
import Pending from './pages/Pending';
import Completed from './pages/Completed';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
<Tab.Screen
  name="HomeTab"
  component={Home}
  options={({ navigation }) => ({
    title: "Home",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="home" color={color} size={size} />
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Task')}
        style={{ marginRight: 15 }}
      >
        <Ionicons name="add" size={28} color="#007AFF" />
      </TouchableOpacity>
    ),
    headerTitle: 'Home',
  })}
/>

      <Tab.Screen
        name="Summary"
        component={Summary}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MainTabs" component={TabNavigator} options={{ title: "Main" }} />
      <Drawer.Screen name="Pending" component={Pending} />
      <Drawer.Screen name="Completed" component={Completed} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DrawerHome">
        <Stack.Screen
          name="DrawerHome"
          component={DrawerNavigator}
          options={({ navigation }) => ({
            headerTitle: 'SantaiApp',
          })}
        />
        <Stack.Screen name="Task" component={Task} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
