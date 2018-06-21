<template>
    <div :id="id" class="page-wrapper" 
        :style="{
            backgroundColor:options.backgroundColor,
            backgroundImage:options.backgroundImage,
            height:options.height
        }">
    </div>
</template>

<script>
export default {
  props: {
    id: {
      require: true
    },
    options: {
      require: true,
      type: Object,
      default() {
        return {
          backgroundImage: '',
          backgroundColor: '',
          height: ''
        }
      }
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
