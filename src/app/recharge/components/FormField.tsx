import {useState} from 'react'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";

type inputProps ={
    name:string,
    type:string,
    label?:string,
    placeholder?:string,
    register?: any,
    errors?:any,
    showPassword?:boolean,
    classname?:any, 
    value?:string
    isdisabled?:boolean
}
type selectProps ={
    name:inputProps["name"],
    label?:inputProps["label"],
    register:inputProps["register"],
    errors:inputProps["errors"],
    options?:any
    multiple?:boolean
    isdisabled?:boolean
    showlabel?:boolean

}
type textareaProps ={
    name:inputProps["name"],
    label:inputProps["label"],
    register:inputProps["register"],
    errors:inputProps["errors"],
    placeholder:inputProps["placeholder"],
    isdisabled?:boolean

}
type fileUpoadProps ={
    // hangleChange : ()=> void,
    label:string;
    name:inputProps["name"],
    register:inputProps["register"],
    errors:inputProps["errors"],

}

export const InputField = ({
  label,
  type,
  placeholder,
  name,
  register,
  errors,
  showPassword,
  classname,
  value,
  isdisabled
}: inputProps) => {
  const [toggle, setToggle] = useState(showPassword)

  const handleTogglePasswordVisibility = () => {
    setToggle(!toggle)
  }

  return (
    <>
      <div className='relative flex flex-col'>
        {label && <label className='py-2'>{label}</label>}
        <input
          name={name}
          type={toggle ? 'text' : type}
          placeholder={placeholder}
          className={`${isdisabled ? 'cursor-not-allowed' : ''} ${classname ? classname : 'xlw-[300px] h-12 w-auto rounded border px-5 focus:text-black md:w-[300px] lg:w-[300px] xl:w-[350px] 2xl:w-[300px]'}`}
          {...register(name, { required: true })}
          disabled={isdisabled}
        />

        {showPassword && (
          <span
            onClick={handleTogglePasswordVisibility}
            className={`absolute right-3 top-14 cursor-pointer  text-xl transition duration-200 ${
              toggle ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            {toggle ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        )}

        <div className='pt-1 text-xs text-rose-500'>
          {errors?.[name]?.message}
        </div>
      </div>
    </>
  )
}

export const SelectField =({showlabel, label, name, register, errors, options, multiple}:selectProps)=>{
    return (
      <div className='relative flex flex-col'>
        {showlabel && <label className='py-2'>{label} </label>}
        <select
          {...register(name, { required: true })}
          name={name}
          className={`xl-[300px] h-12 w-auto rounded border px-5 focus:text-black md:w-[300px] lg:w-[300px] xl:w-[350px] 2xl:w-[300px]`}
        >
          <option value='' className='text-wdc-textbody'>
            {label ? ` Select a ${label}` : ''}
          </option>
          {options.map((val: string, key: number) => (
            <option key={key} className='text-wdc-textbody' value={val}>
              {val}
            </option>
          ))}
        </select>

        <div className='pt-1 text-xs text-rose-500'>
          {errors?.[name]?.message}
        </div>
      </div>
    )
}
export const TextAreaField =({label, name, register, errors, placeholder}:textareaProps)=>{
    return (
        <div className="relative flex flex-col ">
             <label className="py-2">{label}: </label>
            <textarea name={name} className={`resize-none px-5 h-24 focus:text-black border rounded w-auto xl:w-[350px] 2xl:w-[300px] md:w-[300px] xlw-[300px] lg:w-[300px] p-4`} {...register(name, { required: true })} placeholder={placeholder}>
                
            </textarea>
            <div className="text-xs text-rose-500 pt-1">
                {errors?.[name]?.message}
            </div>
        </div>
    )
}

export const MutipleUpload =({name,errors, label, register, }:fileUpoadProps)=>{
    return (
        <div className="flex flex-col">
            <label htmlFor="upload-files">
              <p className="py-2">{label}:</p>
              <span className="bg-gray-50 relative rounded-md shadow hover:bg-gray-100 h-[20rem] w-auto flex justify-center items-center cursor-pointer flex-col">
                <FiUpload className="text-4xl" />
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="mb-2 text-xl text-gray-500 ">
                    SelectFile to upload
                  </p>
                  <p className="mb-2 text-xs text-gray-500 ">
                    you may upload up to 4 images & video
                  </p>
                </div>
              </span>
              <input
                id="upload-files"
                type="file"
                accept="image/*, video/*"
                max="5"
                className="pt-6 hidden "
                multiple
                {...register(name, { required: true })}
              />
            </label>
            <div className="text-xs text-rose-500 pt-1">
              {errors?.[name]?.message}
            </div>
        </div>
    )
}

export const RadioButton =()=>{
    return (
        <>
        </>
    )
}
