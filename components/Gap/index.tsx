import React from "react";
import { View } from "react-native";

interface GapProps {
  width?: number;
  height?: number;
}

const Gap = ({ height, width }: GapProps) => {
  return <View style={{ height: height, width: width }}></View>;
};

export default Gap;
