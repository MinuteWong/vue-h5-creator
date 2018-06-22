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
      console.log(val)
      this.$store.commit('OPTIONS_CHANGE', { id: this.activated_id, style: { backgroundColor: val }})
    }
  },
  render(h) {
    return (
      <div>
        <el-input value={this.style.backgroundColor} placeholder='请输入内容' onChange={this.handleChage} />
      </div>
    )
  }
  //   created(){

  //   }
}
