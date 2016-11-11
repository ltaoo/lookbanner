<template>
  <div class="index">
    <waterfall
      :align="align"
      :line-gap="320"
      :min-line-gap = "20"
      :max-line-gap = "20"
      :watch="images"
      @reflowed="reflowed"
      ref="waterfall"
    >
      <!-- each component is wrapped by a waterfall slot -->
      <waterfall-slot
        v-for="(img, index) in images"
        :width="img.width"
        :height="img.height"
        :order="index"
        :key="img.id"
        move-class="item-move"
      >
        <el-card :body-style="{ padding: '0px', cursor: 'pointer'}">
          <img :src="img.original_url" class="image" @click="changeVisible(img)">
          <div style="padding: 14px;">
            <span>{{index + img.web_name}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ img.create_time }}</time>
            </div>
          </div>
        </el-card>
      </waterfall-slot>
    </waterfall>
    <div v-loading="busy" class="el-loading-demo"></div>
    <el-dialog v-model="dialogVisible" size="small">
      <img :src="currentImg.original_url" class="image">
    </el-dialog>
  </div>
</template>

<script>
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
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
        busy: false,
        align: 'center'
      }
    },
    mounted () {
      this.loadMore()
    },
    components: {
      'waterfall': Waterfall,
      'waterfall-slot': WaterfallSlot
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
              res.body.img = res.body.img.map(item => {
                console.log(item.width, item.height)
                return Object.assign(item, {
                  width: parseInt(item.width, 10),
                  height: parseInt(item.height, 10)
                })
              })
              this.images = [...oldAry, ...res.body.img]
              console.log(this.images)
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
      },
      shuffle: function () {
        this.items.sort(function () {
          return Math.random() - 0.5
        })
      },
      reflowed: function () {
        this.isBusy = false
      }
    }
  }
</script>

<style>
  .index {
    width: 1180px;
    margin: 10px auto;
  }
  .img__item {
    margin-bottom: 10px;
  }
  .item-move {
    transition: all .5s cubic-bezier(.55,0,.1,1);
    -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .el-card {
    margin: 5px;
  }
  .item {
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    font-size: 1.2em;
    color: rgb(0,158,107);
  }
  .item:after {
    content: attr(index);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
  .wf-transition {
    transition: opacity .3s ease;
    -webkit-transition: opacity .3s ease;
  }
  .wf-enter {
    opacity: 0;
  }
</style>