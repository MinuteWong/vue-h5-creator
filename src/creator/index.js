import Vue from 'vue'
import WidgetWrapper from './components/WidgetWrapper.vue'
import { create_id } from '@/utils'
import components from '@/library'
import store from '@/store'

document.addEventListener('click', function(e) {
  for (let i = 0; i < e.path.length; i++) {
    if (e.path[i].className && e.path[i].className.indexOf('widget-wrapper') !== -1) {
      return store.commit('SET_ACTIVATED', e.path[i].id)
    }
  }
  return store.commit('SET_ACTIVATED', null)
})
document.addEventListener('keyup', function(e) {
  if (e.keyCode !== 46) return false
  if (store.state.activated_id) {
    return store.dispatch('REMOVE_COMPONENT', store.state.activated_id).then(res => {
      console.log(store.state)
    })
  }
})
export default {
  widget: WidgetWrapper,
  components,
  renderer(type) {
    const self = this
    return new Vue({
      el: document.createElement('div'),
      store,
      data: {
        id: create_id(),
        destroyed: false
      },
      created() {
        this.$store.commit('ADD_COMPONENT_TYPE', { [this.id]: this })
      },
      render: function(h) {
        if (this.destroyed) return h('')
        return h(WidgetWrapper, {
          props: {
            id: this.id
          }
        }, [h(self.components[type])])
      }
    })
  },
  render(type, $el) {
    const $vm = this.renderer(type)
    $el.appendChild($vm.$el)
  }
}
