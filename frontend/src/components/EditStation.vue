<template>
  <div>
    <input v-model="form.name" placeholder="Name" class="input" />
    
    <select v-model="form.status" class="input">
      <option disabled value="">Select Status</option>
      <option>Active</option>
      <option>Inactive</option>
    </select>
    
    <input v-model.number="form.location.lat" type="number" step="any" placeholder="Latitude" class="input" />
    <input v-model.number="form.location.lng" type="number" step="any" placeholder="Longitude" class="input" />
    
    <input v-model.number="form.powerOutput" type="number" placeholder="Power Output (kW)" class="input" />
    <input v-model="form.connectorType" placeholder="Connector Type" class="input" />

    <button @click="updateStation">Save</button>
    <button @click="$emit('cancel')">Cancel</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['station'],
  data() {
    return {
      form: {
        ...this.station,
        location: {
          lat: this.station.location.lat,
          lng: this.station.location.lng
        }
      }
    }
  },
  methods: {
    async updateStation() {
      try {
        const token = localStorage.getItem('token')
        await axios.put(`http://localhost:5000/api/chargers/${this.station._id}`, {
          ...this.form,
          location: {
            lat: parseFloat(this.form.location.lat),
            lng: parseFloat(this.form.location.lng)
          },
          powerOutput: parseFloat(this.form.powerOutput)
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.$emit('updated')
      } catch (err) {
        console.error('Error updating station:', err)
        alert('Failed to update station')
      }
    }
  }
}
</script>
