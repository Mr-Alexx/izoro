<template>
  <span class="app-tag" :class="`app-tag--${type}`"><slot></slot></span>
</template>

<script>
export default {
  name: 'AppTag',
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style lang="scss">
.app-tag {
  border-radius: 0;
  background-color: #fff;
  border: 1px solid #e1e1e1;
  color: #333;
  cursor: pointer;
  padding: 2px 10px;
  font-size: 12px;
  // width: 66px;
  margin: 10px 5px 0 5px;
  box-sizing: border-box;
  font-variant: tabular-nums;
  line-height: 1.5;
  font-feature-settings: "tnum";
  display: inline-block;
  height: auto;
  white-space: nowrap;
  opacity: 1;
  text-align: center;
  transition: all .3s cubic-bezier(.78,.14,.15,.86);

  &:hover {
    color: #1890ff;
    background: #e6f7ff;
    border-color: #91d5ff;
  }
}
</style>
