<template>
  <ul class="main-navbar">
    <li v-for="(item, i) in navList" :key="i" class="navbar-item" :class="{ 'navbar-item--active': $route.path.indexOf(item.path + '/') !== -1 }">
      <router-link :to="item.path">
        <i class="iconfont" :class="`icon-${item.meta.icon}`"></i>
        <span>{{ item.meta.title }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
/**
 * @description 顶部主导航栏
 */
import { mapGetters } from 'vuex'

export default {
  name: 'MainNavbar',
  computed: {
    ...mapGetters([
      'permissionRoutes'
    ]),
    navList () {
      return this.permissionRoutes.filter(item => !item.hidden)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-navbar {
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 $main-spacing;
  font-size: $font-size-navbar;

  .navbar-item {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;

    // 激活样式
    &.navbar-item--active {
      color: $navbar-active-color;

      &:before {
        display: block;
      }
    }

    &+.navbar-item {
      margin-left: 30px;
    }

    &:before {
      display: none;
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 4px;
      border-radius: 0px 0px 4px 4px;
      background-color: $navbar-active-color;;
    }

    .iconfont {
      margin-right: 5px;
    }
  }
}
</style>
