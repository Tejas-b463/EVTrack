<template>
  <form @submit.prevent="login">
    <input v-model="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Login</button>
    <p>
  Don't have an account?
  <router-link to="/signup">Sign Up</router-link>
</p>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email: this.email,
          password: this.password
        })

        // Save token and redirect
        localStorage.setItem('token', res.data.token)
        this.$router.push('/dashboard')
      } catch (err) {
        alert('Login failed: ' + err.response.data.message)
      }
    }
  }
}
</script>
