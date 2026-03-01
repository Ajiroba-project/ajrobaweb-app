import { create } from 'zustand'
import { persist } from "zustand/middleware";
import Cookies from 'js-cookie'
import { useGetDatanew } from '@/hooks/useGetData'
// import { cookies } from 'next/headers'


// Retrieve user from cookie/local storage
const storedUser = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

// export const useAuthStore = create((set, get) => ({
//   isLoggedIn: !!Cookies.get('token'), // Check if token cookie exists on initialization
//   user: storedUser,
//   setLoggedIn: isLoggedIn => set({ isLoggedIn }),

//   user: null,
//   setUser: user => {
//     set({ user });
//     // Persist user in a cookie or local storage
//     Cookies.set('user', JSON.stringify(user), { sameSite: 'strict' });
//   },

//   setAuthCookie: (token, expirationDate, user) => {
//     Cookies.set('token', token, {
//       expires: expirationDate,
//       sameSite: 'strict' // Additional security measure
//     });
//     set({ isLoggedIn: true, user }); // Update isLoggedIn and user state
//     // Persist user in a cookie or local storage
//     Cookies.set('user', JSON.stringify(user), { sameSite: 'strict' });
//   },


//   clearAuthCookies: () => {
//     Cookies.remove('token');
//     Cookies.remove('user'); // Clear user cookie/local storage
//     set({ isLoggedIn: false, user: null }); // Update isLoggedIn and user state
//   }
// }))
// const cookieStore = cookies()
// const theme = cookieStore.get('theme')

export const useAuthStore = create((set, get) => ({
  isLoggedIn: !!Cookies.get('token'), // Check if token cookie exists on initialization
  user: JSON.parse(Cookies.get('user') || null),
  token: Cookies.get('token') || null,
  isAddingToCart: false, // Add cart loading state
  cartCount: 0, // Add cart count state
  cartRefreshTrigger: 0, // Add trigger to force cart refresh

  setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  setUser: (user) => {
    const isSecure = typeof window !== 'undefined' && window?.location?.protocol === 'https:';
    Cookies.set('user', JSON.stringify(user), { sameSite: 'strict', secure: isSecure });
    set({ user });
  },

  setAddingToCart: (loading) => set({ isAddingToCart: loading }), // Add cart loading action

  setCartCount: (count) => set({ cartCount: count }), // Add cart count setter

  triggerCartRefresh: () => set((state) => ({ cartRefreshTrigger: state.cartRefreshTrigger + 1 })), // Add cart refresh trigger

  setAuthCookie: (token, user, expirationDate) => {
    const isSecure = typeof window !== 'undefined' && window?.location?.protocol === 'https:';
    Cookies.set('token', token, {
      expires: expirationDate,
      sameSite: 'strict',
      secure: isSecure,
    });
    Cookies.set('user', JSON.stringify(user), {
      expires: expirationDate,
      sameSite: 'strict',
      secure: isSecure,
    });


    set({ isLoggedIn: true, user }); // Update isLoggedIn and user state
  },

  clearAuthCookies: () => {
    Cookies.remove('token');
    Cookies.remove('user');
    set({ isLoggedIn: false, user: null, cartCount: 0 }); // Update isLoggedIn and user state, reset cart
  }
}));




export const userNavStore = create(set => ({
  headerNav: '/',
  userNav: '',
  isNavbarOpen: false,
  sidebar: false,
  walletModal: false,
  // headerNav: 'Home',

  setUserNav: text => set({ userNav: text }),
  /*  setHeaderNav: text => set({ headerNav: text }), */
  setHeaderNav: text => set({ headerNav: text }),
  toggleNavbar: () => set(state => ({ isNavbarOpen: !state.isNavbarOpen })),
  toggleSidebar: () => set(state => ({ sidebar: !state.sidebar })),
  setWalletModal: () => set(state => ({ walletModal: !state.walletModal })),
  seHeaderNav: text => set({ headerNav: text })
}))



// export const profilePhoto = create(set => ({
//   profileurl: '',

