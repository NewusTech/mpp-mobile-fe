// components/Accordion.js
import React, { useRef, useState } from "react";
import { View, Text, Pressable, Animated, Image } from "react-native";
import { AccordionProps } from "@/types/type";
import { icons } from "@/constants";

interface AccordionComponentProps extends AccordionProps {
  isExpanded: boolean;
  onPress: () => void;
}

const Accordion = ({
  title,
  children,
  isExpanded,
  onPress,
}: AccordionComponentProps) => {
  const [animation] = React.useState(new Animated.Value(isExpanded ? 1 : 0));
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<View>(null);

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  const rotateAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const heightAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight], // This will be replaced by the actual height later
  });

  return (
    <View className="w-full mt-4">
      <Pressable
        onPress={onPress}
        className={`bg-primary-700 flex flex-row p-4 items-center justify-between transition-all duration-300 ${
          isExpanded ? "rounded-t-md" : "rounded-md"
        }`}
      >
        <Text className="text-neutral-50 text-xs font-semibold">{title}</Text>
        <Animated.View style={{ transform: [{ rotate: rotateAnimation }] }}>
          <Image source={icons.chevronDownWhite} className="w-8 h-8" />
        </Animated.View>
      </Pressable>
      <Animated.View
        className="bg-neutral-300"
        style={[
          {
            overflow: "hidden",
            height: heightAnimation,
          },
        ]}
      >
        {isExpanded && (
          <View
            ref={contentRef}
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setContentHeight(height);
            }}
            className="px-2 py-4"
          >
            {children}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default Accordion;
