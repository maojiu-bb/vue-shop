<template>
  <div>
    <!-- 头部 -->
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>尚品汇欢迎您！</p>
            <p v-if="!userName">
              <span>请</span>
              <router-link to="/login">登录</router-link>
              <router-link class="register" to="/register">
                免费注册
              </router-link>
            </p>
            <p v-else>
              <a>{{ userName }}</a>
              <a class="register" @click="logout">退出登录</a>
            </p>
          </div>
          <div class="typeList">
            <router-link to="/center/myorder">我的订单</router-link>
            <router-link to="/shopcart">我的购物车</router-link>
            <a href="###">我的尚品汇</a>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link class="logo" title="尚品汇" to="/home">
            <img src="./images/logo.png" alt="" />
          </router-link>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="keyword"
            />
            <button
              class="sui-btn btn-xlarge btn-danger"
              type="button"
              @click="goSearch"
            >
              搜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ''
    }
  },
  beforeMount() {
    this.$bus.$on('clear', () => {
      this.keyword = ''
    })
    this.$store.dispatch('userInfo')
  },

  computed: {
    userName() {
      return this.$store.state.user.userInfo.name
    }
  },
  methods: {
    goSearch() {
      // 路由传递参数
      // 1. 字符串
      /* this.$router.push(
        '/search/' + this.keyword + '?k=' + this.keyword.toUpperCase()
      ) */
      // 2. 模板字符串
      /* this.$router.push(
        `/search/${this.keyword}?k=${this.keyword.toUpperCase()}`
      ) */
      // 3. 对象
      // 路由传递参数（对象形式），path 不能和 params 一起使用
      // 如果路由要求传递 params 参数，但是不传递，URL 会有问题
      // 如何指定 params 参数可传递或者不传递，在配置路由的时候，在占位的后面加上一个问号？
      // params 参数可以传、也可以不传递，但如果传递的为空字符串
      /* this.$router.push({
        name: 'search',
        params: { keyword: '' || undefined },
        query: { k: this.keyword.toUpperCase() }
      }) */

      if (this.$route.query) {
        const location = {
          name: 'search',
          params: { keyword: this.keyword || undefined }
        }
        location.query = this.$route.query
        this.$router.push(location)
      }
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
