import {SelectInterface} from "../Interface/select-interface";

const Select: React.FC<SelectInterface> = ({errors, onChange, value, disable, options, ...props}) => {


    return <div className="mb-4">
        <select value={value} disabled={disable ? true : undefined} onChange={(e) => {
            if (onChange) onChange(e.target.value);
        }}
                {...props}>
            {options.length && options.map((option: string, index) =>
                <option key={index} value={option}>{option}</option>
            )
            }
        </select>
        <p className="">{errors}</p>
    </div>
}
export default Select