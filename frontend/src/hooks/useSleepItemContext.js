import { SleepItemContext } from "../context/SleepItemContext";
import { useContext } from "react";

export const useSleepItemContext = () => {
    const context = useContext(SleepItemContext)

    if(!context) throw Error("useSleepItemContext must be used inside a SleepItemContextProvider")

    return context
};
