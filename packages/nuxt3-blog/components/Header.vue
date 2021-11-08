<template>
  <nav class="nav">
    <Wrapper>
      <!-- 左侧logo -->
      <div></div>
      <!-- 右侧菜单，手机端隐藏 -->
      <ul class="flex">
        <li v-for="item in navList" :key="item.name">
          <nuxt-link :to="item.link" class="pdl-2 pdr-2">{{
            item.name
          }}</nuxt-link>
        </li>
      </ul>
    </Wrapper>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

const navList = ref([
  { name: "首页", link: "/" },
  { name: "归档", link: "/" },
  { name: "开源", link: "/" },
  { name: "首页", link: "/" },
]);
</script>

<style lang="scss" scoped>
@import "@/styles/var.scss";
.nav {
  height: $nav-height;
  line-height: $nav-height;
}
</style>