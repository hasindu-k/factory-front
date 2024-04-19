
<template>
  <div class="container mt-5">
    <h2 v-if="!authenticated">Login</h2>

    <form v-if="!authenticated" @submit.prevent="login" class="mt-3">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" v-model="userName" class="form-control" required />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          v-model="password"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary">Login</button>
      <p v-if="error" class="error-message mt-3">{{ error }}</p>
    </form>

    <HomePage v-if="authenticated" />
    
  </div>
</template>

<script>
import HomePage from "./HomePage.vue";

export default {
  components: {
    HomePage,
  },
  data() {
    return {
      userName: "",
      password: "",
      error: null,
      authenticated: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch("https://localhost:44378/api/User/Login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: this.userName,
            password: this.password,
          }),
        });

        const result = await response.json();
        if (result === false) {
          this.authenticated = false;
          throw new Error("Authentication failed. Status: " + response.status);
        } else {
          this.authenticated = true;
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        this.error = "Authentication failed";
        this.authenticated = false;
      }
    },
  },
};
</script>

<style scoped>
body {
  background-color: #f8f9fa;
}

.error-message {
  color: red;
}
</style>  