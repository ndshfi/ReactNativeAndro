import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Home from './pages/Home';
import Task from './pages/Task';
import Summary from './pages/Summary';
import Pending from './pages/Pending';
import Completed from './pages/Completed';

import ContactHome from './pages/kontak';
import ContactDetail from './pages/detail';

import Controller from './pages/Controller';
import Rumah from './pages/Rumah';


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
    title: "To Do",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="list" color={color} size={size} />
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Task')}
        style={{ marginRight: 15 }}
      >
        <Ionicons name="add" size={28} color="#007AFF" />
      </TouchableOpacity>
    ),
    headerTitle: 'To Do',
  })}
/>

    <Tab.Screen
  name="SummaryTab"
  component={Summary}
  options={({ navigation }) => ({
    title: "Rumah",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="home" color={color} size={size} />
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Rumah')}
        style={{ marginRight: 15 }}
      >
        <Ionicons name="add" size={28} color="#007AFF" />
      </TouchableOpacity>
    ),
    headerTitle: 'Rumah',
  })}
/>

    </Tab.Navigator>
  );
}


function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MainTabs" component={TabNavigator} options={{ title: "Main" }} />
      <Drawer.Screen name="Image" component={Pending} />
      <Drawer.Screen name="Completed" component={Completed} />
      <Drawer.Screen name="Kontak" component={ContactHome} />
      <Drawer.Screen name="Controller" component={Controller} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
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
        <Stack.Screen name="Rumah" component={Rumah} />

        <Stack.Screen name="ContactHome" component={ContactHome} options={{ title: 'Kontak Mahasiswa' }} />
<Stack.Screen name="ContactDetail" component={ContactDetail} options={{ title: 'Detail Kontak' }} />

      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
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
