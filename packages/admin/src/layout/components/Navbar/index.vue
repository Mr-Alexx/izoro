<template>
  <div class="navbar">
    <!-- 汉堡包导航 -->
    <Hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- 顶部导航栏 -->
    <!-- <MainNavbar /> -->
    <Breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <el-tooltip content="全屏显示" effect="dark" placement="bottom">
          <Screenfull id="screenfull" class="right-menu-item hover-effect" />
        </el-tooltip>

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar || defaultAvatar" class="user-avatar">
          <!-- <i class="el-icon-caret-bottom" /> -->
          <div class="user-tips">
            <span>{{ greetingText }}</span>
            <span class="username ellipse-1">{{ username }}</span>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import MainNavbar from './MainNavbar'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'Navbar',
  components: {
    Hamburger,
    Screenfull,
    MainNavbar,
    Breadcrumb
  },
  data () {
    return {
      defaultAvatar: require('@/assets/images/avatar.gif')
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'username'
    ]),
    greetingText () {
      const hour = new Date().getHours()
      return hour < 12 ? '早上好'
        : hour <= 14 ? '中午好'
          : hour <= 18 ? '下午好' : '晚上好'
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout () {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login-regist/login?redirect=${this.$route.fullPath}`)
      // 取消redirect，反正更换用户时进去还保留之前的页面
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);
  border-bottom: 1px solid $border-color-extra-light;

  >>>.app-breadcrumb {
    float: left;
    padding: 0;
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 0;
    font-size: 14px;
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  /deep/ .main-navbar {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      >>> .el-icon-question, >>>.el-icon-message-solid {
        font-size: 22px;
        vertical-align: text-top;
      }

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        display: flex;
        margin-top: 10px;
        position: relative;

        .user-tips {
          font-size: 10px;
          display: flex;
          flex-direction: column;
          line-height: 1;
          justify-content: center;
          padding-left: 5px;

          .username {
            max-width: 60px;
          }
        }

        .user-avatar {
          cursor: pointer;
          width: 32px;
          height: 32px;
          // border-radius: 10px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
