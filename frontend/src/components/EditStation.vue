<template>
  <div class="bg-gray-50 rounded-lg border border-gray-200 p-6">
    <!-- Form Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center">
        <div class="flex-shrink-0 h-8 w-8">
          <div class="h-8 w-8 rounded-full flex items-center justify-center">
            <Edit2 class="h-4 w-4" />
          </div>
        </div>
        <h3 class="ml-3 text-lg font-medium text-gray-900">Edit Charging Station</h3>
      </div>
    </div>

    <!-- Form Fields - Horizontal Layout -->
    <div class="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
      <!-- Station Name -->
      <div class="md:col-span-1">
        <label for="station-name" class="block text-xs font-medium text-gray-700 mb-2">
          <div class="flex items-center">
            <Building class="h-3 w-3 mr-1 text-gray-400" />
            Station Name
          </div>
        </label>
        <input 
          id="station-name"
          v-model="form.name" 
          type="text"
          placeholder="Station name" 
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none text-sm transition-colors"
        />
      </div>

      <!-- Status -->
      <div class="md:col-span-1">
        <label for="station-status" class="block text-xs font-medium text-gray-700 mb-2">
          <div class="flex items-center">
            <Activity class="h-3 w-3 mr-1 text-gray-400" />
            Status
          </div>
        </label>
        <div class="relative">
          <select 
            id="station-status"
            v-model="form.status" 
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-sm bg-white transition-colors appearance-none pr-8"
          >
            <option disabled value="">Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Maintenance</option>
          </select>
          <ChevronDown class="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <!-- Latitude -->
      <div class="md:col-span-1">
        <label for="latitude" class="block text-xs font-medium text-gray-700 mb-2">
          <div class="flex items-center">
            <MapPin class="h-3 w-3 mr-1 text-gray-400" />
            Latitude
          </div>
        </label>
        <input 
          id="latitude"
          v-model.number="form.location.lat" 
          type="number" 
          step="any" 
          placeholder="19.0760" 
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none text-sm transition-colors"
        />
      </div>

      <!-- Longitude -->
      <div class="md:col-span-1">
        <label for="longitude" class="block text-xs font-medium text-gray-700 mb-2">
          <div class="flex items-center">
            <MapPin class="h-3 w-3 mr-1 text-gray-400" />
            Longitude
          </div>
        </label>
        <input 
          id="longitude"
          v-model.number="form.location.lng" 
          type="number" 
          step="any" 
          placeholder="72.8777" 
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none text-sm transition-colors"
        />
      </div>

      <!-- Power Output -->
      <div class="md:col-span-1">
        <label for="power-output" class="block text-xs font-medium text-gray-700 mb-2">
          <div class="flex items-center">
            <Battery class="h-3 w-3 mr-1 text-gray-400" />
            Power (kW)
          </div>
        </label>
        <input 
          id="power-output"
          v-model.number="form.powerOutput" 
          type="number" 
          placeholder="50" 
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none text-sm transition-colors"
        />
      </div>

      <!-- Connector Type -->
      <div class="md:col-span-1">
        <label for="connector-type" class="block text-xs font-medium text-gray-700 mb-2">
          <div class="flex items-center">
            <Plug class="h-3 w-3 mr-1 text-gray-400" />
            Connector
          </div>
        </label>
        <input 
          id="connector-type"
          v-model="form.connectorType" 
          type="text"
          placeholder="Type 2" 
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none text-sm transition-colors"
        />
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
      <button 
        @click="$emit('cancel')"
        type="button"
        class="inline-flex items-center px-3 py-2 cursor-pointer border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
      >
        <X class="h-3 w-3 mr-1" />
        Cancel
      </button>
      <button 
        @click="updateStation"
        type="button"
        class="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 cursor-pointer focus:outline-none transition-colors"
      >
        <Save class="h-3 w-3 mr-1" />
        Save
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Edit2, Building, Activity, MapPin, Battery, Plug, ChevronDown, X, Save } from 'lucide-vue-next'

export default {
  components: {
    Edit2,
    Building,
    Activity,
    MapPin,
    Battery,
    Plug,
    ChevronDown,
    X,
    Save
  },
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