
<template>
  <div class="base-box video-analysis-details">
    <el-card class="has-tools">
      <template slot="header">
        <QuickDate @change="fetchVideoInfo" />
        <el-button-group>
          <el-button @click="$router.go(-1)">返回</el-button>
          <el-button v-if="statisticsInfo.nextId" @click="$router.push(`/tiktok/video-analysis-details/${statisticsInfo.nextId}`)">下一个视频</el-button>
        </el-button-group>
      </template>
      <div v-loading="loading" class="video-analysis-top">
        <div class="video-cover">
          <img :src="statisticsInfo.cover">
        </div>
        <div class="video-detail-msg">
          <div>
            <h3 class="video-title">{{ statisticsInfo.desc ||'' }}</h3>
            <p class="publish-time">发布时间：{{ statisticsInfo.createTime ||'' }}</p>
          </div>
          <div class="video-data-box">
            <div class="list">
              <p class="item-title">总点赞数</p>
              <p class="item-data">{{ statisticsInfo.diggCount | toTenThousand }}</p>
            </div>
            <div class="list">
              <p class="item-title">点赞率</p>
              <p class="item-data">{{ statisticsInfo.diggRate }}</p>
            </div>
            <div class="list">
              <p class="item-title">赞粉比</p>
              <p class="item-data">{{ statisticsInfo.diggFansRate }}</p>
            </div>
            <div class="list">
              <p class="item-title">互动率</p>
              <p class="item-data">{{ statisticsInfo.interactiveRate }}</p>
            </div>
            <div class="list">
              <p class="item-title">总转发数</p>
              <p class="item-data">{{ statisticsInfo.forwardCount | toTenThousand }}</p>
            </div>
            <div class="list">
              <p class="item-title">总评论数</p>
              <p class="item-data">{{ statisticsInfo.commentCount | toTenThousand }}</p>
            </div>
          </div>
        </div>
        <!-- <div class="tools-box">
          <el-button-group>
            <el-button @click="$router.go(-1)">返回</el-button>
            <el-button v-if="statisticsInfo.nextId" @click="$router.push(`/tiktok/video-analysis-details/${statisticsInfo.nextId}`)">下一个视频</el-button>
          </el-button-group>
        </div> -->
      </div>
    </el-card>

    <el-card v-loading="loading" class="base-box--top">
      <el-row :gutter="20">
        <el-col :sm="24" :md="12">
          <h3>点赞趋势</h3>
          <LineChart :options="options" style="height: 204px" />
        </el-col>
        <el-col :sm="24" :md="12">
          <h3>转发趋势</h3>
          <LineChart :options="options2" style="height: 204px" />
        </el-col>
      </el-row>
    </el-card>

    <el-card class="base-box--top has-tools">
      <h3 slot="header">热门评论TOP20</h3>
      <el-row v-loading="loading" :gutter="20" type="flex" style="flex-wrap: wrap">
        <el-col
          v-for="(item,index) in comments"
          :key="index"
          :xs="24"
          :sm="12"
          :md="8"
        >
          <div class="review-item">
            <div class="comments-img">
              <img :src="item.avatar" alt="">
            </div>
            <div class="comments-detail">
              <div class="comments-detail-con">
                <p class="comments-title">{{ item.nickname }}</p>
                <p class="comments-content">{{ item.text }}</p>
                <p class="comments-time">{{ item.createTime }}</p>
              </div>
              <div class="like-box" style="text-align:center;">
                <div><i style="color:#999999;" class="iconfont icon-xihuan"></i></div>
                <div>{{ item.diggCount }}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import LineChart from '@/components/Chart/LineChart'
