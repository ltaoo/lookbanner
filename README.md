# lookbanner

> 一个采集电商网站 banner 的网站前端部分

## 开始

``` bash
# 安装项目依赖
npm install

# 运行 json-server 服务
npm run server

# 打开另一个cmd窗口，开启开发服务器，将会自动打开浏览器
npm run dev
```

## 更新

2016年11月11日 修改数据，增加 width 与 height ，使用第三方组件`vue-waterfall`，细微调整后实现瀑布流布局。调整如下：
```javascript
// lib/waterfall.vue
// 177 行附近
rect.height = meta.height * (options.fixedHeight ? 1 : width / meta.width)
// 修改如下
rect.height = (meta.height/meta.width)*width + 80
```

将瀑布流与滚动加载整合到一起，vue-infinite-scroll 与 vue-waterfall，需要增加一段代码：
```javascript
// lib/waterfall.vue
// 179 行附近
vm.style.height = Math.max.apply(Math, tops) + 'px'
// 下面加上
vm.$parent.busy = false
```

