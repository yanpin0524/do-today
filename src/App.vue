<template>
  <TheHeader />
  <router-view></router-view>
  <TheFooter />
</template>

<script setup>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
</script>
