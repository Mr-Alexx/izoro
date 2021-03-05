<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>

    <!-- 左侧导航 -->
    <Sidebar class="sidebar-container" />

    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <!-- 顶部导航 -->
        <Navbar />
      </div>
      <!-- 面包屑导航 -->
      <!-- <Breadcrumb class="breadcrumb-container" /> -->

      <!-- 主内容区域 -->
      <AppMain />
      <!-- 右侧设置面板 -->
      <RightPanel v-if="showSettings">
        <Settings />
      </RightPanel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
// import Breadcrumb from '@/components/Breadcrumb'
import { AppMain, Navbar, Settings, Sidebar } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    // Breadcrumb,
    Navbar,
    RightPanel,
    Settings,
    Sidebar
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100; // 5000;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.breadcrumb-container {
  margin-top: $navbar-height;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
