import { ThemedText } from "@/components/themed-text";
import VehicleListItem from "@/components/vehicle-list-item";
import { CarsContext } from "@/providers/context-provider";
import { Link, useRouter } from "expo-router";
import { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    const { vehicles, addOrRemoveFavorite } = useContext(CarsContext);
    const router = useRouter();

    return (
        <SafeAreaView>
            <Text>Filter will go here</Text>
            <Link href="/cars/1">
                <ThemedText type="link">Go to car detail screen</ThemedText>
            </Link>
            <FlatList
                data={vehicles}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (
                    <VehicleListItem
                        vehicle={item}
                        onPressCard={() => {
                            router.push(`/cars/${item.id}`);
                        }}
                        onPressLike={addOrRemoveFavorite}
                    />
                )}
                style={{ paddingHorizontal: 16, marginVertical: 16 }}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            />
        </SafeAreaView>
    );
}
