import HomeView from '@/views/Home/HomeView.vue'

// 路由规则
const routes = [
  // 首页重定向
  { path: '/', redirect: '/home' },
  // 首页路由规则
  {
    path: '/home',
    component: HomeView,
    meta: { show: true }
  },
  // 搜索页路由规则
  {
    path: '/search/:keyword?',
    component: () => import('@/views/Search/SearchView.vue'),
    meta: { show: true },
    name: 'search',
    // 路由组件传递 props 数据
    // 布尔值写法: 只能传递 params 参数
    // props: true
    // 对象写法：额外给路由组件传递一些 props
    // props: { a: 1, b: 2 }
    // 函数写法：可以传递 params 参数，query 参数，通过 props 传递给路由组件
    props: ($route) => {
      return {
        keyword: $route.params.keyword,
        k: $route.query.k
      }
    }
  },
  // 详情页路由规则
  {
    path: '/detail/:skUid',
    component: () => import('@/views/Detail/DetailView.vue'),
    meta: { show: true }
  },
  // 添加购物车成功
  {
    path: '/addcartsuccess',
    component: () => import('@/views/AddCartSuccess/index.vue'),
    meta: { show: true }
  },
  // 购物车
  {
    path: '/shopcart',
    component: () => import('@/views/ShopCart/index.vue'),
    meta: { show: true }
  },
  // 登录页路由规则
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue')
  },
  // 注册页路由 规则
  {
    path: '/register',
    component: () => import('@/views/Register/index.vue')
  },
  // 订单
  {
    path: '/trade',
    component: () => import('@/views/Trade/index.vue'),
    meta: { show: true },
    beforeEnter(to, from, next) {
      if (from.path === '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
  // 支付
  {
    path: '/pay',
    component: () => import('@/views/Pay/index.vue'),
    meta: { show: true },
    beforeEnter(to, from, next) {
      if (from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    component: () => import('@/views/PaySuccess/index.vue'),
    meta: { show: true }
  },
  {
    path: '/center',
    component: () => import('@/views/Center/index.vue'),
    meta: { show: true },
    children: [
      {
        path: '',
        redirect: 'myorder'
      },
      {
        path: 'myorder',
        component: () => import('@/views/Center/MyOrder/MyOrder.vue')
      },
      {
        path: 'grouporder',
        component: () => import('@/views/Center/GroupOrder/GroupOrder.vue')
      }
    ]
  }
]

export default routes
