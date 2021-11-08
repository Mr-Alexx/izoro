<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
useMeta({
  link: [
    // normalize.css
    {
      href: "https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.min.css",
      type: "stylesheet",
    },
  ],
});
</script>

<style lang="scss">
@import "@/styles/global.scss";
</style>
