<template>
  <div id="app">
    <router-view />
    <VmBackTop :bottom="80" :right="0" :duration="500" timing="ease">
      <div class="back-top">
        <i class="el-icon-arrow-up"></i>
        <div>TOP</div>
      </div>
    </VmBackTop>
  </div>
</template>

<script>
import { throttle } from 'throttle-debounce'
import VmBackTop from 'vue-multiple-back-top'

export default {
  name: 'App',
  components: { VmBackTop },
  beforeMount () {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize: throttle(200, function () {
      const clientH = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      this.$store.commit('app/SET_CLIENT_HEIGHT', clientH)
      this.$store.commit('app/SET_TABLE_HEIGHT')
    }, { passive: true })
  }
}
</script>

<style lang="scss" scoped>
.back-top {
  background-color: $color-primary;
  opacity: .9;
  color: #fff;
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px 0 0 4px;
  .el-icon-arrow-up {
    padding: 0;
    font-size: 20px;
  }
}
</style>
