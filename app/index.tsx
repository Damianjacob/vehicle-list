import VehicleListItem from "@/components/vehicle-list-item";
import { CarsContext } from "@/providers/context-provider";
import { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    const { vehicles, addOrRemoveFavorite } = useContext(CarsContext);
    return (
        <SafeAreaView>
            <Text>Filter will go here</Text>
            {/* <Link href="/car-detail">
                <ThemedText type="link">Go to car detail screen</ThemedText>
            </Link> */}
            <FlatList
                data={vehicles}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (
                    <VehicleListItem
                        vehicle={item}
                        onPressCard={() => {}}
                        onPressLike={addOrRemoveFavorite}
                    />
                )}
                style={{ paddingHorizontal: 16, marginVertical: 16 }}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            />
        </SafeAreaView>
    );
}
