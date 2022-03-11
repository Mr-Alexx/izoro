<template>
  <div class="popup-page">
    <h3 style="margin-top: 0; text-align: center;">海汇Ebay插件</h3>
    <el-form :model="form" :rules="rules" label-width="40px">
      <el-form-item label="工号">
        <el-input v-model="form.userNumber" placeholder="请输入工号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="login">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "App",

  components: {},

  data() {
    return {
      form: {
        userNumber: "",
        password: ""
      },
      rules: {
        userNumber: [
          { required: true, trigger: "blur", message: "请填写工号" }
        ],
        password: [{ required: true, trigger: "blur", message: "请填写密码" }]
      },
      loading: false
    };
  },
  computed: {},
  mounted() {},
  methods: {
    login() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 500);
    }
  }
};
</script>

<style lang="scss">
.popup-page {
  width: 200px;
  box-sizing: border-box;
  padding: 15px;
}
</style>
