import { createStore } from 'vuex'

export default createStore({
  state: {
    isActive: false,
  },
  getters: {
    getNavbarState(state) {
      return state.isActive
    }
  },
  mutations: {
    changeIsActive(state) {
      state.isActive = !state.isActive
    }
  },
  actions: {
  },
  modules: {
  }
})
