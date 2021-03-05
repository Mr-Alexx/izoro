<template>
  <el-card class="yt-card">
    <div v-if="showTitle && !$slots.title" class="yt-card__title">
      <h3 class="title-info">{{ title }}</h3>
      <div v-if="showDate" class="content-select">
        <el-select v-model="date" @change="chageDate">
          <el-option v-for="(option, i) in options" :key="i" :label="option.label" :value="option.id" />
        </el-select>
      </div>
    </div>
    <slot v-else name="title"></slot>
    <slot></slot>
  </el-card>
</template>

<script>
/**
 * @date 2020/09/15 10:44
 * @description 基于el-card改造的具有顶部标题和时间选择的组件
 */
export default {
  name: 'YtCard',
  props: {
    showTitle: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    showDate: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: () => [
        { label: '近3天', id: 1 },
        { label: '近一周', id: 2 },
        { label: '近一个月', id: 3 }
      ]
    }
  },
  data () {
    return {
      date: 1
    }
  },
  methods: {
    /**
     * @date 2020/09/15 10:59
     * @description 更改日期
     * @param { Number } id
     */
    chageDate (id) {
      this.$emit('change', this.options.filter(v => v.id === id)[0])
    }
  }
}
</script>

<style lang="scss" scoped>
.yt-card {
  &__title {
    display: flex;
    justify-content: space-between;
    margin-bottom: $main-space;

    .title-info {
      margin: 0;
    }
  }
}
</style>
