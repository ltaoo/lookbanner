<template>
    <div>
        <h3>{{$route.params.name}}</h3>
        <waterfall
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="busy"
                infinite-scroll-distance="100"
                :align="align"
                :line-gap="480"
                :min-line-gap = "20"
                :max-line-gap = "20"
                :watch="images"
                @reflowed="reflowed"
                ref="waterfall"
        >
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
<style>
</style>
<script>
    import Waterfall from '../components/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  export default {
    name: 'web',
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
    methods: {
        // 应该要有另外一个函数
        initData() {
            console.log('路由改变')
            this.$http.get('http://127.0.0.1:3000/' + this.$route.params.name + '/1')
              .then(res => {
                if (res.status === 200) {
                  // 获取数据成功
                  // res.body = res.body.map(item => {
                  //   return Object.assign(item, {
                  //     width: parseInt(item.width, 10),
                  //     height: parseInt(item.height, 10)
                  //   })
                  // })
                  // this.images = [...oldAry, ...res.body]
                  res.body.img = res.body.img.map(item => {
                    return Object.assign(item, {
                      width: parseInt(item.width, 10),
                      height: parseInt(item.height, 10)
                    })
                  })
                  this.images = [...res.body.img]
                  // console.log('切换路由前的第一条数据的路径是', this.images[0].original_url)
                  // this.busy = false
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
        loadMore () {
            this.busy = true
            // this.$http.get('http://139.129.17.174:3000/pages/' + this.page)
            this.$http.get('http://127.0.0.1:3000/' + this.$route.params.name + '/' + this.page)
              .then(res => {
                if (res.status === 200) {
                  // 获取数据成功
                  let oldAry = [...this.images]
                  // res.body = res.body.map(item => {
                  //   return Object.assign(item, {
                  //     width: parseInt(item.width, 10),
                  //     height: parseInt(item.height, 10)
                  //   })
                  // })
                  // this.images = [...oldAry, ...res.body]
                  res.body.img = res.body.img.map(item => {
                    return Object.assign(item, {
                      width: parseInt(item.width, 10),
                      height: parseInt(item.height, 10)
                    })
                  })
                  this.images = [...oldAry, ...res.body.img]
                  // console.log('切换路由前的第一条数据的路径是', this.images[0].original_url)
                  // this.busy = false
                  // this.page += 1
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
        reflowed: function () {
            this.isBusy = false
        }
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'initData'
    },
    components: {
      'waterfall': Waterfall,
      'waterfall-slot': WaterfallSlot
    }
  }
</script>
