<template>
  <component :is="tag" class="post-item">
    <!-- 标题 -->
    <div class="post-item__title">
      <nuxt-link :to="`/post/${item.id}`" :target="target">
        {{ item.title }}
      </nuxt-link>
    </div>
    <div class="post-item__info">
      <!-- 标签 -->
      <span v-if="item.tags" class="info-tags">
        <router-link
          v-for="tag in item.tags"
          :to="`/tag/${tag.id}`"
          :key="tag.id"
          :target="target"
        >
          <Tag type="primary">{{ tag.name }}</Tag>
        </router-link>
      </span>

      <!-- 发布时间 -->
      <span class="info-publish">{{ item.publish_at }}</span>

      <!-- 分类 -->
      <router-link
        v-if="item?.category"
        :to="`/category/${item?.category?.id}`"
        :target="target"
        class="info-category"
        >{{ item?.category?.name }}</router-link
      >
    </div>

    <!-- 摘要 -->
    <div class="post-item__content">
      <nuxt-link :to="`/post/${item.id}`" :target="target">{{
        item.summary
      }}</nuxt-link>
    </div>
  </component>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";

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
  tags?: {
    id: number;
    name: string;
  }[];
  publish_at: string;
  update_at: string;
  category?: {
    id: number;
    name: string;
  };
};

// 传参定义
const props = withDefaults(
  defineProps<{
    tag?: string;
    item: ItemProps;
    target?: string;
  }>(),
  {
    tag: "li",
    target: "_blank",
  }
);
</script>

<style lang="scss">
@import "@/styles/var.scss";
@import "@/styles/mixins.scss";
.post-item {
  padding: $space 0;

  &__title {
    font-size: 18px;
    font-weight: bold;
  }

  & + .post-item {
    @include line1px(top);
  }
}
</style>