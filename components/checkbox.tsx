import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface CheckboxProps {
    title: string;
    checked: boolean;
    onCheck: () => void;
    onUncheck: () => void;
}

const Checkbox = ({ title, onCheck, onUncheck, checked }: CheckboxProps) => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons
                onPress={() => {
                    checked ? onUncheck() : onCheck();
                }}
                name={checked ? "checkbox-outline" : "checkbox-blank-outline"}
                size={24}
                color={checked ? "blue" : "gray"}
            />
            <Text>{title}</Text>
        </View>
    );
};

export default Checkbox;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
});
