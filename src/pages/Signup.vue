<template>
  <BaseCard class="mt-5 p-4 w-75 mx-auto border rounded-5">
    <form @submit.prevent="signup" class="border-bottom border-success">
      <h1 class="card-title mb-3 p-2 pb-3 text-success fw-bold">Sign Up</h1>
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
        <button class="btn btn-lg btn-success w-100 mb-5">Sign up</button>
      </div>
    </form>
    <div class="my-3 ps-2">
      <RouterLink to="/auth/login" class="text-secondary">
        Already have an account? <b>Login</b>
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
  methods: {
    async signup() {
      if (!this.email || !this.password) {
        return alert("Please enter an email and password");
      }

      try {
        await this.$store.dispatch("signup", {
          email: this.email,
          password: this.password,
        });

        this.$router.replace("/todos");
      } catch (err) {
        alert(err.message.toLowerCase());
      }
    },
  },
};
</script>
