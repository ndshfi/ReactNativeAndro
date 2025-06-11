import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Platform, TouchableOpacity, Alert, ToastAndroid} from "react-native";
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker';


const Rumah =({navigation, route}) =>{
    const editMode = route?.params?.editMode ?? false;
    const idUpdate = route?.params?.idUpdate;
    
    const [name, setName] = useState("");
    const [tanah, setTanah] = useState("");
    const [bangunan, setBangunan] = useState("");
    const [jenis, setJenis] = useState("");
    const [harga, setHarga] = useState("");
const [open, setOpen] = useState(false);

    const saveTask = async() =>{
        if(!name || !tanah || !bangunan ||!jenis){
            console.log("Please fill in all fields");
            Alert.alert("Please fill in all fields");
            return;
        }
        const newTask = {
            id:0,
            tanah: Number(tanah),
            bangunan: Number(bangunan),
            harga: Number(harga),
            name:name,
            jenis:jenis
        };
        const updateTask = {
            id:idUpdate,
            tanah: Number(tanah),
            bangunan: Number(bangunan),
            harga: Number(harga),
            name:name,
            jenis:jenis
        };
        try{
            let response;

            if(editMode){
                response = await axios.put("http://10.1.48.40:8080/Lippo", updateTask);
            }else{
                response = await axios.post("http://10.1.48.40:8080/Lippo", newTask);
            }
            console.log("Task Saved!", newTask);
            Alert.alert("Task saved successfully.");
            navigation.goBack();
        }catch(error){
            console.log("Failed to save task:", error.message);
        }
    }


    const fetchData = async () => {
        try{

            const response = await axios.get(`http://10.1.48.40:8080/Lippo/${idUpdate}`);
            console.log("Data Task", response.data);
            setName(response.data.name);
            setJenis(response.data.jenis);
            setHarga(String(response.data.harga));
            setTanah(String(response.data.tanah));
            setBangunan(String(response.data.bangunan));
        }catch(error){
            console.log("failed to fetch task: ", error.message)
        }
    }

    useEffect(() => {
        if(editMode) {
            console.log("Opened in edit mode, id: ", idUpdate);
            fetchData();
        }else{
        setName("Rumah Ku");
        }
    }, [idUpdate])

const updateHarga = (bangunanValue, tanahValue, jenisValue) => {
  const bangunanNum = Number(bangunanValue);
  const tanahNum = Number(tanahValue);
  let harga=0;

  if (jenisValue === 'Type X') {
    harga = (bangunanNum * tanahNum * 1000000) / 3;
  } else if (jenisValue === 'Type Y') {
    harga=bangunanNum * tanahNum * 750000;
  } else if (jenisValue === 'Type Z') {
    harga=bangunanNum * tanahNum * 2000000;
  }
      setHarga(String(harga));
}


    return(

        <SafeAreaView style={styles.container}>

            <Text style={styles.label}>Nama Rumah:</Text>
            <TextInput
            style={styles. input}
            onChangeText={setName}
            value={name}
            />

           <Text style={styles.label}>Jenis Rumah: </Text>
  <DropDownPicker
    open={open}
    value={jenis}
    items={[
      { label: 'Type X', value: 'Type X' },
      { label: 'Type Y', value: 'Type Y' },
      { label: 'Type Z', value: 'Type Z' }
    ]}
    setOpen={setOpen}
    setValue={setJenis}
    setItems={() => {}}
    placeholder="-- Pilih Jenis --"
    style={{ height: 40, borderColor: '#ccc', borderRadius: 5 }}
    dropDownContainerStyle={{ borderColor: '#ccc' }}
    textStyle={{ fontSize: 14 }}
  />

            <Text style={styles.label}>Luas Tanah:</Text>
            <TextInput
            style={styles. input}
            placeholder="Masukan luas tanah"
            value={tanah}
            onChangeText={setTanah}

            />

            <Text style={styles.label}>Luas Bangunan:</Text>
            <TextInput
                style={styles.input}
                placeholder="Masukan luas bangunan"
                value={bangunan}
                onChangeText={(text) => {
                    setBangunan(text);
                    updateHarga(text, tanah, jenis);
                }}
/>

            <Text style={styles.label}>Harga Tanah:</Text>
            <TextInput
            style={styles. input}
            placeholder="Harga Otomatis"
            editable={false}
            onChangeText={setHarga}
            value={harga}
            />          

            <View style={{ marginTop: 20 }}>
                <Button title="Save Task" onPress={saveTask} />
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

export default Rumah;

