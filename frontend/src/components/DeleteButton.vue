<template>
  <button @click="deleteStation" class="cursor-pointer">Delete</button>
</template>

<script>
import axios from 'axios'

export default {
  props: ['stationId'],
  methods: {
    async deleteStation() {
      try {
         const backendUrl = import.meta.env.VITE_BACKEND_URL
        await axios.delete(`${backendUrl}/api/chargers/${this.stationId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        this.$emit('deleted')
      } catch (err) {
        console.error('Error deleting station:', err)
      }
    }
  }
}
</script>
