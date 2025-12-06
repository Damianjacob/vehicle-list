import { ThemedText } from "@/components/themed-text";
import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    return (
        <SafeAreaView>
            <Text>hello there</Text>
            <Link href="/car-detail">
                <ThemedText type="link">Go to car detail screen</ThemedText>
            </Link>
        </SafeAreaView>
    );
}
