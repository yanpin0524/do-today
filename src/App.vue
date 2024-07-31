<template>
  <div id="main-container" class="container-fluid">
    <TheHeader />
    <RouterView />
  </div>

  <TheFooter />
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style>
html,
body,
#app {
  padding: 0;
  margin: 0;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#main-container {
  max-width: 700px;
  margin: 0 auto;
}
</style>
