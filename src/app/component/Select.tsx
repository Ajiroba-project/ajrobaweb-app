interface SelectProps {
    label: string;
    type?: string;
    name: string;
    placeholder?: string;
    // register: any;
    errors: any;
    options: { value: string; label: string }[];
}


const Select: React.FC<SelectProps> = ({ label, name, options, errors }) => {
    return (
        <div className="flex flex-col">
            <label className="text-sm" htmlFor={name}>
                {label}
            </label>


            <select name={name} className=" px-8 h-12 focus:text-black  border rounded">
                <option value="" className="text-wdc-textbody">
                    Select a {label}
                </option>
                {options.map((option) => (
                    <option key={option.value} className="text-wdc-textbody" value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>


            <div className="text-xs text-red-700">{errors?.[name]?.message}</div>
        </div>
    );
};


export default Select;