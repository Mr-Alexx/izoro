<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/var.scss';
@import '@/styles/mixins.scss';
.wrapper {
  width: $design-width;
  margin: 0 auto;

  @include query(sm) {
    width: 100%;
  }
}
</style>