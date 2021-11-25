<template>
  <div>
    <Space :size="[8, 20]" wrap>
      <span>1</span>
      <span>2</span>
    </Space>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const tes = ref(null);

onMounted(() => {
  console.log(tes.value);
});
</script>

<style lang="scss" scoped>
</style>