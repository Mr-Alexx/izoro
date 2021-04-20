<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="formatRules"
      :status-icon="statusIcon"
      :disabled="disabled"
      class="app-form"
    >
      <el-row :gutter="20">
        <el-col
          v-for="(item, i) in options"
          :key="i"
          :lg="item.lg || item.span || 8"
          :md="item.md || item.span || 8"
          :sm="item.sm || item.span || 12"
          :xs="item.xs || item.span || 24"
        >
          <el-form-item :label="item.label" :label-width="labelWidth" :prop="item.required ? item.key : ''" class="app-form-item">
            <SearchColumn v-model="form[item.key]" :column="item" @change="handleChange" />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div v-if="showButton" class="text-center app-form__footer">
      <el-button @click="$emit('cancel')">{{ buttonConfig.cancelText || '取消' }}</el-button>
      <el-button v-if="showConfirm" type="primary" :loading="loading" @click="$emit('confirm', form)">{{ buttonConfig.confirmText || '确定' }}</el-button>
    </div>
  </div>
</template>

<script>
/**
 * @date 2020/04/15 11:04
 * @author 潜
 * @modify 2020/09/22 14:21 by 潜
 * @description 自定义搜索过滤器
 * @property { String } title 顶部标题，默认为搜索
 * @property { String } labelWidth form item的label宽度，默认为80px
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
  * <YtSearch :title="xx" label-width="100px" :options="[{ key: xx, value: xx, label: xx, component: { name: xx } }]"></YtSearch>
  */
import SearchColumn from '../AppSearch/AppSearchColumn'

export default {
  name: 'AppForm',
  components: { SearchColumn },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      default () {
        return {}
      }
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    showButton: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    statusIcon: {
      type: Boolean,
      default: false
    },
    buttonConfig: {
      type: Object,
      default () {
        return {}
      }
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
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
      // form: (() => {
      //   const form = {}
      //   this.options.forEach(item => {
      //     form[item.key] = item.value || ''
      //   })
      //   return form
      // })(),
      form: this.value,
      formatRules: (() => {
        const rules = {}
        // 构建默认规则，input提示为输入，其它提示为选择
        this.options.filter(v => v.required).forEach(v => {
          rules[v.key] = v.rule || [{ required: true, trigger: 'blur', message: `请${v.component.name === 'input' ? '输入' : '选择'}${v.label}` }]
        })
        return {
          ...rules,
          ...this.rules
        }
      })()
    }
  },
  computed: {
    isEmptyForm () {
      return Object.keys(this.form).every(key => !this.form[key])
    }
  },
  watch: {
    form (newV) {
      this.$emit('change', newV)
    }
  },
  created () {
    const form = {}
    this.options.forEach(item => {
      form[item.key] = item.value || (item.component.name === 'range' ? [] : '')
    })
    this.form = form
  },
  methods: {
    handleChange (value) {
      this.$emit('change', this.form)
    },
    /**
     * @date 2021/01/25 17:35
     * @author 潜
     * @desc 表单验证
     */
    validate () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (!valid) {
            reject(valid)
          } else {
            resolve(valid)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-form-item {
  width: 100%;
}
.app-form__footer {
  margin-top: $main-space;
}
</style>

