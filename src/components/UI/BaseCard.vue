<template>
  <div id="card" class="card border-0 shadow">
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
#card {
  --bs-bg-opacity: 0.7;
}
</style>
