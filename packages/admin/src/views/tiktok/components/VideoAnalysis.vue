<template>
  <div>
    <el-card class="has-tools">
      <template #header>
        <span>数据概览</span>
        <div>
          <QuickDate @change="quickDateChange" />
        </div>
      </template>
      <div class="statistics-wrapper">
        <ul v-loading="totalLoading" class="content-list1">
          <li>
            <i class="iconfont icon-interation"></i>
            <div>
              <span>互动率</span>
              <em>{{ videoInfo.interactiveRate||'-' }}</em>
            </div>
          </li>
          <li>
            <i class="iconfont icon-shou_xin_fill"></i>
            <div>
              <span>赞粉率</span>
              <em>{{ videoInfo.diggFansRate||'-' }}</em>
            </div>
          </li>
          <li>
            <i class="iconfont icon-zan"></i>
            <div>
              <span>平均点赞/点赞率</span>
              <em>{{ videoInfo.averageDigg||'-' }}/{{ videoInfo.diggRate||'-' }}</em>
            </div>
          </li>
          <li>
            <i class="iconfont icon-xinxi1"></i>
            <div>
              <span>平均评论</span>
              <em>{{ videoInfo.averageComment||'-' }}</em>
            </div>
          </li>
          <li>
            <i class="iconfont icon-fenxiang1"></i>
            <div>
              <span>平均分享/转发率</span>
              <em>{{ videoInfo.averageShare||'-' }}/{{ videoInfo.forwardRate||'-' }}</em>
            </div>
          </li>
        </ul>
        <div class="filter-wrapper">
          <!-- <span class="filter-text">筛选：</span> -->
          <AppSearch ref="searchForm" label-width="60px" :options="searchOptions" :action="fetchVideoList" />
        </div>
        <!-- <ul class="content-list2">
          <li>
            <span>场均互动率</span>
            <em>{{ statisticsInfo.averageInteractionRate | money }}%</em>
          </li>
          <li>
            <span>场均人数</span>
            <em>{{ statisticsInfo.averageViewsNum | toTenThousand }}%</em>
          </li>
          <li>
            <span>场均在线</span>
            <em>{{ statisticsInfo.averageOnlineNum | toTenThousand }}</em>
          </li>
          <li>
            <span>观看人数峰值</span>
            <em>{{ statisticsInfo.viewsPeakNum | toTenThousand }}</em>
          </li>
        </ul> -->
      </div>
    </el-card>
    <el-card class="base-box--top has-tools" shadow="never" style="min-height: 314px">
      <template #header>
        <span>视频作品</span>
      </template>
      <div v-loading="videoListLoading" class="video-box">
        <div v-for="(item,index) in videoList" :key="index" class="video-item">
          <div class="video-item-left">
            <div class="video">
              <a :href="item.share_url" target="_blank" style="cursor: pointer;">
                <img :src="item.cover">
              </a>
            </div>
            <div class="video-msg">
              <div>
                <div class="video-title">
                  <a class="hover-link" :href="item.share_url" target="_blank">{{ item.desc }}</a>
                </div>
                <p class="publish-time">发布时间：{{ item.create_time }}</p>
              </div>
              <div class="tools-box">
                <span><i class="iconfont icon-zan1"></i>{{ item.digg_count||0 }}</span>
                <span><i class="iconfont icon-xinxi"></i>{{ item.comment_count||0 }}</span>
                <span><i class="iconfont icon-fenxiang"></i>{{ item.hare_count||0 }}</span>
                <span><i class="iconfont icon-xunhuan"></i>{{ item.forward_count||0 }}</span>
                <span><i class="iconfont icon-shou_xin_fill2"></i>{{ item.digg_fans_rate||0 }}</span>
              </div>
            </div>
          </div>
          <div class="video-item-right">
            <span class="video-tools">
              <i class="iconfont icon-bofang" @click="handleShowVideo(item)"></i>
              <!-- <i class="el-icon-video-pause"></i> -->
            </span>
            <span class="video-detail">
              <i class="iconfont icon-caidan" @click="goVideoDetail(item.id)"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="pagination">
        <AppPagination v-model="pagination" @update="fetchVideoList" />
      </div>
    </el-card>

    <!-- <el-dialog :visible.sync="showDialog" title="查看视频">
      <div class="share-rideo-box">
        <div id="mse" class="share-rideo-left">
          <Xgplayer :config="playerOptions" @player="Player = $event" />
        </div>
        <div class="share-rideo-right">
          <div class="top">
            <div class="user-info">
              <div class="head-portrait">
                <el-image :src="userInfo.avatar" style="width: 100%; height: 100%; border-radius: 50%" />
              </div>
              <div class="user-msg">
                <div class="user-name">{{ userInfo.name }}</div>
                <div class="user-id">抖音号 {{ userInfo.tiktokId }}</div>
              </div>
            </div>
            <div class="descript">{{ currentData.desc }}</div>
          </div>
          <div class="bottom">
            <img src="data:image/png;base64,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" alt="抖音">
            <p>扫码下载抖音，观看更多有趣视频</p>
          </div>
        </div>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import { fetchVideoList, fetchTalentLiveVideoInfo } from '@/api/tiktok'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/zh-cn'
