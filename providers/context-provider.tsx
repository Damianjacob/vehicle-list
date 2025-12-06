import { Car } from "@/types/cars";
import { createContext, PropsWithChildren, useState } from "react";
import data from "../vehicles.json";

export const CarsContext = createContext<{
    vehicles: Car[];
    addOrRemoveFavorite: (id: number) => void;
}>({ vehicles: [], addOrRemoveFavorite: () => {} });
export interface CarsContextProps extends PropsWithChildren {}
export const ContextProvider = ({ children }: CarsContextProps) => {
    const [vehicles, setVehicles] = useState<Car[]>(
        data.map((item, index) => ({ ...item, id: index })) as Car[]
    );

    const addOrRemoveFavorite = (id: number) => {
        const updatedVehicles = vehicles.map((vehicle) => {
            if (vehicle.id === id) {
                return { ...vehicle, favourite: !vehicle.favourite };
            }
            return vehicle;
        });
        setVehicles(updatedVehicles);
    };

    return (
        <CarsContext.Provider
            value={{
                vehicles: vehicles,
                addOrRemoveFavorite: addOrRemoveFavorite,
            }}
        >
            {children}
        </CarsContext.Provider>
    );
};
