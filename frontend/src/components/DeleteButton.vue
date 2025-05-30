<template>
  <button @click="deleteStation">Delete</button>
</template>

<script>
import axios from 'axios'

export default {
  props: ['stationId'],
  methods: {
    async deleteStation() {
      try {
        await axios.delete(`http://localhost:5000/api/chargers/${this.stationId}`, {
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
