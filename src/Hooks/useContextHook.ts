import {useContext} from "react";
import {FormContext} from "../Context/FormContext";

export default function useContextHook() {
    const context = useContext(FormContext);

    if (context === undefined) {
        throw new Error("form cant be undefined")
    }
    return context;
}