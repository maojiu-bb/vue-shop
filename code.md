### 路由传递参数

1. 字符串

```js
this.$router.push(
  '/search/' + this.keyword + '?k=' + this.keyword.toUpperCase()
)
```

2. 模板字符串

```js
this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
```

3. 对象
   3.1 路由传递参数（对象形式），path 不能和 params 一起使用

```js
this.$router.push({
  name: 'search',
  params: { keyword: this.keyword },
  query: { k: this.keyword.toUpperCase() }
})
```

3.2
(1)如果路由要求传递 params 参数，但是不传递，URL 会有问题
(2)如何指定 params 参数可传递或者不传递，在配置路由的时候，在占位的后面加上一个问号？

```js
      {
    path: '/search/:keyword?',
    component: SearchView,
    meta: { show: true },
    name: 'search'
  }
```

3.3 params 参数可以传、也可以不传递，但如果传递的为空字符串

```js
this.$router.push({
  name: 'search',
  params: { keyword: '' || undefined },
  query: { k: this.keyword.toUpperCase() }
})
```

### 路由组件传递 props 数据

1. 布尔值写法: 只能传递 params 参数

```js
props: true
```

2. 对象写法：额外给路由组件传递一些 props

```js
props: { a: 1, b: 2 }
```

3. 函数写法：可以传递 params 参数，query 参数，通过 props 传递给路由组件
   ```js
   props: ($route) => {
     return {
       keyword: $route.params.keyword,
       k: $route.query.k
     }
   }
   ```

### 二次封装，重写 push | replace

```js
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
```

### nginx 配置

1. xshell 进入根目录/etc
2. 进入 etc 目录，这个目录下有一个 nginx 目录，进入这个目录
3. 如果要安装 nginx: yum install nginx
4. 安装完 nginx 服务器后，在 nginx 目录下多了一个 nginx.conf 文件，在这个文件中进行配置
5. vim nginx.conf 进行编辑，主要添加如下两项
   location / {
   root /root/jch/www/shangpinhui/dist;
   index index.html;
   try_files $uri $uri/ /index.html
   }
   location /api {
   proxy_pass http://gmall-h5-api.atguigu.cn
   }

root 为项目地址
proxy_pass 为反向代理服务器  
6. nginx 服务器跑起来
service nginx start
