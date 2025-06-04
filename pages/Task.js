import { useState } from "react";
import { Alert } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

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
import axios from "axios";

const Task = ({ navigation }) => {
    const [id,setId]=useState("");
    const [task,setTask]=useState("");
const [date, setDate] = useState(new Date());
    const [status,setStatus]=useState("");
const [showPicker, setShowPicker] = useState(false);
const [open, setOpen] = useState(false);


const [items, setItems] = useState([
  { label: '-- Select Status --', value: '' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Completed', value: 'Completed' }
]);


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

function formatDateToMySQL(date) {
  const pad = (n) => (n < 10 ? '0' + n : n);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

    const saveTask=async()=>{
        if(!id||!task||!date||!status){
                    console.log("Please fill in all fields! ");
  Alert.alert("Validation Error", "Please fill in all fields");
            return;
        }
        const formattedDate = formatDateToMySQL(date);

        const newTask={
            id,
            task,
            date:formattedDate,
            status,
        };
console.log("Sending newTask:",newTask);

        try{
            const response = await axios.post(
                "http://10.1.48.40:8080/Tasks",
                newTask
            );
        console.log("Task saved! ",newTask);
          Alert.alert("Success", "Task saved!");
        navigation.goBack();
        }catch (error){
            console.log("Failed to save task: ", error.message);
              Alert.alert("Validation Error", "Failed to save task");
        }
    
    };

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
<View style={{ marginHorizontal: 10 }}>
  <DropDownPicker
    open={open}
    value={status}
    items={[
      { label: '-- Select Status --', value: '' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Completed', value: 'Completed' }
    ]}
    setOpen={setOpen}
    setValue={setStatus}
    setItems={() => {}}
    placeholder="-- Select Status --"
    style={{ height: 40, borderColor: '#ccc', borderRadius: 5 }}
    dropDownContainerStyle={{ borderColor: '#ccc' }}
    textStyle={{ fontSize: 14 }}
  />
</View>




<View style={{ color:"#000000", marginHorizontal: 10, marginTop: 20 }}>
<Button
  title="Save Task"
  onPress={saveTask}
  color="#007bff" 
/>
</View>
        </SafeAreaView>
    );
}
export default Task;
