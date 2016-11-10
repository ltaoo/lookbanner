<template>
  <div class="index">
    <el-row 
      :gutter="10" 
      v-infinite-scroll="loadMore" 
      infinite-scroll-disabled="busy" 
      infinite-scroll-distance="10"
    >
      <el-col :span="8" v-for="img in images" class="img__item">
        <el-card :body-style="{ padding: '0px', cursor: 'pointer'}">
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
    <div v-loading="busy" class="el-loading-demo"></div>
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
        page: 1,
        images: [],
        dialogVisible: false,
        // 点击的图片
        currentImg: {
          original_url: ''
        },
        busy: false
      }
    },
    methods: {
      changeVisible (img) {
        this.dialogVisible = !this.dialogVisible
        this.currentImg = img
      },
      // 加载更多数据
      loadMore () {
        this.busy = true
        // this.$http.get('http://139.129.17.174:3000/pages/' + this.page)
        this.$http.get('http://127.0.0.1:3000/pages/' + this.page)
          .then(res => {
            if (res.status === 200) {
              // 获取数据成功
              let oldAry = [...this.images]
              // this.images = [...oldAry, ...res.body]
              this.images = [...oldAry, ...res.body.img]
              this.busy = false
              this.page += 1
            }
          }, () => {
            // console.log(err)
            // this.busy = false
            this.$message({
              message: '没有更多图片了',
              duration: 4000,
              // 显示关闭按钮
              showClose: true
            })
          })
      }
    }
  }
</script>

<style>
  .index {
    width: 980px;
    margin: 10px auto;
  }
  .img__item {
    margin-bottom: 10px;
  }
</style>