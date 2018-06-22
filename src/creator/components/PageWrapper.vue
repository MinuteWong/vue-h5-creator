<template>
    <div :id="id" class="page-wrapper" 
        :style="{
            backgroundColor:style.backgroundColor,
            backgroundImage:style.backgroundImage,
            height:style.height
        }">
    </div>
</template>

<script>
export default {
  props: {
    id: {
      require: true
    }
  },
  computed: {
    style() {
      return this.$store.state.page_mapper[this.id] ? this.$store.state.page_mapper[this.id].style : {}
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper{
    min-width: 100%;
    min-height: 100%;
    overflow: hidden;
    position: relative;
    background: no-repeat center center/cover;
}
</style>
