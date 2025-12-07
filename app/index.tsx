import FilterModal from "@/components/filter-modal";
import VehicleListItem from "@/components/vehicle-list-item";
import { CarsContext } from "@/providers/context-provider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
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
    const currentData = hasFiltersApplied
        ? filteredVehicles
        : showFavorites
        ? favorites
        : vehicles;

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
            <Text style={{ paddingHorizontal: 8 }}>
                {`Showing ${currentData.length} vehicles`}
            </Text>
            <FlatList
                data={currentData}
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
                style={{ flex: 1, paddingHorizontal: 8 }}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        {hasFiltersApplied
                            ? "No results matching your filters"
                            : showFavorites
                            ? "You don't have any favorites"
                            : "No vehicles available at this point. Please try again later"}
                    </Text>
                }
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
