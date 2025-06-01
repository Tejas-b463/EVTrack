<template>
  <nav class="sticky top-0 z-50 bg-white shadow-md w-full">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div class="text-2xl font-semibold flex items-center gap-2 text-gray-800">
        <svg width="40" height="40" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0">
          <!-- Circle background -->
          <circle cx="40" cy="40" r="30" fill="none" stroke="black" stroke-width="4"/>
          
          <!-- Lightning bolt emoji-style symbol -->
          <text x="40" y="50" font-family="Arial, sans-serif" font-size="40" 
                text-anchor="middle" fill="black">⚡</text>
        </svg>
        <span>EvTrack</span>
      </div>
      <LogoutButton />
    </div>
  </nav>
</template>

<script>
import LogoutButton from './LogoutButton.vue'

export default {
  components: {
    LogoutButton
  }
}
</script>