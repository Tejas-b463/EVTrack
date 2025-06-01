<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-wrap items-center gap-3 p-4 border-b border-gray-200">
      <!-- Status Filter -->
      <div class="relative">
        <select 
          v-model="filters.status"
          @change="emitFilter"
          class="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-10 text-sm cursor-pointer font-medium text-gray-700 hover:bg-gray-50 focus:outline-none min-w-[120px]"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>

      <!-- Power Output Filter -->
      <div class="relative">
        <select 
          v-model="filters.powerOutput"
          @change="emitFilter"
          class="appearance-none bg-white cursor-pointer border border-gray-300 rounded px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none min-w-[120px]"
        >
          <option value="">All Power</option>
          <option value="10">10kW</option>
          <option value="50">50kW</option>
          <option value="100">100kW</option>
        </select>
        <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>

      <!-- Connector Type Filter -->
      <div class="relative">
        <select 
          v-model="filters.connectorType"
          @change="emitFilter"
          class="appearance-none bg-white border border-gray-300 cursor-pointer rounded px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none min-w-[120px]"
        >
          <option value="">All Connectors</option>
          <option value="Type1">Type1</option>
          <option value="Type2">Type2</option>
          <option value="CCS">CCS</option>
        </select>
        <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>

      <!-- Apply Filters Button -->
      <button 
        @click="emitFilter"
        class="inline-flex items-center px-4 py-2 border border-gray-300 cursor-pointer rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
      >
        Apply
      </button>

      <!-- Reset Button -->
      <button 
        @click="clearFilters"
        class="inline-flex items-center px-4 py-2 border border-gray-300 cursor-pointer rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script>
import { ChevronDown } from 'lucide-vue-next'

export default {
  components: {
    ChevronDown,
  },
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
    emitFilter() {
      this.$emit('filterChanged', this.filters)
    },
    clearFilters() {
      this.filters = {
        status: '',
        powerOutput: '',
        connectorType: ''
      }
      this.emitFilter()
    }
  }
}
</script>
