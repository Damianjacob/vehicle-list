import { Car } from "@/types/cars";
import { Filters } from "@/types/filters";
import { createContext, PropsWithChildren, useMemo, useState } from "react";
import data from "../vehicles.json";

export const vehicleMakes = Array.from(new Set(data.map((item) => item.make)));
export const vehicleModels = Array.from(
    new Set(data.map((item) => item.model))
);

export interface CarsContextType {
    vehicles: Car[];
    filteredVehicles: Car[];
    addOrRemoveFavorite: (id: number) => void;
    addMakesFilter: (make: string) => void;
    removeMakesFilter: (make: string) => void;
    addModelsFilter: (model: string) => void;
    removeModelsFilter: (model: string) => void;
    setMinStartingBid: (value: number | undefined) => void;
    setMaxStartingBid: (value: number | undefined) => void;
    resetStartingBids: () => void;
    resetFilters: () => void;
    filters: Filters;
    showFavorites: boolean;
    favorites: Car[];
    toggleShowFavorites: () => void;
    hasFiltersApplied?: boolean;
}

export const CarsContext = createContext<CarsContextType>({
    vehicles: [],
    filteredVehicles: [],
    addOrRemoveFavorite: () => {},
    addMakesFilter: () => {},
    removeMakesFilter: () => {},
    addModelsFilter: () => {},
    removeModelsFilter: () => {},
    setMinStartingBid: () => {},
    setMaxStartingBid: () => {},
    resetStartingBids: () => {},
    resetFilters: () => {},
    showFavorites: false,
    favorites: [],
    toggleShowFavorites: () => {},
    filters: { makes: [], models: [] },
    hasFiltersApplied: false,
});
export interface CarsContextProps extends PropsWithChildren {}
export const ContextProvider = ({ children }: CarsContextProps) => {
    const [vehicles, setVehicles] = useState<Car[]>(
        data.map((item, index) => ({
            ...item,
            id: index,
            auctionDateTime: "2025/12/15 09:00:00",
        })) as Car[]
    );
    const [filters, setFilters] = useState<Filters>({
        makes: [],
        models: [],
    });
    const [showFavorites, setShowFavorites] = useState<boolean>(false);

    const toggleShowFavorites = () => {
        setShowFavorites((prev) => !prev);
    };
    const hasFiltersApplied = useMemo(
        () =>
            filters.makes.length > 0 ||
            filters.models.length > 0 ||
            filters.minStartingBid !== undefined ||
            filters.maxStartingBid !== undefined,
        [filters]
    );

    const favoriteVehicles = useMemo(() => {
        console.log("updateing favorite vehicles");
        if (!showFavorites) return [];
        return vehicles.filter((vehicle) => vehicle.favourite);
    }, [vehicles, showFavorites]);

    const filteredVehicles = useMemo(() => {
        const hasMakeFilter = !!filters.makes?.length;
        const hasModelFilter = !!filters.models?.length;
        const min = filters.minStartingBid;
        const max = filters.maxStartingBid;

        let filtered = showFavorites ? favoriteVehicles : vehicles;

        if (hasMakeFilter) {
            filtered = filtered.filter((vehicle) =>
                filters.makes.includes(vehicle.make)
            );
        }

        if (hasModelFilter) {
            filtered = filtered.filter((vehicle) =>
                filters.models.includes(vehicle.model)
            );
        }

        if (min !== undefined) {
            filtered = filtered.filter((vehicle) => vehicle.startingBid >= min);
        }

        if (max !== undefined) {
            filtered = filtered.filter((vehicle) => vehicle.startingBid <= max);
        }

        return filtered;
    }, [filters, vehicles, favoriteVehicles, showFavorites]);

    const addOrRemoveFavorite = (id: number) => {
        const updatedVehicles = vehicles.map((vehicle) => {
            if (vehicle.id === id) {
                return { ...vehicle, favourite: !vehicle.favourite };
            }
            return vehicle;
        });
        setVehicles(updatedVehicles);
    };

    const addMakesFilter = (newMakeFilter: string) => {
        setFilters((prev) => ({
            ...prev,
            makes: [...prev.makes, newMakeFilter],
        }));
    };

    const removeMakesFilter = (makeToRemove: string) => {
        setFilters((prev) => ({
            ...prev,
            makes: prev.makes.filter((make) => make !== makeToRemove),
        }));
    };

    const addModelsFilter = (newModelFilter: string) => {
        setFilters((prev) => ({
            ...prev,
            models: [...prev.models, newModelFilter],
        }));
    };

    const removeModelsFilter = (modelToRemove: string) => {
        setFilters((prev) => ({
            ...prev,
            models: prev.models.filter((m) => m !== modelToRemove),
        }));
    };

    const setMinStartingBid = (value: number | undefined) => {
        setFilters((prev) => ({ ...prev, minStartingBid: value }));
    };

    const setMaxStartingBid = (value: number | undefined) => {
        setFilters((prev) => ({ ...prev, maxStartingBid: value }));
    };

    const resetStartingBids = () => {
        setFilters((prev) => ({
            ...prev,
        }));
    };

    const resetFilters = () => {
        setFilters({
            makes: [],
            models: [],
        });
    };

    return (
        <CarsContext.Provider
            value={{
                vehicles: vehicles,
                addOrRemoveFavorite: addOrRemoveFavorite,
                addMakesFilter,
                removeMakesFilter,
                addModelsFilter,
                removeModelsFilter,
                setMinStartingBid,
                setMaxStartingBid,
                resetStartingBids,
                resetFilters,
                showFavorites,
                toggleShowFavorites,
                filters,
                favorites: favoriteVehicles,
                filteredVehicles,
                hasFiltersApplied,
            }}
        >
            {children}
        </CarsContext.Provider>
    );
};
