<template>
  <div>
    <h2>Add New Charging Station</h2>
    <form @submit.prevent="addStation">
      <input v-model.number="form.name" type="text" placeholder="Name" required class="input" />
      <input v-model.number="form.lat" type="number" step="any" placeholder="Latitude" required class="input" />
      <input v-model.number="form.lng" type="number" step="any" placeholder="Longitude" required class="input" />
      <select v-model="form.status" required class="input">
        <option disabled value="">Select Status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
      <input v-model.number="form.powerOutput" type="number" step="any" placeholder="Power Output (kW)" required class="input" />
      <input v-model="form.connectorType" type="text" placeholder="Connector Type" required class="input" />
      <button type="submit">Add Station</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        name: '',
        lat: '',
        lng: '',
        status: '',
        powerOutput: '',
        connectorType: ''
      }
    }
  },
  methods: {
    async addStation() {
      try {
        const token = localStorage.getItem('token')
        await axios.post('http://localhost:5000/api/chargers', {
          name: this.form.name,
          location: {
            lat: parseFloat(this.form.lat),
            lng: parseFloat(this.form.lng)
          },
          status: this.form.status,
          powerOutput: parseFloat(this.form.powerOutput),
          connectorType: this.form.connectorType
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        this.$emit('stationAdded')

        // Reset form
        this.form = {
          name: '',
          lat: '',
          lng: '',
          status: '',
          powerOutput: '',
          connectorType: ''
        }
      } catch (err) {
        console.error('Error adding station:', err)
        alert('Failed to add station')
      }
    }
  }
}
</script>
