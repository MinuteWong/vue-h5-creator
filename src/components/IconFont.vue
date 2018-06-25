<template>
  <i :class="iconName"></i>
</template>

<script>
  export default {
    name: 'icon-font',
    props: {
      iconClass: {
        type: String,
        required: true
      }
    },
    computed: {
      iconName() {
        return `icon iconfont ${this.iconClass}`
      }
    }
  }
</script>
