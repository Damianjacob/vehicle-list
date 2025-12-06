import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

interface CheckboxProps {
    title: string;
    checked: boolean;
    onCheck: () => void;
    onUncheck: () => void;
}

const Checkbox = ({ title, onCheck, onUncheck, checked }: CheckboxProps) => {
    return (
        <Pressable
            style={styles.container}
            onPress={() => {
                checked ? onUncheck() : onCheck();
            }}
        >
            <MaterialCommunityIcons
                name={checked ? "checkbox-outline" : "checkbox-blank-outline"}
                size={24}
                color={checked ? "blue" : "gray"}
                hitslop={5}
            />
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
};

export default Checkbox;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
    },
});
