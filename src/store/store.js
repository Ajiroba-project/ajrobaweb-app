import { create } from 'zustand'
import Cookies from 'js-cookie'

export const useAuthStore = create((set, get) => ({
  isLoggedIn: !!Cookies.get('token'), // Check if token cookie exists on initialization
  setLoggedIn: isLoggedIn => set({ isLoggedIn }),

  user: null,
  setUser: user => set({ user }),

  setAuthCookie: (token, expirationDate) => {
    Cookies.set('token', token, {
      expires: expirationDate,
      sameSite: 'strict' // Additional security measure
    })
    set({ isLoggedIn: true }) // Update isLoggedIn state
  },
  clearAuthCookies: () => {
    Cookies.remove('token')
    set({ isLoggedIn: false, user: null }) // Update isLoggedIn and user state
  }
}))

export const userNavStore = create(set => ({
  headerNav: 'Home',
  userNav: '',
  isNavbarOpen: false,
  sidebar: false,
  walletModal: false,
  headerNav: '',

  setUserNav: text => set({ userNav: text }),
  setHeaderNav: text => set({ headerNav: text }),
  toggleNavbar: () => set(state => ({ isNavbarOpen: !state.isNavbarOpen })),
  toggleSidebar: () => set(state => ({ sidebar: !state.sidebar })),
  setWalletModal: () => set(state => ({ walletModal: !state.walletModal })),
  seHeaderNav: text => set({ headerNav: text })
}))


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
    firstname: 'alex',
    lastname: 'ajiroba',
    email: 'ajiroba@demo.com',
    phone: '+234-340-340-34',
    address: '123,alabukun street, off afterfive',
    state: 'lagos state',
    lga: 'somolu',
    residency: '11222333444',
    balance: ''
  },
  setEditProfile: () => set(state => ({ editProfile: !state.editProfile })),
  setProfile: () => set(state => ({ profile: !state.profile })),
  setEditPassword: () => set(state => ({ editPassword: !state.editPassword })),
  setactiveMenu: text => set({ activeMenu: text }),
  setprofileUpload: text => set({ photo: text }),
  setUserDetails: text => set({ userDetails: text }),
  setSuccessModal: () => set(state => ({ successModal: !state.successModal }))
}))

export const DataPurchase = create(set => ({
  stepper: 0,
  dataDetails: {
    network: '',
    data: '',
    phone: '',
    amount: ''
  },

  setStepper: text => set({ stepper: text }),
  setDataDetails: text => set({ dataDetails: text })
}))

export const AirtimePurchase = create(set => ({
  AirtimeStepper: 0,
  AirtimeDetails: {
    network: '',
    phone: '',
    amount: ''
  },
  walletModal: false,

  setAirtimeStepper: text => set({ AirtimeStepper: text }),
  setAirtimeDetails: text => set({ AirtimeDetails: text })
}))

export const CablePurchase = create(set => ({
  CableStepper: 0,
  CableDetails: {
    name: 'Testing',
    network: '',
    smartcard: '',
    netpackage: '',
    amount: '--'
  },

  setCableStepper: text => set({ CableStepper: text }),
  setCableDetails: text => set({ CableDetails: text })
}))

export const ElectricityPurchase = create(set => ({
  ElectricityStepper: 0,
  ElectricityDetails: {
    disco: '',
    meter: '',
    phone: '',
    package: '',
    meter_no: '',
    amount: ''
  },
  walletModal: false,

  setElectricityStepper: text => set({ ElectricityStepper: text }),
  setElectricityDetails: text => set({ ElectricityDetails: text })
}))
