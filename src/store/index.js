import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    archive: [],
    countList: 0,
    countArchive: 0
  },
  mutations: {
    ADD_TASK(state, payload) {
      state.list.push({ ...payload, id: state.countList++ })
    },
    EDIT_TASK(state, payload) {
      state.list[payload.index].title = payload.title
      state.list[payload.index].description = payload.description
    },
    DELETE_TASK(state, index) {
      state.list.splice(index, 1)
    },
    TO_FILE(state, payload) {
      state.archive.push({ ...payload, id: state.countArchive++ })
    },
    DELETE_FILE(state, index) {
      state.archive.splice(index, 1)
    }
  }
})
