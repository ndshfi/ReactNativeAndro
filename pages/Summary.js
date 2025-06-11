import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Swipeable } from "react-native-gesture-handler";

const Summary = ({navigation}) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      axios
      .get("http://10.1.48.40:8080/Lippos")
      .then((res)=>{
        setTasks(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
    
    }, 2000);
  }, [tasks]);



  const filterTasks = tasks.sort((terbesar, terkecil) => terkecil.harga - terbesar.harga);
  //  => {
  //   const taskName = item.name;
  //   const searchText = search;
  //   return taskName;
  // };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4cd964" />
        <Text style={{ marginTop: 10 }}>Loading Data...</Text>
      </SafeAreaView>
    );
  }

const deleteTask = async (iddelete)=>{
  try{
await axios.delete(`http://10.1.48.40:8080/Lippo/${iddelete}`);

  }catch(error){
    console.log("Failed to fetch task delete: ",error.message);
  }
}

const renderRightActions = () => {
  return (
    <View
      style={{
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: "100%",
      }}
    >
      <Text style={{ color: "white" }}>Delete</Text>
    </View>
  );
};


  return (
    <SafeAreaView style={styles.container}>
      {}
      <FlatList
        data={filterTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Daftar Rumah</Text>

          </>
        }
        renderItem={({ item }) => (
<Swipeable
  onSwipeableOpen={() => deleteTask(item.id)}
  renderRightActions={renderRightActions}
>
  
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Rumah",{
                editMode:true,
                idUpdate:item.id,
            });
              console.log(item.name,item.id);
            }}
          >
            <View style={styles.taskItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.taskTitle}>{item.name}</Text>
                <Text style={styles.taskDate}>{item.jenis}</Text>
              </View>
              <View style={styles.rightSide}>
                  <Text style={styles.taskTitle}>Rp. {item.harga.toString()}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#888" />
              </View>
          </TouchableOpacity>
          </Swipeable>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 10,
  },
  searchInput: {
    backgroundColor: "#f1f1f1",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  taskDate: {
    color: "#555",
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 8,
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  pending: {
    backgroundColor: "#f90",
  },
  completed: {
    backgroundColor: "#4cd964",
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default Summary;
