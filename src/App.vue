<template>
  <div id="app">
    <ul class="list">
      <li>点击添加元素</li>
      <li v-for="(item,i) in widgetList" @click="addWidget(item)" :key="i">
        {{item}}
      </li>
    </ul>
    <div id="test"></div>
    <operator-pannel></operator-pannel>
    <div class="container" id="main-wrapper">
    </div>
  </div>
</template>

<script>
import OperatorPannel from './OperatorPannel.js'
// import Creator from './creator'
import PageRender from './creator'
export default {
  name: 'App',
  components: {
    OperatorPannel
  },
  data() {
    return {
      wrapper: null,
      widgetList: [],
      page: null
    }
  },
  computed: {
    id() {
      return this.$store.state.activated_id
    }
  },
  methods: {
    addWidget(item) {
      this.page.addWidget(item)
      // Creator.render(item, this.wrapper)
    }
  },
  mounted() {
    // this.wrapper = document.querySelector('#main-wrapper')
    // Creator.render('CellForm', this.wrapper)
    this.page = new PageRender({ el: '#main-wrapper' })
    this.widgetList = Object.keys(this.page.components)
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
  overflow: auto;
  background: url("/static/simple.jpg");
}
.list {
  cursor: pointer;
}
</style>
