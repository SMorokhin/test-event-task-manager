// import Vue from 'vue'
import axios from '../axios'

export default {
  namespaced: true,
  state: {
    data: []
  },
  getters: {
    vEventList: (state) => state.data
  },
  mutations: {
    UPDATE_EVENT_LIST (state, events) {
      state.data = events
    }
  },
  actions: {
    async loadEventList ({ commit }) {
      const response = await axios.get('/event')
      commit('UPDATE_EVENT_LIST', response.data)
    }
  }
}
