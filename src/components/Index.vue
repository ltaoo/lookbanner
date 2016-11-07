<template>
  <div>
    <el-row>
      <el-col :span="4" v-for="img in images">
        <el-card :body-style="{ padding: '0px', cursor: 'pointer' }">
          <img :src="img.original_url" class="image" @click="changeVisible(img)">
          <div style="padding: 14px;">
            <span>{{img.web_name}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ img.create_time }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-model="dialogVisible" size="small">
      <img :src="currentImg.original_url" class="image">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        images: [],
        dialogVisible: false,
        // 点击的图片
        currentImg: {
          original_url: ''
        }
      }
    },
    // 页面前获取数据
    beforeCreate () {
      this.$http.get('http://127.0.0.1:3000/image')
        .then(res => {
          // console.log(res)
          if (res.status === 200) {
            // 获取数据成功
            this.images = res.body
          }
        }, err => {
          console.log(err)
        })
    },
    methods: {
      changeVisible (img) {
        this.dialogVisible = !this.dialogVisible
        this.currentImg = img
      }
    }
  }
</script>

<style>
  
</style>