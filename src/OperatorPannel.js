import '@/style/operatorBar.scss'
export default {
  name: 'OperatorPannel',
  computed: {
    style() {
      return this.$store.getters.activated_element ? this.$store.getters.activated_element.style : {}
    },
    activated_id() {
      return this.$store.state.activated_id
    },
    activated_page_id() {
      return this.$store.state.activated_page_id
    }
  },
  methods: {
    handleChage(val) {
      const commitData = {}
      if (this.activated_id) {
        commitData.id = this.activated_id
        commitData.style = { backgroundColor: val }
        commitData.type = 'widget'
      } else {
        commitData.id = this.activated_page_id
        commitData.style = { backgroundColor: val }
        commitData.type = 'page'
      }
      this.$store.commit('OPTIONS_CHANGE', commitData)
    }
  },
  render(h) {
    return (
      <div class='operator-bar'>
        <div class='style__base'>
          <p>
            <span>高：{this.style.height}</span>
            <span>X坐标：{this.style.left}</span>
          </p>
          <p>
            <span>宽：{this.style.width}</span>
            <span>Y坐标：{this.style.top}</span>
          </p>
        </div>
        <el-input value={this.style.backgroundColor} placeholder='请输入当前元素背景颜色' onInput={this.handleChage} />
      </div>
    )
  }
  //   created(){

  //   }
}
