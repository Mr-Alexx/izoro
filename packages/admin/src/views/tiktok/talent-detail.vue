
<template>
  <div class="base-box talent-detail">
    <div class="aside-wrapper">
      <!-- 达人信息 -->
      <el-card v-loading="loading" class="user-info">
        <!-- 姓名、头像、抖音号 -->
        <a :href="`https://${userInfo.shareUrl}`" target="_blank" class="top-item">
          <el-image :src="userInfo.avatar" style="width: 65px; height: 65px; border-radius: 50%" />
          <div class="top-item__content">
            <em>{{ userInfo.name }}</em>
            <span>抖音号 {{ userInfo.tiktokId }}</span>
          </div>
        </a>

        <!-- 性别、地区、年龄、分类 -->
        <ul class="list">
          <li>性别：<em>{{ userInfo.gender }}</em></li>
          <li>地区：<em>{{ userInfo.area }}</em></li>
          <li>年龄：<em>{{ userInfo.age }}</em></li>
          <li>分类：<em>{{ userInfo.category }}</em></li>
        </ul>

        <!-- 简介 -->
        <div class="description">
          简介：
          <span>{{ userInfo.desc }}</span>
        </div>

        <!-- 标签 -->
        <div v-if="userInfo.tags" class="tag-wrapper">
          <el-tag v-for="(tag, i) in userInfo.tags" :key="i" type="info" size="small">{{ tag }}</el-tag>
        </div>

        <!-- 其它功能 -->
        <div class="other-function">
          <!-- 关注 -->
          <el-button size="small" @click="handleAttention">
            <i v-if="userInfo.status==2" style="color:red;" class="iconfont icon-xihuan"></i>
            <i v-else class="iconfont icon-heart"></i>
          </el-button>
          <!-- <el-button size="small"><i class="iconfont icon-bookmark"></i></el-button>
          <el-button size="small"><i>PK</i></el-button> -->

          <!-- 二维码分享 -->
          <el-popover
            v-if="statisticsInfo.shareQrcodeUrl"
            placement="bottom"
            width="200"
            trigger="click"
          >
            <el-button slot="reference" size="small">
              <i class="iconfont icon-zu"></i>
            </el-button>
            <div>
              <el-image :src="statisticsInfo.shareQrcodeUrl" style="width: 200px; height: 200px" />
            </div>
          </el-popover>

          <!-- 删除达人 -->
          <el-popconfirm
            title="确定要删除该达人吗？"
            @confirm="handleDelete"
          >
            <el-button slot="reference" size="small">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-popconfirm>
        </div>
      </el-card>

      <!-- 侧栏数据统计 -->
      <el-card class="base-box--top statics-info">
        <template slot="header">
          数据概览
          <el-button
            size="small"
            type="text"
            :disabled="disabled"
            @click="updateAsideTotal"
          >
            <i class="el-icon-refresh" :style="disabled ? 'animation: rotating 2s linear infinite' : '' "></i>
          </el-button>
        </template>
        <div v-loading="loading" class="aside-item-wrapper">
          <el-card shadow="hover">
            <span>作品数</span>
            <em>{{ statisticsInfo.worksNum | toTenThousand }}</em>
          </el-card>
          <el-card shadow="hover">
            <span>粉丝数</span>
            <em>{{ statisticsInfo.fansNum | toTenThousand }}</em>
          </el-card>
          <el-card shadow="hover">
            <span>总点赞数</span>
            <em>{{ statisticsInfo.likeNum | toTenThousand }}</em>
          </el-card>
          <el-card shadow="hover">
            <span>平均点赞数</span>
            <em>{{ statisticsInfo.averageLikeNum | toTenThousand }}</em>
          </el-card>
          <el-card shadow="hover">
            <span>总评论数</span>
            <em>{{ statisticsInfo.commentNum | toTenThousand }}</em>
          </el-card>
          <el-card shadow="hover">
            <span>平均评论数</span>
            <em>{{ statisticsInfo.averageCommentNum | toTenThousand }}</em>
          </el-card>
        </div>
      </el-card>
    </div>

    <div class="content-wrapper">
      <el-tabs type="card">
        <el-tab-pane label="基础分析" lazy>
          <BasicAnalysis />
        </el-tab-pane>
        <!-- <el-tab-pane label="直播分析" lazy>
          <LiveAnalysis />
        </el-tab-pane> -->
        <el-tab-pane label="视频分析" lazy>
          <VideoAnalysis :user-info="userInfo" />
        </el-tab-pane>
      </el-tabs>
      <!-- <BasicAnalysis /> -->
    </div>
  </div>
</template>

<script>
import { fetchTalentData, fetchTalenUpdate, fetchRenewUser } from '@/api/tiktok'
import BasicAnalysis from './components/BasicAnalysis'
// import LiveAnalysis from './components/LiveAnalysis'
import VideoAnalysis from './components/VideoAnalysis'
import clip from '@/utils/clipboard'

