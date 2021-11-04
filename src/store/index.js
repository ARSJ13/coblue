import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    count: 0
  },
  mutations: {
    ADD_TASK(state, payload) {
      state.list.push({ ...payload, id: state.count++ })
    },
    EDIT_TASK(state, payload) {
      state.list[payload.index].title = payload.title
      state.list[payload.index].description = payload.description
    },
    DELETE_TASK(state, index) {
      state.list.splice(index, 1)
    }
  },
  actions: {
  },
  modules: {
  }
})
