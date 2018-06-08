<template>
    <div class="widget">
        <checklist title="Basic Usage"  required :options="commonList" v-model="checklist001"></checklist>
    </div>
</template>

<script>
import { Checklist } from 'vux'
export default {
  data() {
    return {
      commonList: ['China', 'Japan', 'America']
    }
  },
  components: {
    Checklist
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
