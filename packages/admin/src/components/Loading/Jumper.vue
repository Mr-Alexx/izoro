<template>
  <div :style="styles" class="spinner spinner--jumper">
    <span v-for="item in 3" :key="item" :style="{ backgroundColor: color }"></span>
  </div>
</template>

<script>
/**
 * @date 2020/04/28 09:41
 * @author 潜
 * @description 加载动画
 * 基于 https://github.com/nguyenvanduocit/vue-loading-spinner/blob/master/src/components/Jumper.vue 效果进行改造
 */
import variables from '@/styles/variables.scss'

export default {
  props: {
    size: {
      type: String,
      default: '40px'
    },
    color: {
      type: String,
      default: variables.colorPrimary
    }
  },
  computed: {
    styles () {
      return {
        width: this.size,
        height: this.size
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$total: 2.4s;
$base-delay: $total / 3; // 0.33333s
.spinner{
  * {
    line-height: 0;
    box-sizing: border-box;
  }
}
.spinner > span {
  display: block;
  border-radius: 100%;
  animation-fill-mode: both;
  position: absolute;
  opacity: 0;
  width: 50px;
  height: 50px;
  animation: jumper $total 0s ease infinite;
}
.spinner > span:nth-child(2) {
  animation-delay: $base-delay;
}
.spinner > span:nth-child(3) {
  animation-delay: $base-delay * 2;
}
@keyframes jumper {
  0% {
    opacity: 0;
    transform: scale(0.1);
  }
  5% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
