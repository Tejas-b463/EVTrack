<template>
  <div>
    <ShimmerLoader v-if="isLoading" />
    
    <div v-else>
      <Navbar />
      <AddStationForm @stationAdded="refreshStations" />
      <StationList ref="stationList" />
      <MapView />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import AddStationForm from '@/components/AddStationForm.vue'
import StationList from '@/components/StationList.vue'
import MapView from '@/components/MapView.vue'
import ShimmerLoader from '@/components/ShimmerLoader.vue'

export default {
  components: { Navbar, AddStationForm, StationList, MapView, ShimmerLoader },
  data() {
    return {
      isLoading: true,
    }
  },
  mounted() {
    this.loadDashboard()
  },
  methods: {
    async loadDashboard() {
      await this.fetchInitialData()
      this.isLoading = false
    },
    fetchInitialData() {
      return new Promise(resolve => setTimeout(resolve, 1500))
    },
    refreshStations() {
      if (this.$refs.stationList && this.$refs.stationList.fetchStations) {
        this.$refs.stationList.fetchStations()
      }
    },
  },
}
</script>
