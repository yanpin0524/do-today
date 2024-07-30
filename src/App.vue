<template>
  <TheHeader />
  <RouterView />
  <TheFooter />
</template>

<script setup>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
</script>

<style>
body {
  max-width: 700px;
  margin: 0 auto;
}
</style>
