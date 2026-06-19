<script setup lang="ts">
import { ref, computed } from 'vue'
import { GAMES } from '@/constants'

const activeCategory = ref('All')
const searchQuery = ref('')

const categories = ['All', 'Football', 'Basketball', 'Tennis', 'Volleyball', 'Padel', 'Badminton']

const filteredGames = computed(() => {
  return GAMES.filter(game => {
    const matchesCategory = activeCategory.value === 'All' || game.sport === activeCategory.value
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          game.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

const SearchIcon = {
  template: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>`
}
</script>

<template>
  <div class="min-h-screen bg-[#F5F5F0] text-black font-sans flex flex-col selection:bg-[#C6FF00] selection:text-black">
    <Header position="sticky" />

    <main class="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:px-12 md:py-20 pb-40">
      <!-- Page Header -->
      <div class="mb-12 md:mb-20">
        <h1 class="text-5xl sm:text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] mb-6">
          Discover <br/> <span class="text-black/30">Matches</span>
        </h1>
        <p class="text-lg md:text-xl font-bold text-black/50 max-w-lg">
          Find and join high-intensity games happening in your area.
        </p>
      </div>

      <!-- Filters & Search -->
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-16">
        <!-- Categories -->
        <div class="flex items-center gap-3 overflow-x-auto pb-4 lg:pb-0 w-full lg:w-auto scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="activeCategory = cat"
            :class="[
              'px-6 py-4 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300',
              activeCategory === cat 
                ? 'bg-black text-white shadow-xl scale-105 shadow-[0_10px_30px_rgba(0,0,0,0.15)]' 
                : 'bg-black/5 text-black/40 hover:bg-black/10 hover:text-black border border-black/5'
            ]"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Search -->
        <div class="relative w-full lg:w-80 shrink-0">
          <div class="absolute inset-y-0 left-5 flex items-center pointer-events-none text-black/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search games or locations..." 
            class="w-full bg-white border border-black/5 rounded-full py-5 pl-14 pr-6 text-sm font-bold text-black placeholder:text-black/30 focus:outline-none focus:ring-4 focus:ring-black/10 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
          />
        </div>
      </div>

      <!-- Grid -->
      <div v-if="filteredGames.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
        <NuxtLink 
          v-for="game in filteredGames" 
          :key="game.id" 
          :to="`/game/${game.id}`"
          class="block group"
        >
          <GameCard :game="game" />
        </NuxtLink>
      </div>
      
      <!-- Empty State -->
      <div v-else class="py-32 flex flex-col items-center justify-center text-center bg-white rounded-[48px] border border-black/5 shadow-sm">
        <div class="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center mb-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-black/30">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <h3 class="text-3xl font-black uppercase italic tracking-tighter text-black mb-4">No matches found</h3>
        <p class="text-black/40 font-bold max-w-sm text-sm">
          We couldn't find any games matching your current filters. Try adjusting your search or category.
        </p>
        <button 
          @click="activeCategory = 'All'; searchQuery = ''" 
          class="mt-10 pc-btn-press bg-black text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-[#C6FF00] hover:text-black transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </main>

    <!-- Spacer div before footer negative margin kicks in -->
    <div class="h-24 bg-[#F5F5F0]"></div>
    <MarketingFooter />
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
