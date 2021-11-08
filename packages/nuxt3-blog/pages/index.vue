<template>
  <div></div>
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

// hooks
onMounted(() => {
  console.log(list.value);
});

// method
const updateAuthor = () => {
  author.value = !author.value;
};
</script>

<style lang="scss" scoped>
</style>