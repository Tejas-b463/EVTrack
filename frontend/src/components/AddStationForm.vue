<template>
  <div class=" p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Charger Management</h1>
        <p class="text-gray-600">Manage your EV charging network</p>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div class="border-b border-gray-200 pb-4 mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Add New Charging Station</h2>
        </div>
        
        <form @submit.prevent="addStation" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Station Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="Station name"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
              />
            </div>

            <!-- Latitude -->
            <div>
              <label for="lat" class="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
              <input
                id="lat"
                v-model.number="form.lat"
                type="number"
                step="any"
                placeholder="Latitude"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
              />
            </div>

            <!-- Longitude -->
            <div>
              <label for="lng" class="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
              <input
                id="lng"
                v-model.number="form.lng"
                type="number"
                step="any"
                placeholder="Longitude"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
              />
            </div>

            <!-- Status -->
            <div>
              <label for="status" class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                id="status"
                v-model="form.status"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              >
                <option disabled value="">Select Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <!-- Power Output -->
            <div>
              <label for="powerOutput" class="block text-sm font-medium text-gray-700 mb-2">Power Output (kW)</label>
              <input
                id="powerOutput"
                v-model.number="form.powerOutput"
                type="number"
                step="any"
                placeholder="Power Output (kW)"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
              />
            </div>

            <!-- Connector Type -->
            <div>
              <label for="connectorType" class="block text-sm font-medium text-gray-700 mb-2">Connector Type</label>
              <input
                id="connectorType"
                v-model="form.connectorType"
                type="text"
                placeholder="Connector Type"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="submit"
              class="inline-flex items-center px-4 py-2 border border-transparent cursor-pointer text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
            >
              Add Station
            </button>
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
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        await axios.post(`${backendUrl}/api/chargers`, {
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

        // Reset form and hide it
        this.form = {
          name: '',
          lat: '',
          lng: '',
          status: '',
          powerOutput: '',
          connectorType: ''
        }
      
        
        // Show success message
        alert('Station added successfully!')
      } catch (err) {
        console.error('Error adding station:', err)
        alert('Failed to add station')
      }
    }
  }
}
</script>