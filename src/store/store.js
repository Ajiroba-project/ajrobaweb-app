import { create } from 'zustand'

export const userNavStore = create(set => ({
  userNav: '',
  isNavbarOpen: false,

  setUserNav: text => set({ userNav: text }),
  toggleNavbar: () => set(state => ({ isNavbarOpen: !state.isNavbarOpen }))
}))


export const DataPurchase = create(set => ({
  stepper: 1,
  dataDetails: {
    network: '',
    data: '',
    phone: '',
    amount: ''
  },

  setStepper: text => set({ stepper: text }),
  setDataDetails: text => set({ dataDetails: text })
}))
