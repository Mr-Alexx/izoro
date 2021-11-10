<template>
  <Wrapper>
    <div>
      <div v-for="item in list" :key="item.id">
        <div>
          <router-link :to="`/detail/${item.id}`" target="_blank">{{
            item.title
          }}</router-link>
        </div>
        <div>
          <span>置顶</span>
          <span>标签</span>
          <!-- 分类 -->
          <span>{{ item?.category?.name }}</span>
          <span>{{ item.create_at }}</span>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus, facere ea quibusdam maiores dolorem sit vel dolore,
            veritatis atque, harum fuga voluptatem quo esse. Sunt iure at
            officia deleniti voluptatum.
          </p>
        </div>
      </div>
    </div>
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