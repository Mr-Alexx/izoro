<template>
  <el-card class="chart-card" :class="{ 'is-active': active }" @click.native="$emit('change')">
    <template #header>
      <div class="chart-card__title">
        <span>
          {{ title }}
          <template v-if="answer">
            <el-tooltip placement="top" popper-class="chart-card__tooltip">
              <template slot="content">
                <span>{{ answer }}</span>
              </template>
              <i class="el-icon-question"></i>
            </el-tooltip>
          </template>
        </span>
        <!-- overlay-class-name="menu-tooltip" -->
        <el-tooltip v-if="$slots.menu" placement="bottom">
          <template slot="content">
            <!-- <slot name="menu"></slot> -->
            点击切换下方图表
          </template>
          <i class="el-icon-menu"></i>
        </el-tooltip>
      </div>
    </template>
    <div class="chart-card__value">
      <CountTo
        class="count"
        :prefix="symbol"
        :start-val="0"
        :end-val="total"
        :duration="1000"
        :decimals="decimals"
      />
      <el-tooltip placement="top">
        <template #content>
          同期对比 ({{ startDate === endDate ? startDate : `${startDate} ~ ${endDate}` }})
        </template>
        <CompareRate :value="rate" />
      </el-tooltip>
    </div>
    <div class="chart-card__chart">
      <LineChart :options="options" style="height: 30px" />
    </div>
  </el-card>
</template>

<script>
import CountTo from 'vue-count-to'
import CompareRate from '@/components/CompareRate'
import LineChart from './LineChart'
import moment from 'moment'

export default {
  name: 'ChartCard',
  components: {
    CountTo,
    CompareRate,
    LineChart
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    answer: {
      type: String,
      default: ''
    },
    symbol: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    active: {
      type: Boolean,
      default: false
    },
    decimals: {
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    total () {
      return Number(this.data.total || 0)
    },
    rate () {
      return (this.data.compareData || {}).ratio
    },
    startDate () {
      return moment((this.data.compareDate || {}).startDate).format('YYYY-MM-DD')
    },
    endDate () {
      return moment((this.data.compareDate || {}).endDate).format('YYYY-MM-DD')
    }
  }
}
</script>

<style>
.chart-card__tooltip {
  max-width: 200px;
}
</style>
<style lang="scss" scoped>
.chart-card {
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);

  /deep/ .el-card__header {
    border: none;
  }
  /deep/ .el-card__body {
    padding-top: 0;
    padding-bottom: 15px;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-size: $font-size-large;
    font-weight: bold;

    .el-icon-question {
      font-size: 14px;
      margin-left: 3px;
    }

    >span {
      display: flex;
      align-items: center;
      color: #888;
    }
  }

  &__value {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .count {
      font-size: 26px;
      font-weight: 400;
      color: rgba(0, 0, 0, .65);
    }

    >>>.compare-rate {
      margin-left: 15px;
      font-size: $font-size-mini;
    }

    @media screen and (max-width: 768px) {
      display: block;

      .count {
        font-size: 18px;
      }
      >>>.compare-rate  {
        margin-left: 0;
      }
    }
}

  &.is-active {
    .count {
      color: #f6b30a;
      font-weight: 500;
    }
    .chart-card__title {
      span {
        color: $text-color-base;
      }
    }
  }
}

</style>

