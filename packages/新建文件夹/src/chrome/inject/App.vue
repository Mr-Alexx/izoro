<template>
  <RightPanel>
    <el-button type="primary" @click="handleClick">按钮1</el-button>
    <el-button type="primary">按钮2</el-button>
  </RightPanel>
</template>

<script>
import RightPanel from "@/components/RightPanel";
import $ from "jquery";

/* eslint-disable */
export default {
  name: "App",
  components: {
    RightPanel
  },
  data() {
    return {
      
    };
  },
  mounted () {
    // 这里可以写触发条件
  },
  methods: {
    handleClick () {
      $('#formatVideo').addClass('custom-width')
      $('videoContent').addClass('is-custom')
    }
  },
};
</script>
