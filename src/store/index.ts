import { createStore } from 'vuex'

export default createStore({
  state: {
    updatedTime: 0
  },
  getters: {
  },
  mutations: {
    setUpdateTime(state, timestamp){
      state.updatedTime = timestamp
    }
  },
  actions: {
  },
  modules: {
  }
})
