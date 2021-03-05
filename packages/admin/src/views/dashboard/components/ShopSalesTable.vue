<template>
  <el-card class="table-card">
    <!-- 店铺销售信息 -->
    <el-table
      :data="data"
      :height="440"
      size="default"
      :default-sort="{prop: 'paymentAmount', order: 'descending'}"
    >
      <el-table-column label="店铺" prop="name" align="left" sortable />
      <el-table-column
        label="已支付金额"
        prop="paymentAmount"
        align="left"
        min-width="120px"
        sortable
        :sort-method="(a,b)=>{return a.paymentAmount - b.paymentAmount}"
      >
        <span slot-scope="scope">
          {{ symbol }}{{ scope.row.paymentAmount | money | toThousandFilter }}
        </span>
      </el-table-column>
      <el-table-column
        label="销售额占比"
        prop="name"
        sortable
        align="left"
        min-width="160px"
        :sort-method="(a,b)=>{return a.salesAmountRate - b.salesAmountRate}"
      >
        <div slot-scope="scope" class="rate">
          <span class="rate-bar" :style="{ width: getWidth(scope.row.salesAmountRate) }">
          </span>
          {{ scope.row.salesAmountRate | money }}%
        </div>
      </el-table-column>
      <el-table-column label="最后销售时间" min-width="180px" prop="lastSaleAt" />
      <!-- <div slot="orderTotalAmount" slot-scope="orderTotalAmount">
        {{ symbol }}{{ orderTotalAmount | money | toThousandFilter }}
      </div> -->

    </el-table>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      columns: [
        {
          title: '店铺',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '已支付金额',
          dataIndex: 'paymentAmount',
          key: 'paymentAmount',
          scopedSlots: { customRender: 'paymentAmount' }
        },
        // {
        //   title: '订单总额',
        //   dataIndex: 'orderTotalAmount',
        //   key: 'orderTotalAmount',
        //   scopedSlots: { customRender: 'orderTotalAmount' }
        // },
        {
          title: '销售额占比',
          dataIndex: 'salesAmountRate',
          key: 'salesAmountRate',
          scopedSlots: { customRender: 'salesAmountRate' }
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'symbol'
    ])
  },
  methods: {
    getWidth (value) {
      value = value || 0
      const res = value / 100 * 80
      return Number(res) === 0 ? 0 : res <= 1 ? '1px' : (res + 'px')
    }
  }
}
</script>

<style lang="scss" scoped>
.table-card {
  height: 440px;
  background-color: #fff;
  /deep/ .el-card__body {
    padding: 0;
  }
}

.rate {
  display: flex;
  align-items: center;
  .rate-bar {
    width: 50px;
    height: 14px;
    position: relative;
    margin-right: 5px;
    font-size: $font-size-mini;
    background-color: $color-primary;
  }
}
/deep/ .el-table th, /deep/ .el-table td {
  padding-left: 10px;
}
</style>
