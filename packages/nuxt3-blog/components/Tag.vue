<template>
  <span
    :style="{ fontSize: typeof size === 'number' ? `${size}px` : size }"
    :class="['q-tag', type ? `q-tag--${type}` : null]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { COLOR_TYPE } from "../constants";
// import { defineNuxtComponent } from 'nuxt3'

defineProps<{
  type?: COLOR_TYPE;
  size?: number | string;
}>();

// defineNuxtComponent({
//   name: 'Tag'
// })
</script>

<style lang="scss">
@import "@/styles/var.scss";
$types: primary, success, danger, warning;
$vars: (
  primary: $color-primary,
  success: $color-success,
  danger: $color-danger,
  warning: $color-warning,
);

.q-tag {
  box-sizing: border-box;
  margin: 0 8px 0 0;
  color: #000;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  display: inline-block;
  height: auto;
  padding: 0 7px;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  opacity: 1;
  transition: all 0.3s;

  @each $item in $types {
    &.q-tag--#{$item} {
      color: map-get($vars, $item);
    }
  }
}
</style>