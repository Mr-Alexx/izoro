<template>
  <Wrapper>
    <ul>
      <PostItem v-for="item in list" :key="item.id" :item="item" />
    </ul>
    <Aside slot="aside" />
  </Wrapper>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";

const { data, refresh, pending } = await useAsyncData("/article", () =>
  $fetch("http://localhost:3001/article")
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