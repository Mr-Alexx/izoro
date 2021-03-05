<template>
  <div class="yt-table-info">
    第{{ startEndNum }}条，共{{ pagination.total | num }}条数据

    <div class="button-wrapper">
      <el-button type="primary" @click="$emit('buttonclick')">
        <i class="iconfont icon-guolv"></i>
        定制列
      </el-button>
      <el-button v-if="showDownload" type="primary" @click="$emit('download')">
        <i class="el-icon-download"></i>
        下载
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YtTableInfo',
  props: {
    showDownload: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    startEndNum () {
      const
        page = this.pagination.currentPage,
        pageSize = this.pagination.pageSize
      return `${(page - 1) * pageSize + 1}-${page * pageSize}`
    }
  }
}
</script>

<style lang="scss" scoped>
.yt-table-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $text-color-dark;

  .button-wrapper {
    display: flex;
  }

  .el-button {
    height: 24px;
    display: flex;
    align-items: center;
    padding: 0 7px;

    .iconfont {
      font-size: 12px;
    }
  }
}
</style>