import dimensionFormat from '@/views/dashboard/components/mixins/dimensionFormat'
import QuickDate from '@/components/QuickDate'
import moment from 'moment'
import { debounce } from '@/utils'
// 引入西瓜视频
// import Xgplayer from 'xgplayer-vue'
// 快速选择日期列表
const ranges = [
  { label: '今天', dates: [moment(), moment()] },
  { label: '昨天', dates: [moment().subtract(1, 'days'), moment().subtract(1, 'days')] },
  { label: '前天', dates: [moment().subtract(2, 'days'), moment().subtract(2, 'days')] },
  { label: '近7天', dates: [moment().subtract(6, 'd'), moment()] },
  { label: '近14天', dates: [moment().subtract(13, 'days'), moment()] },
  { label: '近30天', dates: [moment().subtract(29, 'days'), moment()] },
  { label: '近60天', dates: [moment().subtract(59, 'days'), moment()] },
  { label: '近90天', dates: [moment().subtract(89, 'days'), moment()] },
  { label: '本周', dates: [moment().startOf('week'), moment().endOf('week')] },
  { label: '本月', dates: [moment().startOf('month'), moment().endOf('month')] },
  { label: '本季度', dates: [moment().startOf('quarter'), moment().endOf('quarter')] },
  { label: '本年', dates: [moment().startOf('year'), moment().endOf('year')] }
]
const granularityOptions = [
  { value: 'hour', label: '按小时查看' },
  { value: 'day', label: '按天查看' },
  { value: 'week', label: '按周查看' },
  { value: 'month', label: '按月查看' },
  { value: 'quarter', label: '按季度查看' }
]
const commentsOptions = [{
  value: '',
  label: '不限'
}, {
  value: '20',
  label: '>20'
}, {
  value: '100',
  label: '>100'
}, {
  value: '200',
  label: '>200'
}, {
  value: '500',
  label: '>500'
}]
export default {
  name: 'VideoAnalysis',
  components: {
    // Xgplayer,
    QuickDate
  },
  mixins: [dimensionFormat],
  props: {
    userInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      quickDateType: '-3',
      quickDateType2: '1',
      totalLoading: false,
      loading: false,
      startTime: '', // 开始时间
      endTime: '', // 结束时间
      searchValue: '', // 搜索词
      input1: '',
      data: {},
      showDialog: false,
      commentsNum: '', // 评论数
      viewOptions: [{
        value: '',
        label: '不限'
      }, {
        value: '500',
        label: '>500'
      }, {
        value: '1000',
        label: '>1000'
      }, {
        value: '1500',
        label: '>1500'
      }, {
        value: '3000',
        label: '>3000'
      }, {
        value: '12000',
        label: '>1.2w'
      }, {
        value: '50000',
        label: '>5w'
      }, {
        value: '>100000',
        label: '>10w'
      }, {
        value: '>200000',
        label: '>20w'
      }, {
        value: '>1000000',
        label: '>100w'
      }],
      viewCounts: '', // 播放量
      playerOptions: {
        id: 'video',
        width: '100%',
        url: ''
      },
      Player: null,
      openDatePicker: false,
      dates: [],
      currentTime: '',
      ranges,
      granularityOptions: [granularityOptions[0]],
      labelWidth: '60px',
      videoInfo: {},
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0
      },
      currentData: {},
      videoListLoading: false
    }
  },
  computed: {
    videoList () {
      return this.data.list || []
    },
    searchOptions () {
      return [
        { key: 'dates', xs: 12, sm: 10, md: 10, lg: 7, label: '时间', component: { name: 'range' }},
        { key: 'desc', xs: 12, sm: 7, md: 7, lg: 6, label: '关键词', component: { name: 'input', placeholder: '请输入关键词', clearable: true }},
        { key: 'commentCount', xs: 12, sm: 7, md: 7, lg: 5, label: '评论数', component: { name: 'select', placeholder: '请选择', options: commentsOptions }}
      ]
    }
  },
  created () {
    this.dates = [moment().subtract(Math.abs(this.quickDateType), 'days').toDate(), moment().toDate()]
  },
  methods: {
    async fetchTalentLiveVideoInfo (dates) {
      dates = dates || []
      this.totalLoading = true
      try {
        const data = await fetchTalentLiveVideoInfo({
          userId: this.$route.params.id,
          startTime: dates[0],
          endTime: dates[1]
        })
        this.videoInfo = data || {}
        console.log(data)
      } catch (err) {
        console.error(err)
      } finally {
        this.totalLoading = false
      }
    },
    /**
     * @create 2021/02/04 10:34
     * @desc 获取数据
     */
    async fetchVideoList (form) {
      this.videoListLoading = true
      let obj = null
      if (form) {
        obj = {
          ...form
        }
        if (this.dates.length > 0) {
          obj.startTime = form.dates[0]
          obj.endTime = form.dates[1]
        }
        delete obj.dates
      }
      try {
        const data = await fetchVideoList({
          userId: this.$route.params.id,
          page: this.pagination.page,
          pageSize: this.pagination.pageSize,
          ...obj
        })
        this.data = data
        this.pagination.total = (data.total || 0) * 1
      } catch (err) {
        console.error(err)
      } finally {
        this.videoListLoading = false
      }
    },
    handleSearch: debounce(function () {
      this.fetchVideoList()
    }, 300, true),
    goVideoDetail (id) {
      this.$router.push(`/tiktok/video-analysis-details/${id}`)
    },
    handleShowVideo (item) {
      window.open(item.share_url)
      // this.currentData = item
      // this.playerOptions.url = '//s1.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
      // this.showDialog = true
    },

    // player is ready
    playerReadied (player) {
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    },
    /**
     * @date 2021/02/19 15:15
     * @description 处理快捷日期变更
     * @param { Array } dates
     */
    quickDateChange (dates) {
      this.fetchVideoList({ dates })
      this.fetchTalentLiveVideoInfo(dates)
      // this.dates = dates
      this.$nextTick(() => {
        this.$refs.searchForm.form.dates = dates
      })
    },
    /**
     * @date 2020/11/18 17:40
     * @description 更改维度
     * @param { String } dimension
     */
    changeDimension (dimension) {
      this.openDatePicker = false
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-wrapper{
  display: flex;
  background-color: #f9f9fb;
  padding: 40px 0 23px 0;
  .filter-text{
    line-height: 32px;
    margin-left: 15px;
    margin-right: 20px;
  }
  .filter-condition{
    flex: 1;
  }
  >>>.el-form-item__label{
    font-weight: normal;
  }
  .search-filter {
    box-shadow: none;
    background: none;
    flex: 1;

    >>>.el-card__body {
      padding-top: 0;
    }
  }
}
.search-item-wrapper{
  margin-top: 15px;
}
.time-filter-box{
  display: flex;
  align-items: center;
  .start-time,.end-time{
    flex:1;
  }
}
.video-box{
  .video-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #EAEAEA;
    &:first-child{
      padding-top: 0px;
    }
    &-left{
      display: flex;
      // align-items: center;
      .video{

        border-radius: 2px;
        overflow: hidden;
        background: #F1F2F5;
        margin-right: 20px;
        img{
          width: 80px;
          height: auto;
          object-fit: contain;
        }
      }
      .video-msg{
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
    &-right{
      display: flex;
      align-items: center;
      margin-right: 20px;
      .video-tools{
        color: #333;
      }
      .video-detail{
        color: #333;
        font-size: 20px;
        margin-left: 30px;
      }
      .iconfont{
        font-size: 25px;
        cursor: pointer;
      }
    }
  }
  .video-title{
    color:#101010;
    font-size: 13px;
    font-weight: 400;
    line-height: 19px;
    margin: 0;
  }
  .publish-time{
    color: #999999;
    font-size: 12px;
    margin-top: 10px;
  }
  .tools-box{
    line-height: 19px;
    color: #999999;
    span{
      margin-right: 10px;
    }
    i{
      font-size: 10px;
      color: #555555;
      margin-right: 3px;
    }
  }
}
.share-rideo-box{
  display: flex;
  .share-rideo-left{
    width: 406px;
    height: 583px;
    background: #101010;
    display: flex;
    align-items: center;
  }
  .share-rideo-right{
    flex:1;
    padding:0 30px 0 44px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .user-info{
      display: flex;
      align-items: center;
    }
    .head-portrait{
      width: 65px;
      height: 65px;
      border-radius: 50%;
      background: #ccc;
      margin-right: 10px;
    }
    .user-msg{
      color: #101010;
      font-size: 14px;
      font-weight: bold;
    }
    .user-id{
      margin-top: 5px;
      color: #777777;
      font-size: 12px;
      font-weight: 400;
    }
    .descript{
      margin-top: 36px;
      padding-bottom: 30px;
      border-bottom: 1px solid #EAEAEA;
    }
  }
  .bottom{
    text-align: center;
    color: #101010;
  }
}
</style>
