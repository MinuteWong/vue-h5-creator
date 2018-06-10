<template>
    <div class="widget-wrapper" :id="id" :class="{isActived:isActived}">
      {{isActived}}
        <slot></slot>
    </div>
</template>

<script>
import interact from 'interactjs'
export default {
  // data() {
  //   return {
  //     id: null
  //   }
  // },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  // methods: {
  //   postActivedId() {
  //     this.$store.commit('SET_ACTIVATED', this.id)
  //   }
  // },
  computed: {
    isActived() {
      return this.$store.state.activated_id === this.id
    }
  },
  mounted() {
    interact(`#${this.id}`)
      .draggable({
        onmove: function(event) {
          const target = event.target
          // keep the dragged position in the data-x/data-y attributes
          const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
          const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

          // translate the element
          target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)'

          // update the posiion attributes
          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
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

        target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
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
  width: 80px;
  height: 80px;
  background: red;
  display: inline-block;
  box-sizing: border-box;
}
.widget-wrapper:focus {
  background: #111;
}
.isActived {
  background: #123;
}
</style>

