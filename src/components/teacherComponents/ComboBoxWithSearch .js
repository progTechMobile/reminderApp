import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import { getAllTeacherRaitings } from "./../../services/teacherService";

export default ComboBoxWithSearch = ({onTeacherData}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [itemsFiltered, setItemsFiltered] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedData, setSelectedData] = useState({
    createdAt: "",
    email: "",
    full_name: "",
    observation: "",
    score: null,
    updatedAt: "",
  });

  useEffect(() => {
    const getTeacherRaitings = async () => {
      const teacherRaitings = await getAllTeacherRaitings();
      setTeachers(teacherRaitings);
      const itemsTransformed = await teacherRaitings.map((teacher) => {
        return {
          id: teacher.id,
          name: teacher.full_name,
        };
      });
      setItems(itemsTransformed);
      setItemsFiltered(itemsTransformed);
    };
    getTeacherRaitings();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      let selected = teachers.find((i) => i.id == selectedItem);
      delete selected.id;
      delete selected.score;
      delete selected.observation;
      delete selected.createdAt;
      delete selected.updatedAt;
      setSelectedData(selected);
      onTeacherData(selected);
    }
  }, [selectedItem]);

  const searchValue = (text) => {
    if (text) {
      let newItems = items.filter((i) => {
        const fullNameLowerCase = i.name && i.name.toLowerCase();
        return (
          fullNameLowerCase && fullNameLowerCase.includes(text.toLowerCase())
        );
      });
      setItemsFiltered(newItems);
    } else {
      setItemsFiltered(items);
    }
  };

  return (
    <View style={styles.container}>
      <SearchableDropdown
        textInputProps={{
          onTextChange: (text) => searchValue(text),
          placeholder: "Busque un profesor",
          underlineColorAndroid: "transparent",
          resetValue:true
        }}
        onItemSelect={(item) => setSelectedItem(item.id)}
        containerStyle={{ padding: 5 }}
        textInputStyle={{ padding: 12, borderWidth: 1, borderColor: "#ccc" }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: "#ddd",
          borderColor: "#bbb",
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{ color: "#222" }}
        itemsContainerStyle={{ maxHeight: 100 }}
        items={itemsFiltered || []}
        listProps={{
          nestedScrollEnabled: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
  },
});
