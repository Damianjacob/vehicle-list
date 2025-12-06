import { Car } from "@/types/cars";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export interface VehicleListItemProps {
    vehicle: Car;
    onPressCard: () => void;
    onPressLike: (id: number) => void;
}

const defaultImage = require("../assets/images/car-placeholder.png");
const VehicleListItem = ({
    vehicle,
    onPressCard,
    onPressLike,
}: VehicleListItemProps) => {
    // require the local image. Replace 'car.png' with your actual asset filename.

    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image
                    source={defaultImage}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.infoContainer}>
                <View style={[styles.row]}>
                    <Text style={styles.headerText}>
                        {vehicle.year} {vehicle.make} {vehicle.model}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text>
                        {vehicle.fuel} {vehicle.engineSize} {vehicle.mileage}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text>
                        {vehicle.auctionDateTime} {vehicle.startingBid}
                    </Text>
                </View>
            </View>
            <Pressable
                style={styles.iconContainer}
                onPress={() => onPressLike(vehicle.id)}
            >
                <Ionicons
                    name={vehicle.favourite ? "heart" : "heart-outline"}
                    size={32}
                    color={vehicle.favourite ? "red" : "gray"}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        minHeight: 20,
        flexDirection: "row",
        borderRadius: 8,
        overflow: "hidden",
        borderColor: "lightgray",
        borderWidth: 1,
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "lightblue",
    },
    infoContainer: {
        flex: 3,
    },
    iconContainer: {
        flex: 1,

        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "auto",
        height: 40,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
    },
    headerText: {
        fontWeight: "bold",
    },
});

export default VehicleListItem;
