import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    activated_id: '',
    activated_component: null,
    activated_page_id: '',
    activated_page: null,
    component_type: {},
    page_mapper: {}
  },
  getters: {
    activated_element: state => {
      return state.activated_component || state.activated_page
    }
  },
  mutations: {
    SET_ACTIVATED(state, id) {
      state.activated_id = id
      state.activated_component = state.component_type[id]
    },
    ADD_COMPONENT_TYPE(state, vm) {
      state.component_type = Object.assign({}, state.component_type, vm)
    },
    DELETE_COMPONENT_TYPE(state, activated_id) {
      state.component_type[activated_id].vm.$destroy()
      delete state.component_type[activated_id]
      state.component_type = Object.assign({}, state.component_type)
    },
    ADD_PAGE(state, pager) {
      state.activated_id = pager.id
      state.activated_page = pager
      state.page_mapper = Object.assign({}, state.page_mapper, { [pager.id]: pager })
    },
    OPTIONS_CHANGE(state, data) {
      state.component_type[data.id].style = Object.assign({}, _.merge(state.component_type[data.id].style, data.style))
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
