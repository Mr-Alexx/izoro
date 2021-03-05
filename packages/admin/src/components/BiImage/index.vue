<template>
  <el-image
    :fit="fit"
    :alt="title"
    :title="title"
    :src="webp ? img2Webp(src) : src"
    :lazy="lazyLoad"
    :style="{ width, height }"
    :preview-src-list="previewSrcList"
    @click="$emit('click')"
    @load="$emit('load')"
    @error="$emit('error')"
  >
    <div v-if="showLoading" slot="placeholder" class="image-placeholder" :style="{ fontSize: size + 'px', background: background }">
      Harvest
    </div>
    <div v-if="showError" slot="error" class="image-placeholder" :style="{ background }">
      <i class="el-icon-picture-outline"></i>
    </div>
  </el-image>
</template>

<script>
export default {
  props: {
    webp: { // 默认不作webp判断
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 20
    },
    fit: {
      type: String,
      default: 'cover'
    },
    title: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    // 没有
    width: {
      type: [String, Number],
      default: '200px'
    },
    // 没有
    height: {
      type: [String, Number],
      default: '200px'
    },
    showError: {
      type: Boolean,
      default: true
    },
    errorIcon: {
      type: String,
      default: 'photo-fail'
    },
    showLoading: {
      type: Boolean,
      default: true
    },
    loadingIcon: {
      type: String,
      default: 'el-icon-loading'
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: '#f5f7fa'
    },
    previewSrcList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style  lang="scss" scoped>
.image-placeholder {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #c0c4cc;
  vertical-align: middle;

  &:before {
    content: '';
    padding: 50% 0;
  }
}
</style>
