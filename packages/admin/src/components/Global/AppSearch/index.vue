<template>
  <el-card class="search-filter app-card">
    <!-- <h2 slot="header" v-if="title">
      {{ title }}
    </h2> -->
    <el-form :model="form" class="app-form" :label-width="labelWidth">
      <el-row :gutter="20">
        <el-col
          v-for="(item, i) in options"
          :key="i"
          :lg="item.lg || 6"
          :md="item.md || 8"
          :sm="item.sm || 12"
          :xs="item.xs || 24"
        >
          <el-form-item :label="item.label" :label-width="item.labelWidth" class="app-search-item">
            <AppSearchColumn v-model="form[item.key]" :column="item" />
          </el-form-item>
        </el-col>

        <el-col v-if="!blockButton" :xs="24" :sm="6" class="button-group">
          <el-button @click="handleClearSearch">
            重置
          </el-button>
          <el-button :loading="loading" type="primary" @click="handleSearch">
            搜索
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="blockButton" class="text-center base-box--bottom">
      <el-button @click="handleClearSearch">
        重置
      </el-button>
      <el-button :loading="loading" type="primary" @click="handleSearch">
        搜索
      </el-button>
    </div>
  </el-card>
</template>

<script>
/**
 * @date 2020/04/15 11:04
 * @author 潜
 * @modify 2020/09/22 14:21 by 潜
 * @description 自定义搜索过滤器
 * @property { String } title 顶部标题，默认为搜索
 * @property { String } labelWidth form item的label宽度，默认为80px
 * @property { Boolean } blockButton 是否另起一行显示button，默认不新起一行
 * @property { Function } action 搜索自定义方法，必传，且需要返回Promise类型
 * @property { Array } options 自定义配置的element组件，目前只支持input/select/date-picker/checkbox/radio
 * 格式如下
 * [
    { key: 'number', label: '供应商编号', component: { name: 'input', placeholder: '请输入编号' }},
    { key: 'keyword', label: '关键字', component: { name: 'input', placeholder: '请输入关键字' }},
    { key: 'type', label: '供应商类型', component: { name: 'select', placeholder: '请选择', options: [{ value: 1, label: '类型1' }, { value: 2, label: '类型2' }] }},
    { key: 'level', label: '供应商等级', component: { name: 'select', placeholder: '请选择', options: [{ value: 1, label: '等级1' }, { value: 2, label: '等级2' }] }},
    { key: 'status', label: '审核状态', component: { name: 'select', placeholder: '请选择', options: [{ value: 1, label: '已审核' }, { value: 2, label: '未审核' }] }},
    { key: 'payType', label: '结款类型', component: { name: 'select', placeholder: '请选择', options: [{ value: 1, label: '类型1' }, { value: 2, label: '类型2' }] }},
    { key: 'time', label: '创建时间', component: { name: 'date-picker' }}
  ]
  * @emits search 触发搜索事件
  * @emits clear 初始清除事件
  * @example
  * <AppSearch :title="xx" label-width="100px" :options="[{ key: xx, value: xx, label: xx, component: { name: xx } }]" :action="function () { return Promise.resolve() }"></AppSearch>
  */
import AppSearchColumn from './AppSearchColumn'
import { debounce } from '@/utils'

export default {
  name: 'AppSearch',
  components: { AppSearchColumn },
  props: {
    title: {
      type: String,
      default: '搜索'
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    blockButton: {
      type: Boolean,
      default: false
    },
    action: {
      type: Function,
      required: true
    },
    options: {
      type: Array,
      default: () => [
        { key: 'keyword', label: '关键字', component: { name: 'input', placeholder: '请输入关键字' }},
        { key: 'time', label: '创建时间', component: { name: 'date-range' }}
      ]
    }
  },
  data () {
    return {
      loading: false,
      form: (() => {
        const form = {}
        this.options.forEach(item => {
          form[item.key] = item.component.name === 'range' ? (item.value || []) : (item.value || '')
        })
        return form
      })()
    }
  },
  computed: {
    isEmptyForm () {
      return Object.keys(this.form).every(key => !this.form[key])
    }
  },
  methods: {
    /**
     * @date 2020/04/16 13:40
     * @modify 2021/01/28 15:47
     * @modifyBy 潜
     * @author 潜
     * @description 处理搜索按钮点击
     * debounce处理
     */
    async handleSearch () {
      // this.search()
      this.loading = true

      try {
        await this.action(this.form)
      } catch (err) {
        // console.error(err)
      } finally {
        this.loading = false
      }
    },
    /**
     * @date 20202/04/16 13:40
     * @author 潜
     * @description 处理搜索
     * 保证至少填写了一项筛选条件
     * 且开始时间不能超过结束时间
     */
    search: debounce(function () {
      // this.loading = true
      this.$emit('search', this.form)
    }, 300, true),
    /**
     * @date 20202/04/16 13:59
     * @author 潜
     * @description 重置搜索条件
     */
    handleClearSearch: debounce(function () {
      this.$emit('clear')
      if (this.isEmptyForm) return

      Object.keys(this.form).forEach(key => {
        this.form[key] = this.options.filter(v => v.key === key)[0].component.name === 'range' ? [] : ''
      })
    }, 300, true)
  }
}
</script>

<style lang="scss" scoped>
.search-filter >>>.el-card__body {
  padding-bottom: 0;
}
.app-search-item {
  width: 100%;
}
// .button-group {
//   text-align: center;
// }
</style>

