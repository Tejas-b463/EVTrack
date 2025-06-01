<template>
  <nav>
    <button
      @click="logout"
      class="bg-black text-white cursor-pointer px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition duration-200"
    >
      Logout
    </button>
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
