<template>
  <div
    class="wrapper"
    :class="{ 'has-aside': !!$slots.aside, 'is-white': white }"
  >
    <template v-if="$slots?.aside">
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
// defineEmits,defineProps无需导入，直接使用

defineProps<{
  /**
   * @description 是否白色背景
   */
  white?: boolean;
}>();
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

  &.is-white {
    background-color: #fff;
  }

  @include query(sm) {
    width: 100%;
  }
}
</style>