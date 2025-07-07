import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Platform, TouchableOpacity, Alert, ToastAndroid} from "react-native";
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";


const Salaries =({navigation, route}) =>{
    const editMode = route?.params?.editMode ?? false;
    const idUpdate = route?.params?.idUpdate;
    
    const [Nama, setNama] = useState("");
    const [JamKer, setJamKer] = useState("");
    const [Lembur, setLembur] = useState("");
    const [Golongan, setGolongan] = useState("");
    const [Total, setTotal] = useState("");
    const [Tanggal, setTanggal] = useState("");
const [open, setOpen] = useState(false);

    const saveTask = async() =>{
        if(Number(JamKer)<1){
            console.log("Hari kerja minimal 1");
            Alert.alert("Hari kerja minimal 1");
            return;
        }

        if(Number(Lembur)>4){
            console.log("Hari lembur maximal 4");
            Alert.alert("Hari lembur maximal 4");
            return;
        }
        const newTask = {
            nomor:0,
            date: Tanggal,
            name_employee: Nama,
            working_days: Number(JamKer),
            overtime_days:Number(Lembur),
            position:Golongan,
            total_salary:Number(Total)
        };
        const updateTask = {
            nomor:idUpdate,
            date: Tanggal,
            name_employee: Nama,
            working_days: Number(JamKer),
            overtime_days:Number(Lembur),
            position:Golongan,
            total_salary:Number(Total)
        };
        try{
            let response;

            if(editMode){
                response = await axios.put("http://10.1.48.40:8080/Salaries", updateTask);
            }else{
                response = await axios.post("http://10.1.48.40:8080/Salaries", newTask);
            }
            console.log("Salaries Saved!", newTask);
            Alert.alert("Salaries saved successfully.");
            navigation.goBack();
        }catch(error){
            console.log("Failed to save Salaries:", error.message);
        }
    }


    const fetchData = async () => {
        try{

            const response = await axios.get(`http://10.1.48.40:8080/Salaries/${idUpdate}`);
            console.log("Data Task", response.data);
            setNama(response.data.name_employee);
            setGolongan(response.data.position);
            setTanggal(String(response.data.date));
            setJamKer(String(response.data.working_days));
            setLembur(String(response.data.overtime_days));
            setTotal(String(response.data.total_salary));
        }catch(error){
            console.log("failed to fetch task: ", error.message)
        }
    }


        useEffect(() => {
        if(editMode) {
            console.log("Opened in edit mode, id: ", idUpdate);
            fetchData();
        }else{
        }
    }, [idUpdate])

const updateTotal = (GolonganValue, JamKerValue, LemburValue) => {
  const golonganNum = Number(GolonganValue);
  const jamkerNum = Number(JamKerValue);
  const lemburNum = Number(LemburValue);
  let total=0;

  if (golonganNum ===1) {
    total = (1500000) +  (150000*jamkerNum) +  (15000*jamkerNum*lemburNum);
  } else if (golonganNum ===2) {
    total = (2500000) +  (250000*jamkerNum) +  (25000*jamkerNum*lemburNum);
  } else if (golonganNum ===3) {
    total = (5000000) +  (500000*jamkerNum) +  (50000*jamkerNum*lemburNum);
  }
      setTotal(String(total));
}


    return(

        <SafeAreaView style={styles.container}>

            <Text style={styles.label}>Tanggal:</Text>
            <TextInput
            style={styles. input}
            onChangeText={setTanggal}
            value={Tanggal}
            />

            <Text style={styles.label}>Nama Karyawan:</Text>
            <TextInput
            style={styles. input}
            onChangeText={setNama}
            value={Nama}
            />

           <Text style={styles.label}>Golongan: </Text>
  <DropDownPicker
    open={open}
    value={Golongan}
    items={[
      { label: 'Golongan I', value: '1' },
      { label: 'Golongan II', value: '2' },
      { label: 'Golongan III', value: '3' }
    ]}
    setOpen={setOpen}
    setValue={setGolongan}
    setItems={() => {}}
    placeholder="-- Pilih Golongan --"
    style={{ height: 40, borderColor: '#ccc', borderRadius: 5 }}
    dropDownContainerStyle={{ borderColor: '#ccc' }}
    textStyle={{ fontSize: 14 }}
  />

            <Text style={styles.label}>Hari Kerja:</Text>
            <TextInput
            style={styles.input}
            placeholder="Masukan hari kerja"
            value={JamKer}
            onChangeText={setJamKer}

            />

            <Text style={styles.label}>Hari Lembur:</Text>
            <TextInput
                style={styles.input}
                placeholder="Masukan hari lembur"
                value={Lembur}
                onChangeText={(text) => {
                    setLembur(text);
                    updateTotal(Golongan, JamKer, text);
                }}
/>

            <Text style={styles.label}>Total Gaji:</Text>
            <TextInput
            style={styles. input}
            placeholder="Total Gaji"
            editable={false}
            onChangeText={setTotal}
            value={Total}
            />          

            <View style={{ marginTop: 20 }}>
                <Button title="Save" onPress={saveTask} />
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

export default Salaries;

