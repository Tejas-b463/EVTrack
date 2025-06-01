<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
        <div class="sm:mx-auto sm:w-full sm:max-w-md mb-8">
          <h2 class="text-center text-2xl font-bold text-gray-900">
            Login
          </h2>
        </div>

        <form @submit.prevent="login" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="name@example.com"
              required
              class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
              class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
            >
              Log in
            </button>
          </div>

          <div class="text-center">
            <p class="text-sm text-gray-600">
              Don't have an account?
              <router-link 
                to="/signup" 
                class="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out"
              >
                Sign up
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
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
       const backendUrl = import.meta.env.VITE_BACKEND_URL
        const res = await axios.post(`${backendUrl}/api/auth/login`, {
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