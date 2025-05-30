<template>
  <div>
    <StationFilters @filterChanged="applyFilters" />

    <h1>Station List </h1>
    <ul v-if="filteredStations.length > 0">
      <li v-for="station in filteredStations" :key="station._id">
        <!-- Edit Mode -->
        <div v-if="editId === station._id">
          <EditStationForm
            :station="station"
            @updated="onStationUpdated"
            @cancel="cancelEdit"
          />
        </div>

        <div v-else>
       {{ station.name }} - {{ station.location?.lat ?? 'N/A' }}, {{ station.location?.lng ?? 'N/A' }} - {{ station.status }} - {{ station.powerOutput }}kW - {{ station.connectorType }}


          <button @click="editId = station._id">Edit</button>
          <DeleteButton :stationId="station._id" @deleted="fetchStations" />
        </div>
      </li>
    </ul>

    <p v-else>No stations found.</p>
  </div>
</template>

<script>
import axios from 'axios'
import StationFilters from './StationFilters.vue'
import EditStationForm from './EditStation.vue'
import DeleteButton from './DeleteButton.vue'

export default {
  components: {
    StationFilters,
    EditStationForm,
    DeleteButton
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

        const res = await axios.get('http://localhost:5000/api/chargers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        // Check if API response is wrapped (e.g. { data: [...] })
        const stationData = Array.isArray(res.data) ? res.data : res.data.data
        console.log('Fetched stations:', stationData)
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
    }
  }
}
</script>
