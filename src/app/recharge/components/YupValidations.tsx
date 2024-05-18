import * as yup from 'yup'

export const Rechargeschema = yup.object().shape({
  network: yup.string().required('Network Provider is required'),
  data: yup.string().required('Data Plan is required'),
  phone: yup.string().required('Mobile Number is required'),
  
})
export const Airtimeschema = yup.object().shape({
  network: yup.string().required('Network Provider is required'),
  amount: yup.string().required('Amount is required'),
  phone: yup.string().required('Mobile Number is required'),
  
})
export const Cableschema = yup.object().shape({
  netpackage: yup.string().required('Network Package is required'),
  network: yup.string().required('Operator is required'),
  smartcard: yup.string().required('Smart Number is required')
})

export const Electricitychema = yup.object().shape({
  disco: yup.string().required('Disco Provider is required'),
  amount: yup.string().required('Amount is required'),
  meter: yup.string().required('Meter Type is required'),
  phone: yup.string().required('Mobile Number is required'),
  meter_no: yup.string().required('Meter Number is required')
})