<template>
  <div id="app">
    <el-menu theme="light" default-active="1" class="navigator" mode="horizontal">
      <el-menu-item index="1"><router-link to="/">LookBanner</router-link></el-menu-item>
      <el-submenu index="2">
        <template slot="title">收录列表</template>
        <template v-for="(name, index) in webs">
          <el-menu-item :index="'2-'+index"><router-link :to="'/web/'+name">{{name}}</router-link></el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item index="3"><router-link to="/person">个人中心</router-link></el-menu-item>
    </el-menu>
      <router-view></router-view>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  data() {
    return {
      webs: []
    }
  },
  components: {
    Hello
  },
  mounted() {
    // 查询收录了什么网站
    this.$http.get('http://127.0.0.1:3000/webs')
      .then(res => {
        if(res.status === 200) {
          this.webs = res.body
        }
      })
  }
}
</script>

<style>
body {
  margin: 0;
}
img {
  width: 100%;
}
#app {
  font-family: '微软雅黑', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #888;
}
.navigator {
  margin-bottom: 20px;
}
</style>
