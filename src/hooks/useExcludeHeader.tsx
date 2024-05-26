
const excludedHeader = [
  '/signin',
  '/signup',
  '/otpverification',
  '/resendotp',
  '/setnewpass',
  '/forgot-password',
  '/forgotpassword'
]

const isExcluded = (route: string) => {
  excludedHeader.includes(route)
}

export const useExcludeHeader=({route}: any)=>{
    return isExcluded(route)
}