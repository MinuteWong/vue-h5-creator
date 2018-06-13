import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    activated_id: '',
    activated_component: null,
    component_type: {}
  },
  getters: {
    activated_options: state => {
      return state.activated_component && state.activated_component.options
    }
  },
  mutations: {
    SET_ACTIVATED(state, id) {
      state.activated_id = id
      state.activated_component = state.component_type[id] ? state.component_type[id] : null
    },
    ADD_COMPONENT_TYPE(state, vm) {
      state.component_type = Object.assign({}, state.component_type, vm)
    },
    DELETE_COMPONENT_TYPE(state, activated_id) {
      state.component_type[activated_id].vm.$destroy()
      delete state.component_type[activated_id]
      state.component_type = Object.assign({}, state.component_type)
    },
    OPTIONS_CHANGE(state, data) {
      state.component_type[data.id].options = Object.assign({}, _.merge(state.component_type[data.id].options, data.options))
    }
  },
  actions: {
    REMOVE_COMPONENT({ state, commit }, activated_id) {
      return new Promise((resolve, reject) => {
        state.component_type[activated_id].vm.destroyed = true
        resolve()
      }).then(() => {
        commit('DELETE_COMPONENT_TYPE', activated_id)
        commit('SET_ACTIVATED', null)
      })
    }
  }
})

export default store
