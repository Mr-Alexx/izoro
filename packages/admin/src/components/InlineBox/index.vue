<template>
  <div class="inline-box">
    <label v-if="!!label" class="inline-box__label" :class="{ 'is-required': required }" :style="{ width }">{{ label }}</label>
    <div v-if="$slots.default" class="inline-box__content" :style="{ marginLeft: width }">
      <slot name="default"></slot>
    </div>
    <div v-if="content && !$slots.default" class="inline-box__content" :style="{ marginLeft: width }">{{ content }}</div>
  </div>
</template>

<script>
/**
 * @date 2020/04/22 10:02
 * @author 潜
 * @description 单行显示内容
 */
export default {
  name: 'InlineBox',
  props: {
    required: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: [String, Number],
      default: 0
    },
    content: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    width () {
      return typeof this.labelWidth === 'string' ? this.labelWidth : (this.labelWidth + 'px')
    }
  }
}
</script>

<style lang="scss">
.inline-box {
  font-size: 13px;
  line-height: 32px;
  margin-bottom: 18px;
  @include clearfix();

  &__label {
    float: left;
    padding: 0 12px 0 0;
    box-sizing: border-box;
    vertical-align: middle;
    text-align: right;
    color: $text-color-secondary;
    font-weight: 700;

    &.is-required:before {
      content: '*';
      color: $color-danger;
      margin-right: 4px;
      font-size: 14px;
      vertical-align: middle;
    }
  }
}
</style>
