import Input from "../UI/Input";
import SearchIcon from "./SearchIcon";
import {useState} from "react";

export default function Search() {
    const [form, setForm] = useState<string>('')
    return (
        <div className="flex relative">
            <Input type="text"
                   name="search"
                   onChange={(event: any) => setForm(event.target.value)}
                   value={form}
                   className="bg-[#e7e0e0] w-3xs rounded-4xl py-1 px-4"
                   placeholder="Search"/>
           <div className="absolute right-4 top-1"><SearchIcon/></div>
        </div>
    )
}