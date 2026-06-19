<script setup lang="ts">
import { ref, computed } from 'vue'
import { GAMES } from '@/constants'

const activeCategory = ref('All')
const searchQuery = ref('')
const displayMode = ref<'grid' | 'calendar'>('grid')
const selectedDay = ref<string | null>(null)

const categories = ['All', 'Football', 'Basketball', 'Tennis', 'Volleyball', 'Padel', 'Badminton']

const filteredGames = computed(() => {
  return GAMES.filter(game => {
    const matchesCategory = activeCategory.value === 'All' || game.sport === activeCategory.value
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          game.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // Calendar day matching logic
    let matchesDay = true
    if (selectedDay.value) {
        if (game.date === 'Today') {
            const today = new Date()
            matchesDay = selectedDay.value === today.getDate().toString()
        } else {
            const dayMatch = game.date.match(/\s(\d{1,2})$/)
            matchesDay = dayMatch ? dayMatch[1] === selectedDay.value : false
        }
    }

    return matchesCategory && matchesSearch && matchesDay
  })
})

const toggleView = (mode: 'grid' | 'calendar') => {
  displayMode.value = mode
  if (mode === 'calendar') selectedDay.value = null
}

const handleSelectDate = (dateStr: string) => {
  selectedDay.value = dateStr
}
</script>

<template>
  <div class="min-h-screen bg-[#F5F5F0] text-black font-sans flex flex-col selection:bg-[#C6FF00] selection:text-black">
    <Header position="sticky" />

    <main class="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:px-12 md:py-20 pb-40">
      <!-- Page Header -->
      <div class="mb-12 md:mb-16">
        <h1 class="text-5xl sm:text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] mb-6">
          Discover <br/> <span class="text-black/30">Matches</span>
        </h1>
        <p class="text-lg md:text-xl font-bold text-black/50 max-w-lg">
          Find and join high-intensity games happening in your area.
        </p>
      </div>

      <!-- Filters & Search & Toggle -->
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 border-b border-black/5 pb-8">
        <div class="space-y-6 w-full lg:w-auto">
          <!-- Search -->
          <div class="relative w-full lg:w-96 shrink-0">
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

          <!-- Categories -->
          <div class="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
            <button 
              v-for="cat in categories" 
              :key="cat"
              @click="activeCategory = cat"
              :class="[
                'px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300',
                activeCategory === cat 
                  ? 'bg-black text-white shadow-xl scale-105 shadow-[0_10px_30px_rgba(0,0,0,0.15)]' 
                  : 'bg-black/5 text-black/40 hover:bg-black/10 hover:text-black border border-black/5'
              ]"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Toggle View -->
        <div class="flex bg-gray-200/50 p-1.5 rounded-full self-start lg:self-end">
          <button
            @click="toggleView('grid')"
            :class="['px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all', displayMode === 'grid' ? 'bg-black text-white shadow-md' : 'text-black/40 hover:text-black/60']"
          >
            List
          </button>
          <button
            @click="toggleView('calendar')"
            :class="['px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all', displayMode === 'calendar' ? 'bg-black text-white shadow-md' : 'text-black/40 hover:text-black/60']"
          >
            Calendar
          </button>
        </div>
      </div>

      <!-- Main Layout based on Display Mode -->
      <div v-if="displayMode === 'calendar'" class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <!-- Left: Calendar -->
        <div class="lg:col-span-7">
          <CalendarView :games="GAMES" :selected-date="selectedDay" @select="handleSelectDate" />
        </div>
        
        <!-- Right: Filtered Games -->
        <div class="lg:col-span-5 space-y-6">
          <div class="flex justify-between items-center mb-2">
            <h4 class="text-xl font-black italic uppercase tracking-tighter">
              {{ selectedDay ? `Games on Oct ${selectedDay}` : 'Upcoming Games' }}
            </h4>
            <span class="bg-black text-[#C6FF00] px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest">{{ filteredGames.length }} Found</span>
          </div>
          
          <div class="space-y-4 max-h-[700px] overflow-y-auto pr-2 scrollbar-hide">
            <NuxtLink
              v-for="game in filteredGames"
              :key="game.id"
              :to="`/game/${game.id}`"
              class="block"
            >
              <MobileGameRow :game="game" />
            </NuxtLink>
            
            <div v-if="filteredGames.length === 0" class="py-20 text-center flex flex-col items-center justify-center gap-4 bg-white/50 rounded-[40px] border border-black/5">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-black/20">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <p class="opacity-30 font-black italic uppercase text-lg">No matches found</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Grid Mode -->
      <div v-else>
        <div v-if="filteredGames.length > 0">
          <div class="space-y-4 md:hidden">
            <NuxtLink v-for="game in filteredGames" :key="`mobile-${game.id}`" :to="`/game/${game.id}`" class="block">
              <MobileGameRow :game="game" />
            </NuxtLink>
          </div>
          <div class="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            <NuxtLink 
              v-for="game in filteredGames" 
              :key="game.id" 
              :to="`/game/${game.id}`"
              class="block group"
            >
              <GameCard :game="game" />
            </NuxtLink>
          </div>
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
            @click="activeCategory = 'All'; searchQuery = ''; selectedDay = null" 
            class="mt-10 pc-btn-press bg-black text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-[#C6FF00] hover:text-black transition-colors"
          >
            Clear All Filters
          </button>
        </div>
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
