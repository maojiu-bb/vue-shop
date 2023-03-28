<template>
  <div>
    <!-- 三级联动组件 -->
    <TypeNav></TypeNav>
    <!-- 商品列表 -->
    <ListContainer></ListContainer>
    <!-- 今日推荐 -->
    <TodyRecommend></TodyRecommend>
    <!-- 商品排行 -->
    <RankContainer></RankContainer>
    <!-- 猜你喜欢 -->
    <GuessLike></GuessLike>
    <!-- 楼层 -->
    <FloorContainer
      v-for="floorList in floorList"
      :key="floorList.id"
      :floorList="floorList"
    ></FloorContainer>
    <!-- 商标 -->
    <BrandContainer></BrandContainer>
  </div>
</template>

<script>
// 导入 mapState
import { mapState } from 'vuex'

// 导入组件
import ListContainer from '@/views/Home/ListContainer/ListContainer.vue'
import TodyRecommend from '@/views/Home/TodyRecommend/TodyRecommend.vue'
import RankContainer from '@/views/Home/RankContainer/RankContainer.vue'
import GuessLike from '@/views/Home/GuessLike/GuessLike.vue'
import FloorContainer from '@/views/Home/FloorContainer/FloorContainer.vue'
import BrandContainer from '@/views/Home/BrandContainer/BrandContainer.vue'

export default {
  // 注册组件
  components: {
    ListContainer,
    TodyRecommend,
    RankContainer,
    GuessLike,
    FloorContainer,
    BrandContainer
  },
  mounted() {
    this.$store.dispatch('getFloorList')
    this.$store.dispatch('userInfo')
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.getFloorList
    })
  }
}
</script>

<style></style>
