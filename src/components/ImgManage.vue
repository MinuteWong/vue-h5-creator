<template>
<div class="imglist">
    <div class="imglist__item" v-for="item in imgList" @click="selectImg = item" :key="item" :class="{active:selectImg === item}">
         <img :src="item" >
    </div>
    <el-upload
    style="float:left"
    action="/api/upload/file"
    :on-success="handleUpload"
    :show-file-list="false"
    list-type="picture-card">
        <i class="el-icon-plus"></i>
    </el-upload>
    <el-button type="primary" style="float:left" @click="handleSubmit">确定</el-button>
</div>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      imgList: [],
      selectImg: ''
    }
  },
  methods: {
    getImgList() {
      request({ url: '/api/media/img', method: 'get' }).then(res => {
        this.imgList = res.data
      })
    },
    handleUpload() {
      this.getImgList()
    },
    handleSubmit() {
      if (!this.selectImg) return false
      this.$emit('selectBg', this.selectImg)
    }
  },
  created() {
    this.getImgList()
  }
}
</script>

<style lang="scss" scoped>
.imglist{
    overflow: hidden;
}
.imglist__item{
    height: 150px;
    float: left;
    position: relative;
    margin: 10px;
    img{
        height: 100%;
    }
    &.active::after {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        left: -1px;
        top: -1px;
        border: 2px solid #409eff;
        box-shadow: 2px 2px 4px rgba($color: #409eff, $alpha: 0.2),2px 2px 8px rgba($color: #409eff, $alpha: 0.05),2px 2px 16px rgba($color: #409eff, $alpha: 0.2)
    }
}
</style>

