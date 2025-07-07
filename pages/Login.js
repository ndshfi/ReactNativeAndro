import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Platform, TouchableOpacity, Alert, ToastAndroid} from "react-native";
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import IndexSalaries from "./indexSalaries";


const Login =({navigation, route}) =>{
    
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
const [open, setOpen] = useState(false);

    const saveTask = async() =>{
        if(!Username || !Password){
            console.log("Please fill in all fields");
            Alert.alert("Please fill in all fields");
            return;
        }
        try{    
            const response = await axios.get("http://10.1.48.40:8080/Users/"+Username);
            const user = response.data;
            if(!user){
                console.log("Username not found");
                Alert.alert("Username not found");
                return;
            }
            if(user.password === Password && user.username === Username){
                console.log(user.password, user.username);
                Alert.alert("Login successfully.");
                navigation.navigate('MainTabs', { screen: 'IndexSalaries' });
            } else {
                Alert.alert("Wrong username or password");
            }
        }catch(error){
            console.log("Wrong username or password");
            Alert.alert("Wrong username or password");
        }
    }
       

    return(

        <SafeAreaView style={styles.container}>

            <Text style={styles.label}>Username:</Text>
            <TextInput
            style={styles. input}
            onChangeText={setUsername}
            value={Username}
            />

            
            <Text style={styles.label}>Password:</Text>
            <TextInput
            style={styles. input}
            onChangeText={setPassword}
            value={Password}
            />

           

            <View style={{ marginTop: 20 }}>
                <Button title="Login" onPress={saveTask} />
            </View>

        </SafeAreaView>
    );
};

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
            paddingHorizontal: 20,
        },
        label:{
            marginTop: 15,
            fontWeight: "bold",
            fontSize: 16,
        },
        input: {
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 6,
            padding: 10,
            marginTop: 5,
        },
        buttonContainer: {
            marginTop: 10,
        },
        picker: {
            height: 50,
            width: "100%",
        },
        pickerContainer: {
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 6,
            marginTop: 5,
        },
    });

// Tambahkan opsi navigation agar headerLeft (drawer icon) hilang di halaman Login
Login.navigationOptions = {
    headerLeft: () => null,
};

export default Login;

