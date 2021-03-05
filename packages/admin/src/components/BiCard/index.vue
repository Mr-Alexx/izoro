<template>
  <el-card class="bi-card">
    <div slot="header" class="bi-card__title">
      <em v-if="!$slots.title && title">{{ title }}</em>
      <slot name="title"></slot>
    </div>
    <slot></slot>
  </el-card>
</template>

<script>
export default {
  name: 'BiCard',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.bi-card {
  border-radius: 0;
  overflow: unset !important;

  &__title {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
