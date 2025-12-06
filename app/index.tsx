import FilterModal from "@/components/filter-modal";
import VehicleListItem from "@/components/vehicle-list-item";
import { CarsContext } from "@/providers/context-provider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    const {
        vehicles,
        addOrRemoveFavorite,
        hasFiltersApplied,
        filteredVehicles,
        showFavorites,
        toggleShowFavorites,
        favorites,
    } = useContext(CarsContext);
    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.filterRow}>
                <Ionicons
                    name="heart"
                    size={36}
                    color={showFavorites ? "red" : "gray"}
                    onPress={toggleShowFavorites}
                />
                <View>
                    <MaterialCommunityIcons
                        name={
                            hasFiltersApplied
                                ? "filter-variant-plus"
                                : "filter-variant"
                        }
                        size={36}
                        color={hasFiltersApplied ? "blue" : "gray"}
                        onPress={() => setModalOpen(true)}
                    />
                </View>
            </View>
            <FlatList
                data={
                    hasFiltersApplied
                        ? filteredVehicles
                        : showFavorites
                        ? favorites
                        : vehicles
                }
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
                style={{ flex: 1 }}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            />
            <FilterModal
                modalOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    filterRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
});
