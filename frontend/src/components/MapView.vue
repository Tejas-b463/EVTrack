<template>
  <div id="map" style="height: 600px; width: 100%;"></div>
</template>

<script>
import L from 'leaflet'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'MapView',
  data() {
    return {
      map: null,
      markers: []
    }
  },
  async mounted() {
    this.initMap()
    await this.loadChargers()
  },
  methods: {
    initMap() {
      // Initialize map centered on India
      this.map = L.map('map').setView([20.5937, 78.9629], 5)

      // Add OpenStreetMap 
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map)
    },
    async loadChargers() {
      try {
        // Fetch charger data from your backend API
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        const res = await axios.get(`${backendUrl}/api/chargers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        // Get chargers array safely
        const chargers = Array.isArray(res.data) ? res.data : (res.data.data || [])

        // Clear old markers if any
        this.markers.forEach(marker => this.map.removeLayer(marker))
        this.markers = []

        // Add a marker for each charger with a popup showing details
        chargers.forEach(charger => {
          // Access lat and lng from nested location object
          if (charger.location && charger.location.lat && charger.location.lng) {
            const marker = L.marker([charger.location.lat, charger.location.lng]).addTo(this.map)

            // Popup content showing charger details
            const popupContent = `
              <strong>${charger.name}</strong><br>
              Status: ${charger.status}<br>
              Power Output: ${charger.powerOutput} kW<br>
              Connector Type: ${charger.connectorType}
            `

            marker.bindPopup(popupContent)

            this.markers.push(marker)
          }
        })
      } catch (error) {
        console.error('Error loading chargers:', error)
      }
    }
  }
}
</script>

<style scoped>
#map {
  height: 600px;
  width: 100%;
}
</style>
