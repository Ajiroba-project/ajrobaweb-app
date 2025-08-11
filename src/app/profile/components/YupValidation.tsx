import * as yup from 'yup'

export const ProfileSchema = yup.object().shape({
  firstname: yup.string().required('First Name is required'),
  lastname: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  state: yup.string().required('State is required'),
  lga: yup.string().required('Local Government Area is required'),
  gender: yup.boolean().required("Gender is required"),
});

// export  const ProfileSchema = yup.object().shape({
//   firstname: yup.string().required('First Name is required'),
//   lastname: yup.string().required('Last Name is required'),
//   email: yup
//     .string()
//     .matches(
//       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
//       'Valid email is required'
//     )
//     .required('Email is required'),
//   phone: yup.string().required('Phone No is required'),
//   address: yup.string().required('Address is required'),
//   state: yup.string().required('State is required'),
//   lga: yup.string().required('LGA is required')

//   // password: yup
//   //     .string()
//   //     .required("Password is required")
//   //     .min(6, "Can't be lesser than 6 digits"),
// })

export const ChangePass = yup.object().shape({
  oldpass: yup
    .string()
    .required('Password is required')
    .min(6, "Can't be lesser than 6 digits"),
  newpass: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .test('no-common-patterns', 'Password cannot contain common patterns like "123", "abc", "qwerty"', (value) => {
      if (!value) return true;
      const commonPatterns = ['123', 'abc', 'qwerty', 'password', 'admin', 'user'];
      return !commonPatterns.some(pattern => value.toLowerCase().includes(pattern));
    })
    .test('no-repeating-characters', 'Password cannot have more than 3 consecutive repeating characters', (value) => {
      if (!value) return true;
      return !/(.)\1{3,}/.test(value);
    }),
  confirmpass: yup
    .string()
    .oneOf([yup.ref('newpass')], 'Passwords must match')
    .required('Password is required')
})

export const CreateNewPin = yup.object().shape({
  oldpass: yup
    .string()
    .required('Pin is required')
    .min(6, "Can't be lesser than 6 digits"),
  newpass: yup
    .string()
    .required('Pin is required')
    .min(6, "Can't be lesser than 6 digits"),
  confirmpass: yup
    .string()
    .oneOf([yup.ref('newpass')], 'Pin must match')
    .required('Pin is required')
})
