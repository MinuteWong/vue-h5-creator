import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    activated_id: '',
    activated_component: null,
    component_type: {}
  },
  mutations: {
    SET_ACTIVATED(state, id) {
      state.activated_id = id
      state.activated_component = state.component_type[id]
    },
    ADD_COMPONENT_TYPE(state, type, vm) {
      state.component_type = Object.assign({}, state.component_type, { [type]: vm })
    }
  },
  actions: {

  }
})

export default store
