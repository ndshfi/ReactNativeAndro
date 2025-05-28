import { useState } from "react";
import { Alert } from "react-native";

import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Pressable } from 'react-native';

import{
    Text,
    TextInput,
    Button,
    StyleSheet,
    SafeAreaView,
    View
} from "react-native";
import { Picker } from '@react-native-picker/picker';

const Task = ({ navigation }) => {
    const [id,setId]=useState("");
    const [task,setTask]=useState("");
const [date, setDate] = useState(new Date());
    const [status,setStatus]=useState("");
const [showPicker, setShowPicker] = useState(false);

     const styles =StyleSheet.create({
        container:{flex:1,backgroundColor: "#fff",paddingHorizontal:20},
        label: {marginTop: 15, fontWeight: "bold",fontSize:16,marginHorizontal: 10,
},
        input:{
            borderWidth:1,
            borderColor:"#ccc",
            borderRadius:6,
            padding:10,
            marginTop:3,
            marginBottom:5,
            marginHorizontal: 10,
        },
    });

    const onChangeDate = (event, selectedDate) => {
  setShowPicker(Platform.OS === 'ios'); 
  if (selectedDate) setDate(selectedDate);
};

    const saveTask=()=>{
        if(!id||!task||!date||!status){
                    console.log("Please fill in all fields! ");
  Alert.alert("Validation Error", "Please fill in all fields");
            return;
        }
        const newTask={
            id,
            task,
            date,
            status,
        };
        console.log("Task saved! ",newTask);
        navigation.goBack();
    }
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>ID: </Text>
            <TextInput
            style={styles.input}
            placeholder="Enter ID"
            value={id}
            onChangeText={setId}
            keyboardType="numeric"
            />

            <Text style={styles.label}>Task Name: </Text>
            <TextInput
            style={styles.input}
            placeholder="Enter task"
            value={task}
            onChangeText={setTask}
            />

             <Text style={styles.label}>Date: </Text>
<Pressable onPress={() => setShowPicker(true)} style={styles.input}>
  <Text>{date.toLocaleString()}</Text>
</Pressable>

{showPicker && (
  <DateTimePicker
    value={date}
    mode="datetime"
    display="default"
    onChange={onChangeDate}
  />
)}

            <Text style={styles.label}>Status: </Text>
            <View style={styles.input}>
            <Picker
                selectedValue={status}
                onValueChange={(itemValue) => setStatus(itemValue)}
            >
                <Picker.Item label="-- Select Status --" value="" />
                <Picker.Item label="Pending" value="Pending" />
                <Picker.Item label="Completed" value="Completed" />
            </Picker>
            </View>

<View style={{ color:"#000000", marginHorizontal: 10, marginTop: 20 }}>
  <Button title="Save Task" onPress={saveTask} />
</View>
        </SafeAreaView>
    );
}
export default Task;
