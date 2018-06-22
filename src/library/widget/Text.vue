<template>
    <div class="widget widget__text">
        13213212
    </div>
</template>

<script>

const initStyle = {
  width: 50,
  height: 50,
  left: 0,
  top: 0
}

export default {
  props: {
    styleOptions: {
      type: Object,
      required: true,
      default() {
        return initStyle
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.widget{
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.widget__text{
  min-width: 100px;
  min-height: 50px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