//   setProfileurl: url => set({ profileurl: url }),

// }))

export const profilePhoto = create((set) => ({
  profileurl: '',
  setProfileurl: (url) => set({ profileurl: url }),
}));


export const userOTPStore = create(set => ({
  user_otp: '',
  /* set_user_Otp: text => set({ otp: text }) */
  set_user_Otp: (otp) => set({ user_otp: otp }),
}))


export const userProfile = create(set => ({

  activeMenu: 'my profile',
  profileUpload: '',
  profile: false,
  editProfile: false,
  editPassword: false,
  successModal: false,
  userDetails: {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    lga: '',
    residency: '',
    balance: '',
    profile_image_url: ''
  },
  setEditProfile: () => set(state => ({ editProfile: !state.editProfile })),
  setProfile: () => set(state => ({ profile: !state.profile })),
  setEditPassword: () => set(state => ({ editPassword: !state.editPassword })),
  setactiveMenu: text => set({ activeMenu: text }),
  setprofileUpload: text => set({ photo: text }),
  setUserDetails: text => set({ userDetails: text }),
  setSuccessModal: () => set(state => ({ successModal: !state.successModal }))
}))

// export const DataPurchase = create(set => ({
//   stepper: 0,
//   dataDetails: {
//     network: '',
//     data: '',
//     phone: '',
//     amount: ''
//   },

//   setStepper: text => set({ stepper: text }),
//   setDataDetails: text => set({ dataDetails: text })
// }))



export const DataPurchase = create(
  persist(
    (set) => ({
      stepper: 0,
      DataStepper: 0,
      dataDetails: {
        datanetwork: '',
        datadata: '',
        dataphone: '',
        dataamount: ''
      },

      walletModal: false,

      setStepper: text => set({ stepper: text }),
      setDataStepper: text => set({ DataStepper: text }),
      setDataDetails: (text) => set({ dataDetails: text })
    }),
    {
      name: "data-storage",
      storage: typeof window !== 'undefined' ? localStorage : undefined,
    }
  )
);


export const AirtimePurchase = create(
  persist(
    (set) => ({
      AirtimeStepper: 0,
      AirtimeDetails: {
        network: '',
        phone: '',
        amount: ''
      },
      walletModal: false,

      setAirtimeStepper: (text) => set({ AirtimeStepper: text }),
      setAirtimeDetails: (text) => set({ AirtimeDetails: text })
    }),
    {
      name: "airtime-storage",
      storage: typeof window !== 'undefined' ? localStorage : undefined,
    }
  )
);

export const CablePurchase = create(

  persist(
    (set) => ({
      CableStepper: 0,
      CableDetails: {
        iucnumber: '',
        decoder: '',
        bundle: '',

      },

      customerCabledetails: {
        data: '',
      }
      ,

      walletModal: false,

      setCableStepper: text => set({ CableStepper: text }),
      setCableDetails: text => set({ CableDetails: text }),
      setCableCustomerDetails: text => set({ customerCabledetails: text })
    }),
    {
      name: "cable-storage",
      storage: typeof window !== 'undefined' ? localStorage : undefined,
    }
  )
)

export const ElectricityPurchase = create(

  persist(

    (set) => ({
      ElectricityStepper: 0,
      ElectricityDetails: {
        decoder: '',
        meter: '',
        elecamount: '',
        elecphone: '',
        amount: ''
      },
      walletModal: false,


      customerElectricitydetails: {
        data: '',
        name: ''
      }
      ,

      setElectricityStepper: text => set({ ElectricityStepper: text }),
      setElectricityDetails: text => set({ ElectricityDetails: text }),
      setElectricityCustomerDetails: text => set({ customerElectricitydetails: text })
    }),
    {
      name: "electicity-storage",
      storage: typeof window !== 'undefined' ? localStorage : undefined,
    }

  )
)




// {
//   "amount": 100,
//     "phoneNumber": "07037495325",
//       "network": "MTN",
//         "senderName": "Femi"
// }
// Gbolahan Alaba
// 09: 42
// 54100076436
