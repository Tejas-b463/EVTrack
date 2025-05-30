<template>
  <SignupForm @signupSuccess="handleSignup" />
</template>

<script>
import SignupForm from '@/components/SignupForm.vue'

export default {
  components: { SignupForm },
  methods: {
    handleSignup(token) {
      localStorage.setItem('token', token)
      this.$router.push('/dashboard')
    }
  }
}
</script>
