import Vue from 'vue'
import WidgetWrapper from './components/WidgetWrapper.vue'
import PageWrapper from './components/PageWrapper.vue'
import { create_id } from '@/utils'
import components from '@/library'
import store from '@/store'
import initOptions from './initOptions'
import _ from 'lodash'

const deleteCode = [46, 8]
document.addEventListener('click', function(e) {
  for (let i = 0; i < e.path.length; i++) {
    if (e.path[i].className && e.path[i].className.indexOf('widget-wrapper') !== -1) {
      return store.commit('SET_ACTIVATED', e.path[i].id)
    }
  }
  return store.commit('SET_ACTIVATED', null)
})
document.addEventListener('keyup', function(e) {
  if (!deleteCode.includes(e.keyCode)) return false
  if (store.state.activated_id) {
    return store.dispatch('REMOVE_COMPONENT', store.state.activated_id).then(res => {
      console.log(store.state)
    })
  }
})

export default class PageRender {
  constructor(options) {
    const self = this
    self.id = create_id()
    self.components = components
    self.vm = new Vue({
      el: document.createElement('div'),
      store,
      data() {
        return {
          id: self.id,
          options: {}
        }
      },
      render(h) {
        return (
          <PageWrapper id={this.id} options={this.options} />
        )
      }
    })
    document.querySelector(options.el).appendChild(this.vm.$el)
  }

  addWidget(type) {
    const vm = new Vue({
      el: document.createElement('div'),
      store,
      data: {
        id: create_id(),
        destroyed: false
      },
      created() {
        this.$store.commit('ADD_COMPONENT_TYPE', { [this.id]: { vm: this, options: _.cloneDeep(initOptions) }})
      },
      render: function(h) {
        if (this.destroyed) return h('')
        const Widget = components[type]
        return (
          <WidgetWrapper id={this.id}>
            <Widget />
          </WidgetWrapper>
        )
      }
    })
    this.vm.$el.appendChild(vm.$el)
  }
}
