<template>
  <div id="app">
    <el-menu theme="light" default-active="1" class="navigator" mode="horizontal">
      <el-menu-item index="1"><router-link to="/">LookBanner</router-link></el-menu-item>
      <el-submenu index="2">
        <template slot="title">收录列表</template>
        <el-menu-item index="2-1"><router-link to="/web/cloudmusic">网易云音乐</router-link></el-menu-item>
        <el-menu-item index="2-2"><router-link to="/web/tmall">天猫</router-link></el-menu-item>
        <el-menu-item index="2-3"><router-link to="/web/suning">苏宁</router-link></el-menu-item>
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
  components: {
    Hello
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
