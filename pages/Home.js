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

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      axios
      .get("http://10.1.48.40:8080/Taskss")
      .then((res)=>{
        setTasks(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
      // const initialTasks = [
      //   { id: "1", task: "Buy groceries on Supermarket", date: "Feb 12, 2022 at 3.15 PM", status: "Pending" },
      //   { id: "2", task: "Finish homework", date: "Aug 03, 2021 at 10.00 AM", status: "Completed" },
      //   { id: "3", task: "Call mom", date: "May 28, 2023 at 7.30 AM", status: "Pending" },
      //   {id:"4",task:"Go for a run",date:"Nov 17, 2022 at 6.00 AM",status:"Completed"},
      //   {id:"5",task:"Read a book",date:"Jan 04, 2023 at 8.45 PM",status:"Pending"},
      //   {id:"6",task:"Write a blog post",date:"Sep 21, 2024 at 11.30 AM",status:"Completed"},
      //   {id:"7",task:"Attend a meeting",date:"Jun 14, 2021 at 1.00 PM",status:"Pending"},
      //   {id:"8",task:"Clean the house",date:"Dec 30, 2023 at 9.00 AM",status:"Completed"},
      //   {id:"9",task:"Practice playing guitar",date:"Mar 08, 2022 at 5.00 PM",status:"Pending"},
      //   {id:"10",task:"Plan vacation",date:"Jul 19, 2023 at 3.45 PM",status:"Completed"},
      //   {id:"11",task:"Go to the dentist",date:"Apr 25, 2024 at 10.00 AM",status:"Pending"},
      //   {id:"12",task:"Finish project",date:"Oct 06, 2022 at 6.30 PM",status:"Completed"},
      //   {id:"13",task:"Do laundry",date:"Jan 15, 2023 at 12.00 PM",status:"Pending"},
      //   {id:"14",task:"Cook dinner",date:"Feb 20, 2022 at 7.00 PM",status:"Completed"},
      //   {id:"15",task:"Study for test",date:"Mar 03, 2023 at 4.30 PM",status:"Pending"},
      //   {id:"16",task:"Watch a movie",date:"Sep 27, 2021 at 9.15 PM",status:"Completed"},
      //   {id:"17",task:"Pay bills",date:"Jun 01, 2022 at 2.00 PM",status:"Pending"},
      //   {id:"18",task:"Exercise",date:"May 10, 2024 at 7.30 AM",status:"Completed"},
      //   {id:"19",task:"Call friend",date:"Jul 22, 2021 at 8.00 PM",status:"Pending"},
      //   {id:"20",task:"Visit grandma",date:"Dec 18, 2023 at 11.45 AM",status:"Completed"},
      //   {id:"21",task:"Go shopping",date:"Nov 11, 2022 at 1.30 PM",status:"Pending"},
      //   {id:"22",task:"Feed the cat",date:"Apr 07, 2023 at 6.00 AM",status:"Completed"},
      //   {id:"23",task:"Book a hotel",date:"Oct 31, 2024 at 3.00 PM",status:"Pending"},
      //   {id:"24",task:"Repair bike",date:"Aug 09, 2021 at 5.15 PM",status:"Completed"},
      //   {id:"25",task:"Organize desk",date:"May 16, 2023 at 10.30 AM",status:"Pending"},
      //   {id:"26",task:"Update resume",date:"Jan 29, 2022 at 9.00 AM",status:"Completed"},
      //   {id:"27",task:"Bake a cake",date:"Sep 02, 2024 at 4.00 PM",status:"Pending"},
      //   {id:"28",task:"Go hiking",date:"Jul 08, 2023 at 8.00 AM",status:"Completed"},
      //   {id:"29",task:"Meditate",date:"Mar 13, 2022 at 7.45 AM",status:"Pending"},
      //   {id:"30",task:"Fix sink",date:"Jun 26, 2021 at 2.30 PM",status:"Completed"}  
      //   ];
      // setTasks(initialTasks);
      // setIsLoading(false);
    }, 2000);
  }, [tasks]);

  const filterTasks = tasks.filter((item) => {
    const taskName = item.task.toLowerCase();
    const searchText = search.toLowerCase();
    return taskName.includes(searchText);
  });

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4cd964" />
        <Text style={{ marginTop: 10 }}>Loading Data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={{ fontSize: 20 }}>Nilai yang diketikkan: {search}</Text> */}
      <FlatList
        data={filterTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>To Do List</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              console.log(item.task);
            }}
          >
            <View style={styles.taskItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.taskTitle}>{item.task}</Text>
                <Text style={styles.taskDate}>{item.date}</Text>
              </View>
              <View style={styles.rightSide}>
                <View
                  style={[
                    styles.statusBadge,
                    item.status === "Completed" ? styles.completed : styles.pending,
                  ]}
                >
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#888" />
              </View>
            </View>
          </TouchableOpacity>
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

export default Home;
