<template>
  <nav>
    <button @click="logout">Logout</button>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    }
  }
}
</script>
