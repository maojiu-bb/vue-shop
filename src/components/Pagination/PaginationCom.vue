<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="pervPage">上一页</button>
    <button
      v-show="startNumAndEndNum.start > 1"
      @click="firstPage"
      :class="{ active: pageNo === 1 }"
    >
      1
    </button>
    <button v-show="startNumAndEndNum.start > 2">···</button>

    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-show="page >= startNumAndEndNum.start"
      @click="curPage(page)"
      :class="{ active: pageNo === page }"
    >
      {{ page }}
    </button>

    <button v-show="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-show="startNumAndEndNum.end < totalPage"
      @click="lastPage"
      :class="{ active: pageNo === totalPage }"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo === totalPage" @click="nextPage">下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算出开始数字与结束数字
    startNumAndEndNum() {
      const { pageNo, continues, totalPage } = this
      // 定义变量存储起始数字与结束数字
      let start = 0
      let end = 0

      // 总页数小于连续页数
      if (totalPage < continues) {
        start = 1
        end = totalPage
      } else {
        // 总页数大于连续页数
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        // 纠正 start 小于 0 的情况
        if (start < 1) {
          start = 1
          end = continues
        }
        // 纠正 end 大于 totalPage 的情况
        if (end > totalPage) {
          start = totalPage - continues + 1
          end = totalPage
        }
      }
      return { start, end }
    }
  },
  methods: {
    pervPage() {
      this.$emit('currentPage', this.pageNo - 1)
    },
    firstPage() {
      this.$emit('currentPage', 1)
    },
    nextPage() {
      this.$emit('currentPage', this.pageNo + 1)
    },
    lastPage() {
      this.$emit('currentPage', this.totalPage)
    },
    curPage(page) {
      this.$emit('currentPage', page)
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background-color: skyblue;
}
</style>
