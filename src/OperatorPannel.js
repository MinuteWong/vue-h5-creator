export default {
  name: 'OperatorPannel',
  computed: {
    options() {
      return this.$store.getters.activated_options || { style: {}}
    }
  },
  methods: {
    handleChage(val) {
      console.log(val)
    }
  },
  render(h) {
    return (
      <div>
        <el-input value={this.options.style.width} placeholder='请输入内容' onChange={this.handleChage} />
      </div>
    )
  }
  //   created(){

  //   }
}
