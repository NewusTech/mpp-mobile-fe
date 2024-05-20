import { GapProps } from "@/types/type";
import React from "react";
import { View } from "react-native";

const Gap = ({ height, width }: GapProps) => {
  return <View style={{ height: height, width: width }}></View>;
};

export default Gap;
