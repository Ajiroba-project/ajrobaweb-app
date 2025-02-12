import * as yup from 'yup'

export const Rechargeschema = yup.object().shape({
  datanetwork: yup.string().required('Network Provider is required'),
  datadata: yup.string().required('Data Plan is required'),
  iucnumber: yup.string().required('IUC Number is required'),
  dataamount: yup.string().required('Amount is required'),

})
export const Airtimeschema = yup.object().shape({
  network: yup.string().required('Network Provider is required'),
  amount: yup.string().required('Amount is required'),
  phone: yup.string().required('Mobile Number is required'),

})
export const Cableschema = yup.object().shape({

  iucnumber: yup.string().required('IUC Number is required'),
  decoder: yup.string().required('Decoder is required'),
  bundle: yup.string().required('Bundle is required')

})

export const Electricitychema = yup.object().shape({
  disco: yup.string().required('Disco Provider is required'),
  amount: yup.string().required('Amount is required'),
  meter: yup.string().required('Meter Type is required'),
  phone: yup.string().required('Mobile Number is required'),
  meter_no: yup.string().required('Meter Number is required')
})