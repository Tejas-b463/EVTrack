<template>
  <form @submit.prevent="signup">
    <input v-model="name" placeholder="Name" required />
    <input v-model="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Sign Up</button>
    <p>
  Already have an account?
  <router-link to="/">Login</router-link>
</p>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async signup() {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password
        })

        // Save token and redirect
        localStorage.setItem('token', res.data.token)
        this.$router.push('/dashboard')
      } catch (err) {
        alert('Signup failed: ' + err.response.data.message)
      }
    }
  }
}
</script>
