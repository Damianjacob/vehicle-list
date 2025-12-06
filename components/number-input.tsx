import { StyleSheet, Text, TextInput, View } from "react-native";

interface NumberInputProps {
    onChangeValue: (value: string) => void;
    value: string;
    label: string;
}

const NumberInput = ({ onChangeValue, value, label }: NumberInputProps) => {
    // const [value, setValue] = useState("");

    const handleChange = (text: string) => {
        const numericOnly = text.replace(/[^0-9]/g, "");
        // setValue(numericOnly);
        if (numericOnly !== value) {
            onChangeValue(numericOnly);
        }
    };

    return (
        <View style={styles.container}>
            <Text>{label}</Text>
            <TextInput
                keyboardType="numeric"
                value={value}
                onChangeText={handleChange}
                style={styles.input}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
    },
    input: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "lightgray",
        paddingVertical: 2,
        paddingHorizontal: 4,
    },
});

export default NumberInput;
