<template>
  <div id="map" style="height: 600px; width: 100%;"></div>
</template>

<script>
import L from 'leaflet'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'

// Import marker icons manually
import markerIcon2x from '/icon.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Fix the missing marker icons by setting icon paths
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

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

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map)
    },
   async loadChargers() {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const res = await axios.get(`${backendUrl}/api/chargers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    const chargers = Array.isArray(res.data) ? res.data : (res.data.data || [])

    // Clear old markers
    this.markers.forEach(marker => this.map.removeLayer(marker))
    this.markers = []

    // Add new markers with custom styled icon
    chargers.forEach(charger => {
      if (charger.location?.lat && charger.location?.lng) {
        // Use a custom divIcon
        const customIcon = L.divIcon({
          className: '', // remove default Leaflet styling
          html: `
            <div style="
              width: 40px;
              height: 40px;
              background: white;
              border: 4px solid black;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 0 5px rgba(0,0,0,0.3);
            ">
              <img src="/icon.png" style="width: 24px; height: 24px;" />
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40]
        })

        const marker = L.marker(
          [charger.location.lat, charger.location.lng],
          { icon: customIcon }
        ).addTo(this.map)

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