import { fetchVideoInfo } from '@/api/tiktok'
import QuickDate from '@/components/QuickDate'
export default {
  name: 'VideoAnalysisDetails',
  components: {
    LineChart,
    QuickDate
  },
  filters: {
    toTenThousand (num) {
      if (isNaN(+num)) { return '-' }
      return num < 10000 ? num : (Number((num / 10000).toFixed(2)) + 'w')
    }
  },
  data () {
    return {
      loading: false,
      diggTrend: [],
      forwardTrend: [],
      comments: [],
      statisticsInfo: {}
    }
  },
  computed: {
    options () {
      const data = this.diggTrend.map(v => {
        return {
          name: v.name,
          value: v[this.type === 1 ? 'incremental' : 'total']
        }
      })
      const len = data.length
      return {
        tooltip: {
          formatter: '{b0}: {c0}'
        },
        grid: {
          top: 20,
          bottom: 20,
          left: 0,
          // right: 50,
          containLabel: true
        },
        xAxis: {
          data: data.map(v => v.name),
          axisLine: { lineStyle: { color: '#69c0ff' }},
          axisLabel: {
            // 实现左右对齐 https://segmentfault.com/q/1010000019739603
            formatter (value, index) {
              return index === len - 1 ? (value + '                  ') : value
            }
          }
        },
        yAxis: {
          show: true,
          position: 'left',
          axisLine: {
            show: false
          },
          splitLine: {
            show: true
          }
        },
        series: [
          {
            name: name,
            color: '#40a9ff',
            areaStyle: { color: '#bae7ff' },
            data
          }
        ]
      }
    },
    options2 () {
      const data = this.forwardTrend.map(v => {
        return {
          name: v.name,
          value: v[this.type === 1 ? 'incremental' : 'total']
        }
      })
      const len = data.length
      return {
        tooltip: {
          formatter: '{b0}: {c0}'
        },
        grid: {
          top: 20,
          bottom: 20,
          left: 0,
          // right: 50,
          containLabel: true
        },
        xAxis: {
          data: data.map(v => v.name),
          axisLine: { lineStyle: { color: '#69c0ff' }},
          axisLabel: {
            // 实现左右对齐 https://segmentfault.com/q/1010000019739603
            formatter (value, index) {
              return index === len - 1 ? (value + '                  ') : value
            }
          }
        },
        yAxis: {
          show: true,
          position: 'left',
          axisLine: {
            show: false
          },
          splitLine: {
            show: true
          }
        },
        series: [
          {
            name: name,
            color: '#40a9ff',
            areaStyle: { color: '#bae7ff' },
            data
          }
        ]
      }
    }
  },
  created () {
    // 无须手动触发，QuickDate组件在created钩子是触发change事件，已调用了获取信息方法
    // this.fetchVideoInfo()
  },
  methods: {
    async fetchVideoInfo (dates) {
      this.loading = true
      try {
        const data = await fetchVideoInfo({ id: this.$route.params.id, startTime: dates[0], endTime: dates[1] })
        this.diggTrend = data.diggTrend || []// 点赞趋势
        this.forwardTrend = data.forwardTrend || []
        this.comments = data.comments || []
        this.statisticsInfo = data.statisticsInfo || {}
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.video-analysis-top{
  display: flex;
  justify-content: space-between;
  .video-cover{
    width: 80px;
    height: 108px;
    // background: #F1F2F5;
    border-radius: 2px;
    overflow: hidden;
    img{
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
}
.video-data-box{
  display: flex;
  .list{
    width: 100px;
    color: #777777;
    p{
      margin: 0;
    }
  }
  .item-data{
    font-size: 16px;
    font-weight: 600;
    color: #101010;
  }
}
.video-detail-msg{
  flex:1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .video-title{
    margin:0;
    line-height: 20px;
    color: #101010;
    font-weight: bold;
  }
  .publish-time{
    margin-top: 5px;
  }
}

.review-item {
  display: flex;
  height: 100%;
  padding:15px;
  padding-bottom: 0;
  background: #F9F9FB;

  .comments-img{
    width: 55px;
    height: 55px;
    border-radius: 50%;
    overflow: hidden;
    background: #999;
    img{
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
  .comments-detail{
    flex:1;
    display: flex;
    justify-content: space-between;
    margin-left: 10px;
    color: #999999;
    padding-bottom: 15px;
    border-bottom: 1px solid #EAEAEA;
    &-con{
      >p{
      margin:0;
    }
      .comments-title{
        color: #1D1D1D;
      }
      .comments-time{
        margin-top: 10px;
      }
    }
  }
}
</style>
