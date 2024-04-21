interface InputProps {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    register: any;
    errors: any;
}


const Input: React.FC<InputProps> = ({ label, type, name, placeholder, register, errors }) => {
    return (
        <div className="flex flex-col">
            <label className="text-sm" htmlFor={name}>
                {label}
            </label>
            <input
                {...register(name, { required: true })}
                type={type}
                name={name}
                className=" px-8 h-12 focus:text-black  border rounded"
                placeholder={placeholder}
            />
            <div className="text-xs text-red-700">{errors?.[name]?.message}</div>
        </div>
    );
};


export default Input;
