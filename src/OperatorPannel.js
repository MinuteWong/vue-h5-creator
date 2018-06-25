import '@/style/operatorBar.scss'
import ImgManage from '@/components/ImgManage.vue'
export default {
  name: 'OperatorPannel',
  data() {
    return {
      form: {},
      dialogTableVisible: false
    }
  },
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
    },
    handleClick(val) {
      this.dialogTableVisible = true
    },
    handleHide() {
      this.dialogTableVisible = false
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
        <el-form ref='form' label-width='100px' size='small'>
          {/* <el-form-item label='背景颜色：'>
            <el-color-picker value={this.style.backgroundColor} onInput={this.handleChage} />
          </el-form-item> */}
          <el-form-item label='背景：'>
            <el-color-picker
              value={this.style.backgroundColor}
              onInput={this.handleChage} />
            <icon
              iconClass='icon-ai-up-img'
              class='select_img'
              nativeOnClick={this.handleClick}
            />
          </el-form-item>
        </el-form>
        <el-dialog
          title='图片素材'
          visible={this.dialogTableVisible}
          {...{ on: { 'update:visible': this.handleHide }}}>
          <ImgManage />
        </el-dialog>
      </div>
    )
  }
  //   created(){

  //   }
}
