<template>
  <Wrapper white>
    <PostList :dataSource="list" />
    <Aside slot="aside" />
  </Wrapper>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";

const { data, refresh, pending } = await useAsyncData("/article", () =>
  $fetch("http://localhost:3001/article?status=1")
);

// data
const author = ref(true);

// computed
const list = computed(() => {
  return data.value.data.list;
});

// watch
watch(author, () => {
  console.log("author change");
});

// method
const updateAuthor = () => {
  author.value = !author.value;
};

// hooks
onMounted(() => {
  console.log("data", data.value);
  console.log(list.value);
});
</script>

<style lang="scss" scoped>
</style>