<template>
  <Navbar />
  <AddStationForm @stationAdded="refreshStations" />
  <StationList ref="stationList" />
  <MapView />
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import AddStationForm from '@/components/AddStationForm.vue'
import StationList from '@/components/StationList.vue'
import MapView from '@/components/MapView.vue'

export default {
  components: { Navbar, AddStationForm, StationList, MapView },
  methods: {
    refreshStations() {
      if (this.$refs.stationList && this.$refs.stationList.fetchStations) {
        this.$refs.stationList.fetchStations()
      }
    }
  }
}
</script>
