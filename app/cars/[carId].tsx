import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { CarsContext } from "@/providers/context-provider";
import { getTimeUntilAuction } from "@/utils/date-utils";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CarDetail() {
    const { carId } = useLocalSearchParams();
    const { vehicles, addOrRemoveFavorite } = useContext(CarsContext);
    const vehicle = vehicles.find((v) => v.id === Number(carId));

    const defaultImage = require("../../assets/images/car-placeholder.png");

    if (!vehicle) {
        return (
            <SafeAreaView style={styles.center}>
                <ThemedText type="title">Vehicle not found</ThemedText>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image
                    source={defaultImage}
                    style={styles.imageFull}
                    resizeMode="cover"
                />

                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.headerText}>
                            {vehicle.year} {vehicle.make} {vehicle.model}
                        </Text>
                        <Pressable
                            style={styles.heartButton}
                            onPress={() => addOrRemoveFavorite(vehicle.id)}
                        >
                            <Ionicons
                                name={
                                    vehicle.favourite
                                        ? "heart"
                                        : "heart-outline"
                                }
                                size={28}
                                color={vehicle.favourite ? "red" : "gray"}
                            />
                        </Pressable>
                    </View>

                    <View style={styles.row}>
                        <Text>
                            {vehicle.engineSize} {vehicle.fuel}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text>Mileage: {vehicle.mileage}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text>
                            <Ionicons name="time-outline" size={16} />{" "}
                            {getTimeUntilAuction(vehicle.auctionDateTime)}
                        </Text>
                        <Text>
                            Starting Bid:{" "}
                            <Text style={{ fontWeight: "bold" }}>
                                €{vehicle.startingBid}
                            </Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.infoTitle}>Info</Text>
                    <Text style={styles.infoText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollContent: {
        paddingBottom: 24,
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    imageFull: {
        width: "100%",
        height: 240,
        backgroundColor: "lightgray",
    },
    card: {
        margin: 12,
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "lightgray",
        backgroundColor: "white",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 6,
        alignItems: "center",
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 16,
    },
    heartButton: {
        padding: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    infoSection: {
        marginHorizontal: 12,
        marginTop: 8,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "lightgray",
        backgroundColor: "white",
    },
    infoTitle: {
        fontWeight: "bold",
        marginBottom: 8,
    },
    infoText: {
        color: "#333",
        lineHeight: 18,
    },
});
