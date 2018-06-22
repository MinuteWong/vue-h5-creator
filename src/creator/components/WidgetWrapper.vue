<template>
    <div class="widget-wrapper" :id="id" :style="style">
      <div :class="{'widget-model':isActived}" class="widget-container">
          <slot :styleOptions="style"></slot>
      </div>
    </div>
</template>

<script>
import interact from 'interactjs'
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    isActived() {
      return this.$store.state.activated_id === this.id
    },
    style() {
      const style = this.$store.state.component_type[this.id].style
      const styleObj = {}
      Object.keys(style).map(key => {
        if (typeof style[key] === 'number') {
          styleObj[key] = style[key] + 'px'
        } else {
          styleObj[key] = style[key]
        }
      })
      return styleObj
    }
  },
  mounted() {
    const vm = this
    vm.$nextTick(() => {
      const rect = vm.$el.getBoundingClientRect()
      vm.$store.commit('OPTIONS_CHANGE', {
        id: vm.id,
        style: {
          height: parseInt(rect.height),
          width: parseInt(rect.width),
          left: +vm.$el.style.left.replace('px', ''),
          top: +vm.$el.style.left.replace('px', '')
        },
        type: 'widget'
      })
    })
    interact(`#${this.id}`)
      .draggable({
        onmove: function(event) {
          const target = event.target
          // keep the dragged position in the data-x/data-y attributes
          const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
          const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

          // translate the element
          // target.style.webkitTransform = target.style.transform =
          //   'translate(' + x + 'px, ' + y + 'px)'
          target.style.left = x + 'px'
          target.style.top = y + 'px'

          // update the posiion attributes
          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
          vm.$store.commit('OPTIONS_CHANGE', { id: vm.id, style: { left: x, top: y }})
        },
        restrict: {
          restriction: 'parent',
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        autoScroll: true
      })
      .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        // keep the edges inside the parent
        restrictEdges: {
          outer: 'parent',
          endOnly: true
        },

        // minimum size
        restrictSize: {
          min: { width: 50, height: 50 }
        }
      })
      .on('resizemove', function(event) {
        const target = event.target
        let x = parseFloat(target.getAttribute('data-x')) || 0
        let y = parseFloat(target.getAttribute('data-y')) || 0

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        // target.style.webkitTransform = target.style.transform =
        //   'translate(' + x + 'px,' + y + 'px)'
        target.style.left = x + 'px'
        target.style.top = y + 'px'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
        vm.$store.commit('OPTIONS_CHANGE', { id: vm.id, style: { width: event.rect.width, height: event.rect.height }})
        // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
      })
  }
  // created() {
  //   this.id = create_id()
  // }
}
</script>

<style lang="scss" scoped>
.widget-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
}
.widget-container{
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: relative;
   box-sizing: border-box;
}
.widget-model::before{
  content: "";
  width:100%;
  height: 100%;
  box-sizing: border-box;
  position: absolute;
  border: 2px solid  blue;
  z-index: 100;
}
.widget-tips{
  position: absolute;
  z-index: 99
}
</style>

