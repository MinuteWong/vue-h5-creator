export default {
  name: 'OperatorPannel',
  computed: {
    options() {
      return this.$store.getters.activated_options || { style: {}}
    }
  },
  render(h) {
    return (
      <div>
        <el-input value={this.options.style.width} placeholder='请输入内容'></el-input>
      </div>
    )
  }
//   created(){

//   }
}
