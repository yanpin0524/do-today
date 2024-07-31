<template>
  <header class="border-bottom border-success">
    <nav class="navbar px-4 ps-5 d-flex justify-content-between flex-nowrap">
      <RouterLink
        to="/"
        class="navbar-brand fs-2 fw-bold fst-italic text-success mx-auto">
        Do-Today
      </RouterLink>

      <button
        @click="logout"
        v-if="$store.getters.isAuthenticated"
        class="btn btn-outline-success fs-5">
        Logout
      </button>
      <RouterLink
        v-else-if="$router.currentRoute.value.path === '/auth/login'"
        class="btn btn-success fs-5"
        to="/auth/signup">
        Sign Up
      </RouterLink>
      <RouterLink
        v-else
        class="btn btn-success fs-5 justify-self-end"
        to="/auth/login">
        Login
      </RouterLink>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/auth/login");
    },
  },
};
</script>
