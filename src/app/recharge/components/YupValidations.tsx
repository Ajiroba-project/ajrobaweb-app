import * as yup from 'yup'

export const Rechargeschema = yup.object().shape({
  network: yup.string().required('Network Provider is required'),
  data: yup.string().required('Data Plan is required'),
  phone: yup.string().required('Mobile Number is required'),
  
})
