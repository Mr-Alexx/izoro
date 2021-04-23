<template>
  <el-row class="login-wrapper">
    <el-col :sm="24" :md="12" class="left hidden-sm-and-down">
      <div class="logo">
        <!-- <img src="/images/harvest-logo.png" alt="logo" class="responsive-img"> -->
      </div>
      <div class="content">
        <h1>内容管理系统</h1>
        <p>Content Management System</p>
      </div>
    </el-col>
    <el-col :sm="24" :md="12" class="right">
      <div class="login-form">
        <el-form ref="form" :model="form" :rules="rules">
          <h1 class="hidden-sm-and-down">登录</h1>
          <div class="hidden-sm-and-up mobile-header">
            <img src="/images/harvest-logo.png" alt="logo" class="responsive-img">
            <h1>内容管理系统</h1>
          </div>

          <el-form-item prop="account">
            <p>账号</p>
            <el-input ref="account" v-model="form.account" minlength="3" maxlength="20" />
          </el-form-item>
          <el-form-item prop="password">
            <p>密码</p>
            <el-input v-model="form.password" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button
              ref="password"
              type="primary"
              class="fr"
              block
              size="large"
              :loading="loading"
              @click="handleLogin"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
/**
 * @date 2020/11/12 09:27
 * @author 潜
 * @description 登录/
 */

export default {
  name: 'LoginRegistLayout',
  data () {
    return {
      form: {
        // remember: true,
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 4, max: 20, message: '长度为 4~20 位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度为 6~20 位', trigger: 'blur' }
        ]
      },
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    /**
     * @date 2020/04/25 15:27
     * @author 潜
     * @description 处理登录
     */
    async handleLogin () {
      this.loading = true
      try {
        await this.$store.dispatch('user/login', this.form)
        this.$message.success('登录成功')
        let redirect = this.redirect
        if (!redirect || redirect.indexOf('login') > -1) {
          redirect = '/'
        }
        this.$router.push({ path: redirect, query: this.otherQuery })
      } catch (err) {
        console.error(err)
      }
      this.loading = false
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  .left, .right {
    padding: 0 15vh;
    padding-top: 15vh;
    height: 100vh;
  }
  >>>h1 {
    font-size: 32px;
    text-align: center;
  }
}
.left {
  // background-image: url(/images/login-bg.jpg);
  // background-size: cover;
  background: $color-primary;
  text-align: center;
  color: #fff;
  font-family: 'Questrial', sans-serif;
  display: flex;
  flex-direction: column;
  // justify-content: center;

  h2 {
    font-size: 32px;
  }
}

.right {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
}
@media screen and (max-width: 768px) {
  .right {
    padding: 0 40px !important;
    padding-top: 40px !important;

    .mobile-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        height: 50px;
        width: auto;
        margin: 0 auto;
      }
      h1 {
        font-size: 24px;
      }
    }
  }
}

.logo {
  width: 178px;
  height: auto;
  margin: 0 auto;
  margin-top: 60px;
}

.content {

  >h1 {
    margin-top: 30px;
    margin-bottom: 0;
    font-size: 30px;
    font-weight: bold;
    color: #fff;
  }
  >p {
    font-size: $font-size-default;
  }
}

.login-form {
  width: 100%;

  >>>.el-input__inner {
    height: 46px;
    line-height: 46px;
    background-color: #e9edf4;
    color: #777D74;
    border: none;

    &:focus {
      background-color: #e5f2ff;
      color: #374948;
    }
  }

  >>>.el-button {
    margin-top: 10px;
    width: 100%;
    padding: 12px 24px;
    font-size: $font-size-default;
  }
}
</style>
