<template>
  <div class="app-container">
    <!-- 头部 -->
    <HeaderCom></HeaderCom>

    <!-- 路由出口 -->
    <router-view></router-view>

    <!-- 底部 -->
    <FooterCom v-show="$route.meta.show"></FooterCom>
  </div>
</template>

<script>
import HeaderCom from '@/components/Header/HeaderCom.vue'
import FooterCom from '@/components/Footer/FooterCom.vue'

export default {
  components: {
    HeaderCom,
    FooterCom
  },
  mounted() {
    // 通知 Vuex 发送请求，获取数据，存储于仓库中
    this.$store.dispatch('categoryList')
  }
}
</script>

<style></style>
