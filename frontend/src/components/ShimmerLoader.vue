<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 px-4 py-3 sm:px-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="shimmer w-6 h-6 rounded"></div>
          <div class="shimmer w-20 h-6 rounded"></div>
        </div>
        <div class="shimmer w-16 h-8 rounded"></div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <!-- Page Title -->
      <div class="mb-6">
        <div class="shimmer w-64 h-8 rounded mb-2"></div>
        <div class="shimmer w-48 h-4 rounded"></div>
      </div>

      <!-- Add New Station Card -->
      <div class="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div class="shimmer w-48 h-6 rounded mb-6"></div>
        
        <!-- Form Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <!-- Station Name -->
          <div>
            <div class="shimmer w-24 h-4 rounded mb-2"></div>
            <div class="shimmer w-full h-10 rounded"></div>
          </div>
          
          <!-- Latitude -->
          <div>
            <div class="shimmer w-16 h-4 rounded mb-2"></div>
            <div class="shimmer w-full h-10 rounded"></div>
          </div>
          
          <!-- Longitude -->
          <div>
            <div class="shimmer w-20 h-4 rounded mb-2"></div>
            <div class="shimmer w-full h-10 rounded"></div>
          </div>
          
          <!-- Status -->
          <div>
            <div class="shimmer w-12 h-4 rounded mb-2"></div>
            <div class="shimmer w-full h-10 rounded"></div>
          </div>
          
          <!-- Power Output -->
          <div>
            <div class="shimmer w-28 h-4 rounded mb-2"></div>
            <div class="shimmer w-full h-10 rounded"></div>
          </div>
          
          <!-- Connector Type -->
          <div>
            <div class="shimmer w-28 h-4 rounded mb-2"></div>
            <div class="shimmer w-full h-10 rounded"></div>
          </div>
        </div>
        
        <!-- Add Button -->
        <div class="flex justify-end">
          <div class="shimmer w-28 h-10 rounded"></div>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-4 mb-6">
        <div class="shimmer w-24 h-10 rounded"></div>
        <div class="shimmer w-24 h-10 rounded"></div>
        <div class="shimmer w-32 h-10 rounded"></div>
        <div class="shimmer w-16 h-10 rounded"></div>
        <div class="shimmer w-16 h-10 rounded"></div>
      </div>

      <!-- Management Section Title -->
      <div class="shimmer w-56 h-6 rounded mb-6"></div>

      <!-- Table -->
      <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <!-- Table Header -->
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div class="shimmer w-16 h-4 rounded"></div>
            <div class="shimmer w-20 h-4 rounded hidden md:block"></div>
            <div class="shimmer w-14 h-4 rounded"></div>
            <div class="shimmer w-24 h-4 rounded hidden lg:block"></div>
            <div class="shimmer w-20 h-4 rounded hidden lg:block"></div>
            <div class="shimmer w-16 h-4 rounded"></div>
          </div>
        </div>

        <!-- Table Rows -->
        <div v-for="row in 2" :key="row" class="px-6 py-4 border-b border-gray-200 last:border-b-0">
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center">
            <!-- Station -->
            <div class="flex items-center space-x-2">
              <div class="shimmer w-5 h-5 rounded"></div>
              <div class="shimmer w-16 h-4 rounded"></div>
            </div>
            
            <!-- Location -->
            <div class="hidden md:flex items-center space-x-1">
              <div class="shimmer w-3 h-3 rounded"></div>
              <div class="shimmer w-24 h-4 rounded"></div>
            </div>
            
            <!-- Status -->
            <div>
              <div :class="['shimmer w-16 h-6 rounded-full', row === 1 ? 'bg-green-100' : 'bg-red-100']"></div>
            </div>
            
            <!-- Power Output -->
            <div class="hidden lg:flex items-center space-x-1">
              <div class="shimmer w-4 h-4 rounded"></div>
              <div class="shimmer w-12 h-4 rounded"></div>
            </div>
            
            <!-- Connector -->
            <div class="hidden lg:flex items-center space-x-1">
              <div class="shimmer w-4 h-4 rounded"></div>
              <div class="shimmer w-10 h-4 rounded"></div>
            </div>
            
            <!-- Actions -->
            <div class="flex items-center space-x-2">
              <div class="shimmer w-8 h-8 rounded"></div>
              <div class="shimmer w-14 h-8 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShimmerLoader',
  data() {
    return {
      showSkeleton: true
    }
  },
  methods: {
    toggleSkeleton() {
      this.showSkeleton = !this.showSkeleton;
    }
  }
}
</script>

<style scoped>
@keyframes shimmer {
  0% { 
    background-position: -200% 0; 
  }
  100% { 
    background-position: 200% 0; 
  }
}

.shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite linear;
}
</style>