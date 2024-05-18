import { create } from 'zustand'

export const userNavStore = create(set => ({
  userNav: '',
  isNavbarOpen: false,
  sidebar:false,

  setUserNav: text => set({ userNav: text }),
  toggleNavbar: () => set(state => ({ isNavbarOpen: !state.isNavbarOpen })),
  toggleSidebar: () => set(state => ({ sidebar: !state.sidebar }))
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

  setAirtimeStepper: text => set({ AirtimeStepper: text }),
  setAirtimeDetails: text => set({ AirtimeDetails: text })
}))


export const CablePurchase = create(set => ({
  CableStepper: 0,
  CableDetails: {
    name:'Testing',
    network: '',
    smartcard: '',
    netpackage: '',
  },

  setCableStepper: text => set({ CableStepper: text }),
  setCableDetails: text => set({ CableDetails: text })
}))

export const ElectricityPurchase = create(set => ({
  ElectricityStepper: 0,
  ElectricityDetails: {
    disco:'',
    meter: '',
    phone: '',
    package: '',
    meter_no:"", 
    amount:""
  },

  setElectricityStepper: text => set({ ElectricityStepper: text }),
  setElectricityDetails: text => set({ ElectricityDetails: text })
}))