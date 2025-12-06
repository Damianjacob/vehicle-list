import {
    CarsContext,
    vehicleMakes,
    vehicleModels,
} from "@/providers/context-provider";
import {
    Button,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import Checkbox from "./checkbox";
import NumberInput from "./number-input";

export interface FilterModalProps {
    modalOpen: boolean;
    onClose?: () => void;
}

const FilterModal = ({ modalOpen, onClose }: FilterModalProps) => {
    const {
        addMakesFilter,
        addModelsFilter,
        removeMakesFilter,
        removeModelsFilter,
        resetFilters,
        setMinStartingBid,
        setMaxStartingBid,
        filters,
    } = useContext(CarsContext);
    return (
        <Modal
            visible={modalOpen}
            allowSwipeDismissal
            animationType="slide"
            style={{ paddingBottom: 10 }}
        >
            <Ionicons
                name="close"
                size={28}
                onPress={onClose}
                style={styles.closeIcon}
                hitSlop={10}
            />
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Filters</Text>

                <Button title="reset all filters" onPress={resetFilters} />
                <Text style={styles.subheader}>Make</Text>
                {vehicleMakes.map((make) => (
                    <Checkbox
                        title={make}
                        key={make}
                        onCheck={() => addMakesFilter(make)}
                        onUncheck={() => removeMakesFilter(make)}
                        checked={filters.makes.includes(make)}
                    />
                ))}
                <Text style={styles.subheader}>Model</Text>
                {vehicleModels.map((model) => (
                    <Checkbox
                        title={model}
                        key={model}
                        onCheck={() => addModelsFilter(model)}
                        onUncheck={() => removeModelsFilter(model)}
                        checked={filters.models.includes(model)}
                    />
                ))}
                <Text style={styles.subheader}>Starting Bid Range</Text>
                <View style={styles.row}>
                    <NumberInput
                        value={
                            filters.minStartingBid
                                ? filters.minStartingBid.toString()
                                : ""
                        }
                        onChangeValue={(value) =>
                            setMinStartingBid(value ? Number(value) : undefined)
                        }
                        label="Min starting bid"
                    />
                    <NumberInput
                        value={
                            filters.maxStartingBid
                                ? filters.maxStartingBid.toString()
                                : ""
                        }
                        onChangeValue={(value) =>
                            setMaxStartingBid(value ? Number(value) : undefined)
                        }
                        label="Max starting bid"
                    />
                </View>
            </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        marginTop: 20,
    },
    closeIcon: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    subheader: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 8,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 32,
    },
});

export default FilterModal;
