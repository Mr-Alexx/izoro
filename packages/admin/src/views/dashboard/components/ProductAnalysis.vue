<template>
  <el-card class="sku-analysis">
    <template #header>
      <el-tabs :value="type" @tab-click="handleChangeTab">
        <el-tab-pane name="spu" label="SPU分析" />
        <el-tab-pane name="sku" label="SKU分析" />
      </el-tabs>
    </template>
    <vxe-table
      :loading="loading"
      :data="data"
      border="inner"
      size="small"
      align="center"
      :height="600"
      :empty-render="{ name: 'Empty' }"
      :sort-config="{ remote: true }"
      @sort-change="handleVxeSort"
    >
      <vxe-table-column title="图片" width="60px">
        <template slot-scope="scope">
          <BiImage width="40px" height="40px" :src="scope.row.url" :preview-src-list="[scope.row.url]" />
        </template>
      </vxe-table-column>
      <vxe-table-column v-if="type === 'sku'" title="SKU" field="sku" align="center" />
      <vxe-table-column v-else title="SPU" field="spu" align="center" />
      <vxe-table-column title="已支付金额" align="center" sortable field="paymentAmount">
        <template slot-scope="{ row }">
          <div>{{ symbol }}{{ row.paymentAmount | money | toThousandFilter }}</div>
          <div v-if="showCompare" class="compare-item">
            <span>{{ symbol }}{{ row.comparePaymentAmount | money | toThousandFilter }}</span>
            <span :class="row.diffPaymentAmount >= 0 ? 'success' : 'danger'">{{ row.paymentAmountRate | money }}% ({{ symbol }}{{ row.diffPaymentAmount | money | toThousandFilter }})</span>
          </div>
        </template>
      </vxe-table-column>
      <vxe-table-column title="已售出" align="center" sortable field="salesNum">
        <template slot-scope="{ row }">
          <div>{{ row.salesNum }}</div>
          <div v-if="showCompare" class="compare-item">
            <span>{{ row.compareSalesNum }}</span>
            <span :class="row.diffSalesNum >= 0 ? 'success' : 'danger'">{{ row.salesNumRate | money }}% ({{ row.diffSalesNum }})</span>
          </div>
        </template>
      </vxe-table-column>
      <vxe-table-column title="已支付订单数" field="paymentOrderNum" align="center" sortable>
        <template slot-scope="{ row }">
          <div>{{ row.paymentOrderNum }}</div>
          <div v-if="showCompare" class="compare-item">
            <span>{{ row.comparePaymentOrderNum }}</span>
            <span :class="row.diffPaymentOrderNum >= 0 ? 'success' : 'danger'">{{ row.paymentOrderNumRate | money }}% ({{ row.diffPaymentOrderNum }})</span>
          </div>
        </template>
      </vxe-table-column>
      <!-- sortable="custom" 后台暂时无法排序客单价 -->
      <vxe-table-column title="客单价" align="center">
        <template slot-scope="{ row }">
          <div>{{ symbol }}{{ row.unitPrice | money | toThousandFilter }}</div>
          <div v-if="showCompare" class="compare-item">
            <span>{{ symbol }}{{ row.compareUnitPrice | money | toThousandFilter }}</span>
            <span :class="row.diffUnitPrice >= 0 ? 'success' : 'danger'">{{ row.unitPriceRate | money }}% ({{ symbol }}{{ row.diffUnitPrice | money | toThousandFilter }})</span>
          </div>
        </template>
      </vxe-table-column>
      <vxe-table-column title="买家数(已支付)" align="center" sortable field="buyerNum">
        <template slot-scope="{ row }">
          <div>{{ row.buyerNum }}</div>
          <div v-if="showCompare" class="compare-item">
            <span>{{ row.compareBuyerNum }}</span>
            <span :class="row.diffBuyerNum >= 0 ? 'success' : 'danger'">{{ row.buyerNumRate | money }}% ({{ row.diffBuyerNum }})</span>
          </div>
        </template>
      </vxe-table-column>
      <vxe-table-column title="运费(已支付)" align="center" sortable field="freight">
        <template slot-scope="{ row }">
          <div>{{ symbol }}{{ row.freight | money | toThousandFilter }}</div>
          <div v-if="showCompare" class="compare-item">
            <span>{{ symbol }}{{ row.compareFreight | toThousandFilter }}</span>
            <span :class="row.diffFreight >= 0 ? 'success' : 'danger'">{{ row.freightRate | money }}% ({{ symbol }}{{ row.diffFreight | money | toThousandFilter }})</span>
          </div>
        </template>
      </vxe-table-column>
      <vxe-table-column title="操作" align="center" fixed="right" width="55">
        <template slot-scope="{ row }">
          <el-button type="text" @click="viewDetail(row)">详情</el-button>
        </template>
      </vxe-table-column>
    </vxe-table>

    <el-table
      v-if="false"
      v-loading="loading"
      :data="data"
      :max-height="650"
      stripe
      highlight-current-row
      style="min-height: 300px;"
      size="default"
      @sort-change="handleSort"
    >
      <el-table-column label="图片" prop="url" width="60px">
        <template slot-scope="scope">
          <BiImage width="40px" height="40px" :src="scope.row.url" :preview-src-list="[scope.row.url]" />
        </template>
      </el-table-column>
      <el-table-column v-if="type === 'sku'" label="SKU" prop="sku" align="center" />
      <el-table-column v-else label="SPU" prop="spu" align="center" />
      <el-table-column label="已支付金额" align="center" sortable="custom" prop="paymentAmount">
        <template slot-scope="scope">
          {{ symbol }}{{ scope.row.paymentAmount | money | toThousandFilter }}
        </template>
      </el-table-column>
      <el-table-column label="已售出" align="center" sortable="custom" prop="salesNum" />
      <el-table-column label="已支付订单数" align="center" sortable="custom" prop="paymentOrderNum" />
      <!-- sortable="custom" 后台暂时无法排序客单价 -->
      <el-table-column label="客单价" prop="unitPrice" align="center">
        <template slot-scope="scope">
          {{ symbol }}{{ scope.row.unitPrice | money }}
        </template>
      </el-table-column>
      <el-table-column label="买家数(已支付)" align="center" sortable="custom" prop="buyerNum" />
      <el-table-column label="运费(已支付)" align="center" prop="freight" sortable="custom">
        <template slot-scope="scope">
          {{ symbol }}{{ scope.row.freight | money }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="55">
        <template slot-scope="{ row }">
          <el-button type="text" @click="viewDetail(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="page"
      :pager-count="5"
      background
      :page-sizes="[20, 30, 40, 50, 100, 200]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="hidden-sm-and-down"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 适合手机端 -->
    <div class="hidden-sm-and-up">
      <el-pagination
        small
        :current-page="page"
        :pager-count="5"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        layout="total, sizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <el-pagination
        small
        :current-page="page"
        :pager-count="5"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog :visible.sync="showDialog" :title="'SKU: ' + currentItem.sku">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8">
          <InlineBox label="已支付金额:" label-width="110px">{{ symbol }}{{ currentItem.paymentAmount | money | toThousandFilter }}</InlineBox>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <InlineBox label="已售出:" label-width="110px">{{ currentItem.salesNum }}</InlineBox>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <InlineBox label="已支付订单数:" label-width="110px">{{ currentItem.paymentOrderNum }}</InlineBox>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <InlineBox label="客单价:" label-width="110px">{{ symbol }}{{ currentItem.unitPrice | money }}</InlineBox>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <InlineBox label="买家数(已支付):" label-width="110px">{{ currentItem.buyerNum }}</InlineBox>
        </el-col>
      </el-row>
      <el-table
        v-loading="currentTableLoading"
        border
        :data="currentTable"
        :max-height="400"
        highlight-current-row
        size="small"
        row-key="id"
        default-expand-all
        :row-class-name="customRowClass"
      >
        <el-table-column label="业务线" prop="businessName" width="120px" />
        <el-table-column label="店铺" prop="shopName" align="center" />
        <el-table-column label="销售金额" align="center" sortable prop="paymentAmount">
          <template slot-scope="scope">
            {{ symbol }}{{ scope.row.paymentAmount | money | toThousandFilter }}
          </template>
        </el-table-column>
        <el-table-column label="销售数量" align="center" sortable prop="salesNum" />
        <el-table-column label="销售额占比" align="center" sortable>
          <template slot-scope="{ row }">
            {{ row.rate | money }}%
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-card>
</template>

<script>
import { fetchSkuInfoList, fetchSpuInfoList, fetchShopSalesInfoBySku } from '@/api/dashboard'
import { mapGetters } from 'vuex'
import BiImage from '@/components/BiImage'
import InlineBox from '@/components/InlineBox'

export default {
  name: 'ProductAnalysis',
  components: {
    BiImage,
    InlineBox
  },
  props: {
    params: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      type: 'sku',
      loading: false,
      total: 0,
      data: [],
      page: 1,
      pageSize: 20,
      sortId: '',
      showDialog: false,
      currentItem: {},
      currentTableLoading: false,
      currentTable: [], // 树形表格
      showCompare: true
    }
  },
  computed: {
    ...mapGetters([
      'symbol'
    ]),
    filterOptions () {
      return {
        ...this.params,
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortId
      }
    }
  },
  // watch: {
  //   filterOptions (newV) {
  //     this.fetchList()
  //   }
  // },
  beforeMount () {
    // this.fetchList()
  },
  methods: {
    /**
     * @create 2020/12/29 11:38
     * @desc 切换tab sku分析/spu分析
     * @param { Object } tab
     */
    handleChangeTab (tab) {
      if (tab.name === this.type) { return }
      this.type = tab.name
      this.fetchList()
    },
    /**
     * @date 2020/11/06 16:20
     * @description 获取sku分析列表
     */
    async fetchList () {
      this.loading = true
      try {
        const data = this.type === 'sku' ? await fetchSkuInfoList(this.filterOptions) : await fetchSpuInfoList(this.filterOptions)
        this.data = (data.list || []).map(v => {
          return {
            ...v,
            key: v.id
          }
        })
        this.total = data.total
        // console.log(data)
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    handleVxeSort ({ order, property }) {
      console.log(order)
      let sort = ''
      switch (property) {
        case 'paymentAmount':
          sort = order === null ? '' : order === 'asc' ? 1 : 2
          break
        case 'salesNum':
          sort = order === null ? '' : order === 'asc' ? 3 : 4
          break
        case 'paymentOrderNum':
          sort = order === null ? '' : order === 'asc' ? 5 : 6
          break
        case 'unitPrice':
          sort = order === null ? '' : order === 'asc' ? 7 : 8
          break
        case 'buyerNum':
          sort = order === null ? '' : order === 'asc' ? 9 : 10
          break
        case 'freight':
          sort = order === null ? '' : order === 'asc' ? 11 : 12
          break
        default:
          sort = ''
          break
      }
      this.sortId = sort
    },
    /**
     * @date 2020/11/24 10:36
     * @description 自定义表格排序
     * @param { Object } item { column: {}, prop: 'xx', order: 'xx' }
     * ascending 升序
     * descending 降序
     * null 空
     */
    handleSort ({ column, prop, order }) {
      let sort = ''
      switch (prop) {
        case 'paymentAmount':
          sort = order === null ? '' : order === 'ascending' ? 1 : 2
          break
        case 'salesNum':
          sort = order === null ? '' : order === 'ascending' ? 3 : 4
          break
        case 'paymentOrderNum':
          sort = order === null ? '' : order === 'ascending' ? 5 : 6
          break
        case 'unitPrice':
          sort = order === null ? '' : order === 'ascending' ? 7 : 8
          break
        case 'buyerNum':
          sort = order === null ? '' : order === 'ascending' ? 9 : 10
          break
        case 'freight':
          sort = order === null ? '' : order === 'ascending' ? 11 : 12
          break
        default:
          sort = ''
          break
      }
      this.sortId = sort
    },
    handleSizeChange (value) {
      this.pageSize = value
    },
    handleCurrentChange (value) {
      this.page = value
    },
    /**
     * @date 2020/11/27 16:00
     * @description 查看详情
     */
    async viewDetail (row) {
      this.showDialog = true
      this.currentItem = row
      this.currentTableLoading = true

      // 备份
      const params = Object.assign({}, this.params)
      // 下面接口不需要cids参数
      delete params.cids
      try {
        const data = await fetchShopSalesInfoBySku({
          ...params,
          productId: row.id
        })
        this.currentTable = data
      } catch (err) {
        console.error(err)
      } finally {
        this.currentTableLoading = false
      }
    },
    customRowClass ({ row, rowIndex }) {
      if (row.children) {
        return 'highlight-row'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
>>>.el-card__header {
  padding: 0;
  border-bottom: none;
}
>>>.el-tab {
  padding: 0 $main-space;
}
>>>.el-tabs__header {
  margin-bottom: 0;
}
>>>.el-tabs__item {
  height: 55px;
  line-height: 55px;
  font-size: 16px;
  font-weight: bold;
  user-select: none;
}
>>>.el-tabs__nav-wrap::after {
  height: 1px;
}
>>>.el-tabs__nav-wrap {
  padding-left: $main-space;
}

/deep/ .el-pagination {
  // white-space: pre-wrap;
}
>>> .el-dialog {
  width: 700px;
}
>>> .el-dialog__body {
  padding-top: 0;
}
>>>.inline-box {
  margin-bottom: 0;

  .inline-box__content {
    font-size: 14px;
    font-weight: bold;
    color: #000;
  }
}
>>> .highlight-row {
  background-color: $bg-main;
  .cell {
    font-size: 14px;
    color: #000;
  }
}
.sku-analysis {

}
.el-pagination {
  margin-top: $main-space;
  text-align: right;
}

>>>.vxe-table .vxe-cell {
  white-space: unset;
}

.compare-item {
  display: flex;
  flex-direction: column;

  >span:first-child {
    color: #999;
    &:before {
      content: 'VS: ';
      margin-left: 5px;
    }
  }
  >span.success {
    &:before {
      content: '+';
    }
  }
}
</style>
