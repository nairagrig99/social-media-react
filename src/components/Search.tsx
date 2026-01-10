import Input from "../UI/Input";
import {forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState} from "react";

export type SearchHandle = {
    onValueChange: (callback: (value: string) => void) => void;
}
const Search = forwardRef((props, ref: Ref<SearchHandle>) => {

    const [input, setInput] = useState('');
    const callbackRef = useRef<((value: string) => void) | null>(null);

    useImperativeHandle(ref, () => ({
        onValueChange: (callback) => {
            callbackRef.current = callback;
        }
    }));

    useEffect(() => {
        if (callbackRef.current) {
            callbackRef.current(input);
        }
    }, [input]);

    return (
        <Input
            labelClass="border rounded-[7px] p-[5px] flex"
            className="w-full outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name="search"
            type="search"
        />
    )
})
export default Search