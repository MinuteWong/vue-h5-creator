import Vue from 'vue'
import WidgetWrapper from './WidgetWrapper.vue'
import components from './widget'

export default {
  widget: WidgetWrapper,
  components,
  renderer(type) {
    const self = this
    return new Vue({
      el: document.createElement('div'),
      render: function(h) {
        return h(WidgetWrapper, [h(self.components[type])])
      }
    })
  },
  render(type, $el) {
    const $vm = this.renderer(type)
    $el.appendChild($vm.$el)
  }
}
