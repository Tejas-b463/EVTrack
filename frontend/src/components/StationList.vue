<template>
<StationFilters @filterChanged="applyFilters" />
  <div class="max-w-7xl mx-auto p-4">
    <!-- Header -->
    <div class="mb-6">
      <p class="text-gray-600">Manage your charging stations</p>
    </div>

    <!-- Desktop Table View -->
    <div class="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Station</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Power Output</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Connector</th>
              <th class="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="filteredStations.length === 0">
              <td colspan="6" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center">
                  <Zap class="h-12 w-12 text-gray-400 mb-4" />
                  <p class="text-gray-500 text-lg">No stations found</p>
                  <p class="text-gray-400 text-sm">Try adjusting your filters</p>
                </div>
              </td>
            </tr>
            <template v-else>
              <tr v-for="station in filteredStations" :key="station._id" class="hover:bg-gray-50 transition-colors">
                <!-- Edit Mode Row -->
                <td v-if="editId === station._id" colspan="6" class="px-6 py-4">
                  <EditStationForm
                    :station="station"
                    @updated="onStationUpdated"
                    @cancel="cancelEdit"
                  />
                </td>
                
                <!-- Normal View Row -->
                <template v-else>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full flex items-center justify-center">
                          <Zap class="h-5 w-5 " />
                      </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ station.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center text-sm text-gray-500">
                      <MapPin class="h-4 w-4 mr-1" />
                      {{ station.location?.lat ?? 'N/A' }}, {{ station.location?.lng ?? 'N/A' }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getStatusClass(station.status)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                      {{ station.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div class="flex items-center">
                      <Battery class="h-4 w-4 mr-1" />
                      {{ station.powerOutput }}kW
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <Plug class="h-3 w-3 mr-1" />
                      {{ station.connectorType }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex items-center justify-end space-x-2">
                      <button 
                        @click="editId = station._id"
                        class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
                      >
                        <Edit2 class="h-3 w-3 mr-1" />
                        Edit
                      </button>
                      <DeleteButton :stationId="station._id" @deleted="fetchStations" />
                    </div>
                  </td>
                </template>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mobile Card View -->
    <div class="lg:hidden space-y-4">
      <div v-if="filteredStations.length === 0" class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div class="flex flex-col items-center">
          <Zap class="h-12 w-12 text-gray-400 mb-4" />
          <p class="text-gray-500 text-lg text-center">No stations found</p>
          <p class="text-gray-400 text-sm text-center">Try adjusting your filters</p>
        </div>
      </div>
      
      <div v-for="station in filteredStations" :key="station._id" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <!-- Edit Mode Card -->
        <div v-if="editId === station._id" class="p-4">
          <EditStationForm
            :station="station"
            @updated="onStationUpdated"
            @cancel="cancelEdit"
          />
        </div>

        <!-- Normal View Card -->
        <div v-else class="p-4">
          <!-- Header -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-10 w-10">
                <div class="h-10 w-10 rounded-full mt-2 items-center justify-center">
                  <Zap class="h-5 w-5" />
                </div>
              </div>
              <div class="ml-3">
                <h3 class="text-lg font-medium text-gray-900">{{ station.name }}</h3>
              </div>
            </div>
            <span :class="getStatusClass(station.status)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
              {{ station.status }}
            </span>
          </div>

          <!-- Details Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div class="flex items-center text-sm text-gray-600">
              <MapPin class="h-4 w-4 mr-2 text-gray-400" />
              <span class="font-medium mr-1">Location:</span>
              {{ station.location?.lat ?? 'N/A' }}, {{ station.location?.lng ?? 'N/A' }}
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <Battery class="h-4 w-4 mr-2" />
              <span class="font-medium mr-1">Power:</span>
              {{ station.powerOutput }}kW
            </div>
            <div class="flex items-center text-sm text-gray-600 sm:col-span-2">
              <Plug class="h-4 w-4 mr-2 text-gray-400" />
              <span class="font-medium mr-1">Connector:</span>
              {{ station.connectorType }}
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200">
            <button 
              @click="editId = station._id"
              class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Edit2 class="h-3 w-3 mr-1" />
              Edit
            </button>
            <DeleteButton :stationId="station._id" @deleted="fetchStations" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import StationFilters from './StationFilters.vue'
import EditStationForm from './EditStation.vue'
import DeleteButton from './DeleteButton.vue'
import { Zap, MapPin, Battery, Plug, Edit2 } from 'lucide-vue-next'

export default {
  components: {
    StationFilters,
    EditStationForm,
    DeleteButton,
    Zap,
    MapPin,
    Battery,
    Plug,
    Edit2
  },
  data() {
    return {
      stations: [],
      editId: null,
      filters: {
        status: '',
        powerOutput: '',
        connectorType: ''
      }
    }
  },
  computed: {
    filteredStations() {
      return this.stations.filter(station => {
        return (
          (!this.filters.status || station.status === this.filters.status) &&
          (!this.filters.powerOutput || station.powerOutput.toString() === this.filters.powerOutput.toString()) &&
          (!this.filters.connectorType || station.connectorType === this.filters.connectorType)
        )
      })
    }
  },
  mounted() {
    this.fetchStations()
  },
  methods: {
    async fetchStations() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.warn('No token found in localStorage')
          return
        }
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        const res = await axios.get(`${backendUrl}/api/chargers`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const stationData = Array.isArray(res.data) ? res.data : res.data.data
        this.stations = stationData
      } catch (err) {
        console.error('Error fetching stations:', err)
      }
    },
    applyFilters(newFilters) {
      this.filters = newFilters
    },
    onStationUpdated() {
      this.editId = null
      this.fetchStations()
    },
    cancelEdit() {
      this.editId = null
    },
    getStatusClass(status) {
      const statusClasses = {
        'Active': 'bg-green-100 text-green-800',
        'Inactive': 'bg-red-100 text-red-800',
      }
      return statusClasses[status] || 'bg-gray-100 text-gray-800'
    }
  }
}
</script>