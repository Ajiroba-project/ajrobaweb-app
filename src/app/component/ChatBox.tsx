import {BsChatFill} from "react-icons/bs"


export const ChatBox =()=>{
    return (
      <div className='absolute'>
        <div className='cursor-pointer rounded-full bg-[#F25E26] p-4'>
          <BsChatFill className='text-2xl font-extrabold text-white ' />
        </div>
      </div>
    )
}