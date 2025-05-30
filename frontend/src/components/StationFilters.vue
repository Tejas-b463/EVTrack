<template>
  <div class="filters">
  <h1>Filter Station</h1>
    <select v-model="filters.status">
      <option value="">All Status</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>

    <select v-model="filters.powerOutput">
      <option value="">All Power</option>
      <option value="10kW">10kW</option>
      <option value="50kW">50kW</option>
      <option value="100kW">100kW</option>
    </select>

    <select v-model="filters.connectorType">
      <option value="">All Connectors</option>
      <option value="Type1">Type1</option>
      <option value="Type2">Type2</option>
      <option value="CCS">CCS</option>
    </select>

    <button @click="$emit('filterChanged', filters)">Apply</button>
    <button @click="clearFilters">Reset</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        status: '',
        powerOutput: '',
        connectorType: ''
      }
    }
  },
  methods: {
    clearFilters() {
      this.filters = {
        status: '',
        powerOutput: '',
        connectorType: ''
      }
      this.$emit('filterChanged', this.filters)
    }
  }
}
</script>
