// 配置路由的文件
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

// 安装插件
Vue.use(VueRouter)

// 二次封装，重写 push | replace
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // 指定了成功与失败的回调
    originPush.call(this, location, resolve, reject)
  } else {
    // 未指定成功与失败的回调
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    // 指定了成功与失败的回调
    originReplace.call(this, location, resolve, reject)
  } else {
    // 未指定成功与失败的回调
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

// 配置路由
const router = new VueRouter({
  routes,
  // 滚动行为
  /* scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { top: 0 }
  } */
  scrollBehavior() {
    // return 期望滚动到哪个的位置
    return { y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('TOKEN')
  if (token) {
    if (to.path === '/login' || to.path === '/register') {
      next(false)
    } else {
      next()
    }
  } else {
    const toPath = [
      '/shopcart',
      '/addcartsuccess',
      '/trade',
      '/pay',
      '/paysuccess',
      '/center',
      '/center/myorder',
      '/center/grouporder'
    ]
    if (toPath.includes(to.path)) {
      next('/login?redirect=' + to.path)
    } else {
      next()
    }
  }
})

export default router
