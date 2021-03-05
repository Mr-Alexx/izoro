<template>
  <div class="app-search-column">
    <!-- 输入框 -->
    <el-input
      v-if="column.component && column.component.name === 'input'"
      v-model="modelVal"
      v-bind="Object.assign({
        placeholder: '请输入'
      }, column.component)"
      @input="handleChange"
    />

    <!-- 数字输入框 -->
    <el-input-number
      v-if="column.component && column.component.name === 'number'"
      v-model="modelVal"
      v-bind="Object.assign({ min: 1 }, column.component)"
      @change="handleChange"
    />

    <!-- 选择器 -->
    <el-select
      v-if="column.component && column.component.name === 'select'"
      v-model="modelVal"
      v-bind="Object.assign({
        placeholder: '请选择'
      }, column.component)"
      @change="handleChange"
    >
      <el-option
        v-for="option in column.component.options"
        :key="option.value"
        v-bind="option"
      />
    </el-select>

    <!-- 多级选择器 -->
    <el-cascader
      v-if="column.component && column.component.name === 'cascader'"
      v-model="modelVal"
      v-bind="Object.assign({
        placeholder: '请选择'
      }, column.component)"
      @change="handleChange"
    />

    <!-- 日期区间选择器 -->
    <!-- <el-date-picker
      v-if="column.component && column.component.name === 'date-range'"
      v-model="modelVal"
      v-bind="Object.assign({
        type: 'daterange',
        rangeSeparator: '至',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        valueFormat: 'yyyy-MM-dd'
      }, column.component)"
      @change="handleChange"
    /> -->
    <AppDatePicker
      v-if="column.component && (column.component.name === 'date-range' || column.component.name === 'range')"
      v-model="modelVal"
      :options="Object.assign({
        type: 'date',
        range: true,
        placeholder: '开始日期 - 结束日期'
      }, column.component)"
      @change="handleChange"
    />

    <!-- 日期选择 -->
    <!-- <el-date-picker
      v-if="column.component && column.component.name === 'date-picker'"
      v-model="modelVal"
      v-bind="Object.assign({
        type: 'date',
        placeholder: '请选择日期'
      }, column.component)"
    /> -->
    <AppDatePicker
      v-if="column.component && column.component.name === 'date-picker'"
      v-model="modelVal"
      :options="Object.assign({
        type: 'date',
        range: false,
        placeholder: '请选择日期'
      }, column.component)"
      @change="handleChange"
    />

    <!-- 单选框 -->
    <el-radio-group
      v-else-if="column.component && column.component.name === 'radio'"
      v-model="modelVal"
      v-bind="column.component"
      @change="handleChange"
    >
      <template v-if="column.component.buttonMode">
        <el-radio-button
          v-for="option in column.component.options"
          :key="option.value"
          :label="option.value"
        >
          {{ option.label }}
        </el-radio-button>
      </template>
      <template v-else>
        <el-radio
          v-for="option in column.component.options"
          :key="option.value"
          :label="option.value"
        >
          {{ option.label }}
        </el-radio>
      </template>
    </el-radio-group>

    <!-- 多选框 -->
    <el-checkbox-group
      v-else-if="column.component && column.component.name === 'checkbox'"
      v-model="modelVal"
      v-bind="column.component"
      @change="handleChange"
    >
      <template v-if="column.component.buttonMode">
        <el-checkbox-button
          v-for="option in column.component.options"
          :key="option.value"
          :label="option.value"
        >
          {{ option.label }}
        </el-checkbox-button>
      </template>
      <template v-else>
        <el-checkbox
          v-for="option in column.component.options"
          :key="option.value"
          :label="option.value"
        >
          {{ option.label }}
        </el-checkbox>
      </template>
    </el-checkbox-group>
  </div>
</template>

<script>
/**
 * @date 2020/09/22 11:00
 * @description 根据配置渲染自定义组件，自定义v-model实现双向绑定，无须写change事件
 * @property { Object } column 配置
 */
import AppDatePicker from '../AppDatePicker'

export default {
  name: 'AppSearchColumn',
  components: {
    AppDatePicker
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Array, Object, Boolean, Number, Date],
      default: ''
    },
    column: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      modelVal: this.value
    }
  },
  watch: {
    value (newV) {
      this.modelVal = newV
    }
  },
  methods: {
    handleChange (value) {
      this.$emit('change', value)
      // this.$emit('change', this.column.key, value)
    }
  }
}
</script>

<style lang="scss">
.app-search-column {
  .el-input, .el-select, .el-date-picker, .el-date-editor--daterange, .app-datepicker {
    width: 100%;
  }
}
</style>
