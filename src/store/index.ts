import { createStore } from 'vuex'
import { Block } from '../types'

export default createStore({
  state: {
    updatedTime: 0,
    mobileMenuTab: 'domesticstat' as Block,
  },
  getters: {
  },
  mutations: {
    setUpdateTime(state, timestamp){
      state.updatedTime = timestamp
    },
    setMobileMenuTab(state, block){
      state.mobileMenuTab = block
    },
  },
  actions: {
  },
  modules: {
  }
})
