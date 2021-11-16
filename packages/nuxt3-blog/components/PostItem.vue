<template>
  <div>
    <div>
      <nuxt-link :to="`/post/${item.id}`" :target="target">
        {{ item.title }}
      </nuxt-link>
    </div>
    <div>
      <Tag type="primary">test</Tag>
      <span>{{ item.publish_at }}</span>
      <!-- v-if="item?.category" -->
      <span>{{ item?.category?.name }}</span>
    </div>
    <div>
      <nuxt-link :to="`/post/${item.id}`" :target="target">{{
        item.summary
      }}</nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @description PostItem
 * @see https://www.jb51.net/article/224799.htm
 * @see https://baijiahao.baidu.com/s?id=1708390898620302665&wfr=spider&for=pc
 * @see https://juejin.cn/post/7015470519789027335
 */
type ItemProps = {
  id: number | string;
  title: string;
  summary: string;
  tags?: string[];
  publish_at: string;
  update_at: string;
  category?: {
    id: number;
    name: string;
  };
};

// 传参定义
const props = defineProps<{
  item: ItemProps;
  target?: string;
}>();
</script>

<style lang="scss" scoped>
@import "@/styles/var.scss";
.nav {
  height: $nav-height;
  line-height: $nav-height;
}
</style>