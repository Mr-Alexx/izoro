<template>
  <div class="wrapper" :class="{ 'has-aside': !!slots.aside }">
    <template v-if="slots?.aside">
      <div class="wrapper__content">
        <slot></slot>
      </div>
      <div class="wrapper__aside">
        <slot name="aside"></slot>
      </div>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from "vue";
// defineEmits,defineProps无需导入，直接使用
const slots = useSlots();

console.log(slots);
</script>

<style lang="scss" scoped>
@import "@/styles/var.scss";
@import "@/styles/mixins.scss";
.wrapper {
  width: $design-width;
  margin: 0 auto;

  &.has-aside {
    display: flex;

    .wrapper__content {
      flex: 1;
      padding-right: 20px;
    }
    .wrapper__aside {
      width: 200px;
    }
  }

  @include query(sm) {
    width: 100%;
  }
}
</style>