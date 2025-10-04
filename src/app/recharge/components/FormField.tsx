import { useState, useEffect, useRef } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { FaRegEyeSlash } from 'react-icons/fa'
import { FaRegEye } from 'react-icons/fa6'
import { FiUpload } from 'react-icons/fi'
import './style.css'

type inputProps = {
  name: string
  type: string
  label?: string
  placeholder?: string
  register?: any
  errors?: any
  classname?: any
  value?: string
  isdisabled?: boolean
  inputMode?: any
  maxLength?: number
  onKeyDown?: any
  onInput?: any
  onPaste?: any
}
type selectProps = {
  name: inputProps['name']
  label?: inputProps['label']
  register: inputProps['register']
  errors: inputProps['errors']
  options?: any
  multiple?: boolean
  isdisabled?: boolean
  showlabel?: boolean
  className?: string
  stye?: any
}
type textareaProps = {
  name: inputProps['name']
  label: inputProps['label']
  register: inputProps['register']
  errors: inputProps['errors']
  placeholder: inputProps['placeholder']
  isdisabled?: boolean
}
type fileUpoadProps = {
  // hangleChange : ()=> void,
  label: string
  name: inputProps['name']
  register: inputProps['register']
  errors: inputProps['errors']
}

export const InputField = ({
  label,
  type,
  placeholder,
  name,
  register,
  errors,
  classname,
  value,
  isdisabled,
  inputMode,
  maxLength,
  onKeyDown,
  onInput,
  onPaste
}: inputProps) => {
  const [toggle, setToggle] = useState(false)

  const handleTogglePasswordVisibility = () => {
    setToggle(!toggle)
  }

  return (
    <>
      <div className='relative flex flex-col'>
        {label && <label className='py-2 text-sm'>{label}</label>}
        <input
          name={name}
          type={toggle ? 'text' : type}
          placeholder={placeholder}
            placeholder-gray-500
          className={`${isdisabled ? 'cursor-not-allowed' : ''} ${classname ? classname : ' placeholder-[#A09F9F] border border-[#A09F9F]  text-sm font-medium font-Poppins  text-[#111111]  xlw-[300px] h-12 w-auto rounded-lg px-5 focus:text-black md:w-[300px] lg:w-[300px] xl:w-[350px] 2xl:w-[300px]'}`}
          {...register(name, { required: true })}
          disabled={isdisabled}
          inputMode={inputMode}
          maxLength={maxLength}
          onKeyDown={onKeyDown}
          onInput={onInput}
          onPaste={onPaste}
        />

        {type === 'password' || type === 'Password' ? (
          <span
            onClick={handleTogglePasswordVisibility}
            className={`absolute right-3 top-[3.3rem] cursor-pointer  text-xl transition duration-200 ${
              toggle ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            {toggle ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        ) : null}

        <div className='pt-1 text-xs text-rose-500'>
          {errors?.[name]?.message}
        </div>
      </div>
    </>
  )
}

export const InputFieldRounded = ({
  label,
  type,
  placeholder,
  name,
  register,
  errors,
  classname,
  value,
  isdisabled
}: inputProps) => {
  const [toggle, setToggle] = useState(false)

  const handleTogglePasswordVisibility = () => {
    setToggle(!toggle)
  }

  return (
    <>
      <div className='relative flex flex-col'>
        {label && <label className='py-2 text-sm'>{label}</label>}
        <input
          name={name}
          type={toggle ? 'text' : type}
          placeholder={placeholder}
            placeholder-gray-500
          className={`${isdisabled ? 'cursor-not-allowed' : ''} ${classname ? classname : ' placeholder-[#A09F9F] text-sm font-medium font-Poppins  text-[#111111]  xlw-[300px] h-12 w-auto rounded-lg border px-5 focus:text-black md:w-[300px] lg:w-[300px] xl:w-[350px] 2xl:w-[300px]'}`}
          {...register(name, { required: true })}
          disabled={isdisabled}
        />

        {type === 'password' || type === 'Password' ? (
          <span
            onClick={handleTogglePasswordVisibility}
            className={`absolute right-3 top-[3.3rem] cursor-pointer  text-xl transition duration-200 ${
              toggle ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            {toggle ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        ) : null}

        <div className='pt-1 text-xs text-rose-500'>
          {errors?.[name]?.message}
        </div>
      </div>
    </>
  )
}





// export const SelectField = ({
//   showlabel,
//   label,
//   name,
//   register,
//   errors,
//   options,
//   multiple,
//   className,
// }: selectProps) => {
//   return (
//     <div className='relative flex flex-col'>
//       {showlabel && <label className='py-2 text-sm'>{label} </label>}
//       <select
//         {...register(name, { required: true })}
//         name={name}

//         className={className ? className : `xl-[300px] h-12 w-auto rounded border px-5 focus:text-black md:w-[300px] lg:w-[300px] xl:w-[350px] 2xl:w-[300px]`}
//       >
//         <option value='' className='text-wdc-textbody'>
//           {label ? ` ${label}` : ''}
//         </option>
//         {options.map((val: string, key: number) => (
//           <option key={key} className='text-wdc-textbody' value={val}>
//             {val}
//           </option>
//         ))}
//       </select>
//       <div className='pt-1 text-xs text-rose-500'>
//         {errors?.[name]?.message}
//       </div>
//     </div>
//   )
// }



export const SelectField = ({
  showlabel,
  label,
  name,
  register,
  errors,
  options,
  multiple,
  style,
  className,
  isdisabled,
  value,
  onChange,
}: selectProps & { style?: React.CSSProperties; value?: string; onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => {
  // Controlled value to sync with RHF and external value
  const [selectedValue, setSelectedValue] = useState<string>(value ?? '')
  useEffect(() => {
    if (typeof value === 'string') setSelectedValue(value)
  }, [value])

  // For multiple selection, keep native select to avoid behavior changes
  if (multiple) {
    return (
      <div className='relative flex flex-col'>
        {showlabel && <label className='py-2 text-sm'>{label} </label>}
        <select
          {...register(name, { required: true })}
          name={name}
          multiple
          disabled={isdisabled}
          style={style}
          value={value}
          onChange={onChange}
          className={
            className
              ? className
              : `xl-[300px] h-12 w-auto rounded border px-5 focus:text-black md:w-[300px] lg:w-[300px] xl:w-[350px] 2xl:w-[300px]`
          }
        >
          <option value='' className='text-wdc-textbody'>
            {label ? ` ${label}` : ''}
          </option>
          {options?.map((val: string, key: number) => (
            <option key={key} className='text-wdc-textbody' value={val}>
              {val}
            </option>
          ))}
        </select>
        <div className='pt-1 text-xs text-rose-500'>{errors?.[name]?.message}</div>
      </div>
    )
  }

  const reg = register(name, { required: true })

  const handleValueChange = (val: string) => {
    setSelectedValue(val)
    // Update RHF hidden input
    if (typeof reg.onChange === 'function') {
      reg.onChange({ target: { value: val, name } } as any)
    }
    // Support existing onChange signature from native select
    if (onChange) {
      onChange({ target: { value: val, name } } as any)
    }
  }

  return (
    <div className='relative flex flex-col'>
      {showlabel && <label className='py-2 text-sm'>{label} </label>}

      {/* Hidden input preserves RHF registration */}
      <input type='hidden' name={name} value={selectedValue} ref={reg.ref} />

      <Select value={selectedValue} onValueChange={handleValueChange} disabled={isdisabled}>
        <SelectTrigger className={`${className ? className : 'xl-[300px] h-12 w-auto rounded border px-5 focus:text-black md:w-[300px] lg:w-[300px] xl:w-[350px] 2xl:w-[300px]'} selector`} style={style}>
          <SelectValue placeholder={label ? ` ${label}` : ''} />
        </SelectTrigger>
        <SelectContent className='' style={{ backgroundColor: '#ffffff', color: '#2A2A2A' }}>
          {options?.map((val: string, key: number) => (
            <SelectItem key={key} value={val} className='text-[#2A2A2A] data-[highlighted]:bg-[#FCDFD4]  data-[state=checked]:bg-[#FCDFD4] data-[state=checked]:text-[#111827]'>
              {val}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className='pt-1 text-xs text-rose-500'>{errors?.[name]?.message}</div>
    </div>
  )
}







export const TextAreaField = ({
  label,
  name,
  register,
  errors,
  placeholder
}: textareaProps) => {
  return (
    <div className='relative flex flex-col '>
      <label className='py-2 text-sm'>{label}: </label>
      <textarea
        name={name}
        className={`xlw-[300px] h-24 w-auto resize-none rounded border p-4 px-5 focus:text-black md:w-[300px] lg:w-[300px] xl:w-[350px] 2xl:w-[300px]`}
        {...register(name, { required: true })}
        placeholder={placeholder}
      ></textarea>
      <div className='pt-1 text-xs text-rose-500'>
        {errors?.[name]?.message}
      </div>
    </div>
  )
}

export const MutipleUpload = ({
  name,
  errors,
  label,
  register
}: fileUpoadProps) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor='upload-files'>
        <p className='py-2'>{label}:</p>
        <span className='relative flex h-[20rem] w-auto cursor-pointer flex-col items-center justify-center rounded-md bg-gray-50 shadow hover:bg-gray-100'>
          <FiUpload className='text-4xl' />
          <div className='flex flex-col items-center justify-center pb-6 pt-5'>
            <p className='mb-2 text-xl text-gray-500 '>SelectFile to upload</p>
            <p className='mb-2 text-xs text-gray-500 '>
              you may upload up to 4 images & video
            </p>
          </div>
        </span>
        <input
          id='upload-files'
          type='file'
          accept='image/*, video/*'
          max='5'
          className='hidden pt-6 '
          multiple
          {...register(name, { required: true })}
        />
      </label>
      <div className='pt-1 text-xs text-rose-500'>
        {errors?.[name]?.message}
      </div>
    </div>
  )
}

// Currency formatting utility
const formatCurrencyInput = (value: string): string => {
  // Remove all non-numeric characters except decimal point
  const numericValue = value.replace(/[^0-9.]/g, '');
  
  // Handle empty or invalid input
  if (!numericValue || numericValue === '.') return '';
  
  // Parse the number
  const number = parseFloat(numericValue);
  
  // Handle invalid numbers
  if (isNaN(number)) return '';
  
  // Format with Nigerian Naira symbol and commas
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
};

// Extract numeric value from formatted currency string
const extractNumericValue = (formattedValue: string): string => {
  return formattedValue.replace(/[^0-9.]/g, '');
};

export const CurrencyInputField = ({
  label,
  placeholder,
  name,
  register,
  errors,
  classname,
  value,
  isdisabled,
  maxLength,
  onKeyDown,
  onInput,
  onPaste
}: inputProps) => {
  const [displayValue, setDisplayValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  // Get the register function
  const { onChange, onBlur, ref } = register(name, { 
    required: true,
    setValueAs: (value: string) => extractNumericValue(value)
  })

  // Handle input change with real-time formatting
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const numericValue = extractNumericValue(inputValue)
    
    // Update the display value with formatting
    const formattedValue = formatCurrencyInput(numericValue)
    setDisplayValue(formattedValue)
    
    // Create a new event with the numeric value for the form
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: numericValue
      }
    }
    
    // Call the register's onChange with the numeric value
    onChange(syntheticEvent)
    
    // Call the original onInput if provided
    if (onInput) {
      onInput(e)
    }
  }

  // Handle focus - show raw value for easier editing
  const handleFocus = () => {
    setIsFocused(true)
    const numericValue = extractNumericValue(displayValue)
    setDisplayValue(numericValue)
  }

  // Handle blur - format the value
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    const numericValue = extractNumericValue(displayValue)
    const formattedValue = formatCurrencyInput(numericValue)
    setDisplayValue(formattedValue)
    
    // Call the register's onBlur
    onBlur(e)
  }

  // Handle key down events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, decimal point
    if ([8, 9, 27, 13, 46, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40)) {
      return
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault()
    }
    
    if (onKeyDown) {
      onKeyDown(e)
    }
  }

  // Handle paste events
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    const numericValue = extractNumericValue(pastedData)
    const formattedValue = formatCurrencyInput(numericValue)
    setDisplayValue(formattedValue)
    
    // Create a synthetic event for the form
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: numericValue
      }
    }
    
    // Call the register's onChange with the numeric value
    onChange(syntheticEvent)
    
    if (onPaste) {
      onPaste(e)
    }
  }

  // Initialize display value when component mounts or value prop changes
  useEffect(() => {
    if (value && typeof value === 'string') {
      const numericValue = extractNumericValue(value)
      const formattedValue = formatCurrencyInput(numericValue)
      setDisplayValue(formattedValue)
    }
  }, [value])

  return (
    <>
      <div className='relative flex flex-col'>
        {label && <label className='py-2 text-sm'>{label}</label>}
        <input
          ref={ref}
          name={name}
          type="text"
          placeholder={placeholder}
          className={`${isdisabled ? 'cursor-not-allowed' : ''} ${classname ? classname : ' placeholder-[#A09F9F] border border-[#A09F9F] text-sm font-medium font-Poppins text-[#111111] xlw-[300px] h-12 w-auto rounded-lg px-5 focus:text-black md:w-[300px] lg:w-[300px] xl:w-[350px] 2xl:w-[300px]'}`}
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          disabled={isdisabled}
          maxLength={maxLength}
        />

        <div className='pt-1 text-xs text-rose-500'>
          {errors?.[name]?.message}
        </div>
      </div>
    </>
  )
}

export const RadioButton = () => {
  return <></>
}
