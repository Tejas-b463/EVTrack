<template>
  <LoginForm @loginSuccess="handleLogin" />
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
  components: { LoginForm },
  methods: {
    handleLogin(token) {
      localStorage.setItem('token', token)
      this.$router.push('/dashboard')
    }
  }
}
</script>
