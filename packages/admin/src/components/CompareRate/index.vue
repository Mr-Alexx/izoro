<template>
  <div class="compare-rate" :class="`compare-rate--${type}`">
    <span>{{ value > 0 ? '↑' : '↓' }}</span>
    <span>
      {{ value.toFixed(0) }}%
    </span>
  </div>
</template>

<script>
/**
 * @date 2020/04/15 15:33
 * @author 潜
 * @description 比对率，具有上升↑/下降标识↓
 */
export default {
  name: 'CompareRate',
  props: {
    value: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    type () {
      return this.value > 0 ? 'up' : 'down'
    }
  }
}
</script>

<style lang="scss" scoped>
.compare-rate {
  font-size: 11px;

  &--up {
    color: $color-success;
  }
  &--down {
    color: $color-danger;
  }
}
</style>