export default {
  name: 'TalentDetail',
  components: {
    BasicAnalysis,
    // LiveAnalysis,
    VideoAnalysis
  },
  data () {
    return {
      userInfo: {},
      statisticsInfo: {},
      loading: false,
      disabled: false
    }
  },
  created () {
    this.fetchTalentData()
  },
  methods: {
    handleAttention () {
      // if (Number(this.userInfo.status) === 2) return
      const id = this.$route.params.id
      fetchTalenUpdate({ ids: id, status: Number(this.userInfo.status) === 2 ? 1 : 2 }).then(() => {
        this.$message.success(Number(this.userInfo.status) === 2 ? '取消关注成功' : '关注成功')
        this.fetchTalentData()
        // this.fetchList()
      }).catch(err => {
        console.error(err)
      })
    },
    async fetchTalentData () {
      this.loading = true
      this.asideTotalLoading = true
      try {
        const data = await fetchTalentData({ id: this.$route.params.id })
        this.userInfo = data.userInfo
        this.statisticsInfo = data.statisticsInfo
      } catch (err) {
        console.error(err)
      } finally {
        this.asideTotalLoading = false
        this.loading = false
      }
    },
    handleCopy (text, event) {
      clip(text, event)
    },
    /**
     * @date 2021/02/19 16:10
     * @desc 侧栏统计数据点击刷新按钮更新信息
     * @author 潜
     */
    async updateAsideTotal () {
      this.disabled = true
      try {
        const data = await fetchRenewUser({ id: this.$route.params.id })
        console.log(data)
      } catch (err) {
        console.error(err)
      } finally {
        this.disabled = false
      }
    },
    handleDelete () {
      fetchTalenUpdate({ ids: this.$route.params.id, status: 0 }).then(() => {
        this.$router.go(-1)
      }).catch(err => {
        console.error(err)
        this.$message({
          type: 'error',
          message: err
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.talent-detail {
  // 此处注意，采用flex写法，vxe-table在缩小时无法自动响应
  // 故采用float写法
  // display: flex;

  @media screen and (max-width: 768px) {
    .aside-wrapper {
      width: 100% !important;
    }
    .content-wrapper {
      float: left;
      padding-left: 0 !important;
      padding-top: $main-space;
    }
  }

  .aside-wrapper {
    float: left;
    width: 300px;
    // flex-shrink: 0;
  }
  .content-wrapper {
    // flex: 1;
    // flex-shrink: 0;
    box-sizing: border-box;
    width: 100%;
    padding-left: 320px;
    >>>.el-tabs--card>.el-tabs__header{
      border: none;
      margin-bottom: 0;
      .el-tabs__item.is-active{
        border: none;
        background: #fff;
        color: #101010;
      }
      .el-tabs__nav{
        border: none;
      }
      .el-tabs__item{
        border: none;
        margin-left: 5px;
        background: #F8F8FA;
        &:first-child{
          margin-left: 0;
          border-left:1px solid #EBEEF5;
        }
        color:#A9A9AB;
        font-weight: normal;
      }
    }
  }
}

.user-info {
  color: $text-color-light;

  .top-item {
    display: flex;

    &:hover {
      cursor: pointer;

      em {
        text-decoration: underline;
        color: $color-primary;
      }
    }

    &__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 10px;
      line-height: 20px;

      em {
        font-size: $font-size-big;
        font-weight: 500;
        color: $text-color-dark;
      }
    }
  }

  .list {
    margin: $main-space 0;
    display: flex;
    flex-wrap: wrap;
    border-top: $border-light;
    border-bottom: $border-light;
    padding: $main-space 0;

    li {
      width: 50%;
      line-height: 26px;

      em {
        color: $text-color-dark;
      }
    }
  }

  .description {
    padding-bottom: $main-space;
    span {
      color: $text-color-dark;
      line-height: 18px;
    }
  }

  .tag-wrapper {
    .el-tag {
      margin-bottom: 10px;
      margin-right: 10px;
    }
  }

  .other-function {
    margin-top: 10px;
    padding-top: $main-space;
    border-top: $border-light;
    >>>.el-button--small{
      padding:6px 11px;
      color: #555555;
    }
    i{
      font-size: 16px;
    }
  }
}

>>>.statics-info {
  >.el-card__header {
    padding-top: 5px;
    padding-bottom: 5px;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $text-color-dark;

    .el-button {
      font-size: 18px;
    }
  }
  >.el-card__body {
    padding: 0;
  }
}

.aside-item-wrapper {
  display: flex;
  flex-wrap: wrap;
  // border-bottom: none;

  .el-card {
    width: 50%;
    border-bottom: $border-light;
    color: $text-color-light;

    &:hover {
      position: relative;
      z-index: 1;
      box-shadow: 0 1px 2px -2px rgba(0,0,0,.16), 0 3px 6px 0 rgba(0,0,0,.12), 0 5px 12px 4px rgba(0,0,0,.09);
    }

    >>>.el-card__body {
      display: flex;
      flex-direction: column;
      text-align: center;

      em {
        font-weight: 500;
        font-size: $font-size-large;
        color: $text-color-dark;
        margin-top: 5px;
      }
    }

    &:nth-child(odd) {
      border-right: $border-light;
    }
  }
}

.content-wrapper {
  padding-left: $main-space;
}

>>>.statistics-wrapper {
  .content-list1 {
    display: flex;
    justify-content: space-between;
    padding: 20px 10% 40px 10%;

    >li {
      display: flex;
      align-items: center;
      color: $text-color-light;

      >.iconfont {
        font-size: 34px;
        color: #DBDBDB;
      }

      >div {
        display: flex;
        flex-direction: column;
        padding-left: 10px;

        >em {
          font-weight: bold;
          color: $text-color-dark;
          font-size: $font-size-large;
        }
      }
    }
  }

  .content-list2 {
    display: flex;
    background-color: #f9f9fb;
    padding: $main-space 0;
    text-align: center;

    >li {
      flex: 1;
      display: flex;
      flex-direction: column;
      color: $text-color-light;

      >em {
        color: $text-color-dark;
        font-weight: bold;
      }

      &+li {
        border-left: $border-light;
      }
    }
  }
}
</style>
