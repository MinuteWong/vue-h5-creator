import '@/style/operatorBar.scss'
export default {
  name: 'OperatorPannel',
  computed: {
    style() {
      return this.$store.getters.activated_element ? this.$store.getters.activated_element.style : {}
    },
    activated_id() {
      return this.$store.state.activated_id
    }
  },
  methods: {
    handleChage(val) {
      this.$store.commit('OPTIONS_CHANGE', { id: this.activated_id, style: { backgroundColor: val }})
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
