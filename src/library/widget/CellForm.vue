<template>
  <div class="widget">
    <group>
      <cell title="4545" value="46"></cell>
      <cell-form-preview :list="list"></cell-form-preview>
    </group>
  </div>
</template>

<script>
import { CellFormPreview, Group, Cell } from 'vux'

export default {
  components: {
    CellFormPreview,
    Group,
    Cell
  },
  data() {
    return {
      list: [{
        label: 'Apple',
        value: '3.29'
      }, {
        label: 'Banana',
        value: '1.04'
      }, {
        label: 'Fish',
        value: '8.00'
      }]
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
</style>
