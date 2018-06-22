import Vue from 'vue'
import WidgetWrapper from './components/WidgetWrapper.vue'
import PageWrapper from './components/PageWrapper.vue'
import components from '@/library'
import store from '@/store'
// import _ from 'lodash'
import { create_id } from '@/utils'
// import { pageInitOptions, widgetInitOptions } from './initOptions'

const deleteCode = [46]
document.addEventListener('keyup', function(e) {
  if (!deleteCode.includes(e.keyCode)) return false
  if (store.state.activated_id) {
    return store.dispatch('REMOVE_COMPONENT', store.state.activated_id)
  }
})

export default class PageRender {
  constructor(options) {
    const self = this
    self.id = create_id()
    self.style = {}
    self.type = 'page'
    self.components = components
    self.vm = new Vue({
      el: document.createElement('div'),
      store,
      data() {
        return {
          id: self.id
        }
      },
      render(h) {
        return (
          <PageWrapper id={this.id} />
        )
      }
    })
    document.querySelector(options.el).appendChild(self.vm.$el)
    self.vm.$el.addEventListener('click', () => store.commit('SET_ACTIVATED', null))
    store.commit('ADD_PAGE', this)
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
        this.$store.commit('ADD_COMPONENT_TYPE', {
          [this.id]: {
            vm: this,
            type: type,
            style: {}
          }
        })
      },
      methods: {
        handleClick(e) {
          e.stopPropagation()
          this.$store.commit('SET_ACTIVATED', this.id)
        }
      },
      render: function(h) {
        if (this.destroyed) return false
        const Widget = components[type]
        return (
          <WidgetWrapper id={this.id} nativeOnClick={this.handleClick} scopedSlots={{
            default: (props) => {
              return <Widget styleOptions={props.styleOptions} />
            }
          }
          } />
        )
      }
    })
    this.vm.$el.appendChild(vm.$el)
  }
}
