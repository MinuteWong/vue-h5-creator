<template>
  <div id="app">
    <ul class="list">
      <li>点击添加元素</li>
      <li v-for="(item,i) in widgetList" @click="addWidget(item)" :key="i">
        {{item}}
      </li>
    </ul>
    <div class="container" id="main-wrapper">
    </div>
  </div>
</template>

<script>
import Creator from './creator'
export default {
  name: 'App',
  data() {
    return {
      wrapper: null,
      widgetList: []
    }
  },
  computed: {
    id() {
      return this.$store.state.activated_id
    }
  },
  methods: {
    addWidget(item) {
      Creator.render(item, this.wrapper)
    }
  },
  mounted() {
    this.wrapper = document.querySelector('#main-wrapper')
    this.widgetList = Object.keys(Creator.components)
    Creator.render('CellForm', this.wrapper)
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container {
  width: 375px;
  height: 750px;
  margin: 0 auto;
  position: relative;
  background: url("/static/simple.jpg");
}
.list {
  cursor: pointer;
}
</style>
