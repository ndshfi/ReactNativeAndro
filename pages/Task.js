import { useEffect, useState } from "react";
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

const Task = ({ navigation,route }) => {
const editMode = route?.params?.editMode ?? false;
const idupdate = route?.params?.idupdate ?? false;

const fetchData = async () => {
  try{
    const response = 
await axios.get(`http://10.1.48.40:8080/Taskss/${idupdate}`);
    console.log("Data task: ", response.data);
    setId(String(response.data.id));
    setTask(response.data.task);
    setStatus(response.data.status);
    setDate(response.data.date);
  }catch(error){
    console.log("Failed to fetch task update: ", error.message);
  }
};

useEffect(()=>{
  if(editMode){
    console.log("Opened in edit mode id: ",idupdate);
    fetchData();
  }
},[]);

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
            id:Number(id),
            task,
            date:formattedDate,
            status,
        };
console.log("Sending newTask:",newTask);

       try {
  let response;
  if (editMode) {
    console.log("Sending PUT request to backend with:", newTask);

    response = await axios.put(
      "http://10.1.48.40:8080/Tasks",
      newTask
    );

    console.log("PUT response:", response.data);
  } else {
    console.log("Sending POST request to backend with:", newTask);

    response = await axios.post(
      "http://10.1.48.40:8080/Tasks",
      newTask
    );

    console.log("POST response:", response.data);
  }

  console.log("Task saved!", newTask);
  Alert.alert("Success", "Task saved!");
  navigation.goBack();

} catch (error) {
  // Tambahkan info lengkap error dari axios
  console.log("Failed to save task:");
  console.log("Message:", error.message);
  console.log("Status:", error.response?.status);
  console.log("Data:", error.response?.data);

  Alert.alert(
    "Error",
    `(${error.response?.status || 'Unknown'}) ${error.response?.data?.message || error.message}`
  );
}

    
    };

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>ID: </Text>
           <TextInput
  style={[styles.input, editMode && { backgroundColor: '#f0f0f0' }]}
  placeholder="Enter ID"
  value={id}
  onChangeText={setId}
  keyboardType="numeric"
  editable={!editMode}
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
<Text>{date ? date.toLocaleString() : 'Pilih tanggal'}</Text>
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
  onPress={() => {
    console.log("Save button pressed");
      console.log("editMode:", editMode);  // Tambahkan ini!
    saveTask();
  }}
  color="#007bff" 
/>

</View>
        </SafeAreaView>
    );
}
export default Task;
