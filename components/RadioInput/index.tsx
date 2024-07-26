import { RadioButtonProps } from "@/types/type";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const CustomRadioButton = ({
  label,
  onPress,
  isSelected,
}: RadioButtonProps) => {
  return (
    <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
      <View
        style={[styles.radioButton, isSelected && styles.radioButtonSelected]}
      >
        {isSelected && <View style={styles.radioButtonInner} />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: "#000",
  },
  radioButtonInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#000",
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default CustomRadioButton;
