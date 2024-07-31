<template>
  <BaseCard class="mt-5 p-4 w-75 mx-auto border rounded-5">
    <form class="border-bottom border-success">
      <h1 class="card-title mb-3 p-2 pb-3 text-success fw-bold">Login</h1>
      <div class="container">
        <label for="email">Email</label>
        <input
          class="form-control mb-3"
          type="email"
          id="email"
          placeholder="Your Email ..."
          v-model="email" />

        <label for="password">Password</label>
        <input
          class="form-control mb-4"
          type="password"
          id="password"
          placeholder="Your Password ..."
          v-model="password" />
        <button class="btn btn-lg btn-success w-100 mb-5">Login</button>
      </div>
    </form>
    <div class="my-3 ps-2">
      <RouterLink to="/auth/signup" class="text-secondary">
        Don't have an account? <b>Sign Up</b>
      </RouterLink>
    </div>
  </BaseCard>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>
