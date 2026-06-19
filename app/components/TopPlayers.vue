<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PlayerProfile } from '@/types'
import { MapPin, ChevronRight, Logo } from '@/components/ui/Icons'

const props = defineProps<{
  players: PlayerProfile[]
  isFullPage?: boolean
}>()

const emit = defineEmits<{
  (e: 'open-player', player: PlayerProfile): void
  (e: 'view-all'): void
}>()

const search = ref('')
const activeSport = ref('All')
const activeLocation = ref('All Locations')

const sports = ['All', 'Football', 'Basketball', 'Tennis', 'Padel']

const locations = computed(() => {
  const locs = new Set(props.players.map(p => p.location).filter((l): l is string => !!l))
  return ['All Locations', ...Array.from(locs)]
})

const filteredPlayers = computed(() => {
  return props.players.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesSport = activeSport.value === 'All' || p.mainSport === activeSport.value
    const matchesLocation = activeLocation.value === 'All Locations' || p.location === activeLocation.value
    return matchesSearch && matchesSport && matchesLocation
  })
})

const getPreviewStat = (player: PlayerProfile) => {
  if (player.mainSport === 'Football') return { label: 'Goals', value: player.stats.goals || 0 }
  if (player.mainSport === 'Basketball') return { label: 'Points', value: player.stats.points || 0 }
  if (player.mainSport === 'Tennis' || player.mainSport === 'Padel') return { label: 'Sets Won', value: player.stats.setsWon || 0 }
  return { label: 'Rating', value: player.stats.rating }
}

const getCardClasses = (idx: number) => {
  const isEven = idx % 2 === 0
  
  if (props.isFullPage) {
    if (isEven) {
      return {
        card: "bg-white hover:bg-black",
        text: "text-black group-hover:text-white",
        meta: "text-black/40 group-hover:text-white/50",
        border: "border-black/5 group-hover:border-white/10",
        nameHover: "group-hover:text-[#C6FF00]",
        statValue: "text-black group-hover:text-[#C6FF00]"
      }
    } else {
      return {
        card: "bg-black hover:bg-white",
        text: "text-white group-hover:text-black",
        meta: "text-white/50 group-hover:text-black/40",
        border: "border-white/10 group-hover:border-black/5",
        nameHover: "group-hover:text-black",
        statValue: "text-[#C6FF00] group-hover:text-black"
      }
    }
  } else {
    return {
      card: "bg-white/5 hover:bg-white/10",
      text: "text-white",
      meta: "text-white/40",
      border: "border-white/10",
      nameHover: "group-hover:text-[#C6FF00]",
      statValue: "text-[#C6FF00] group-hover:text-[#C6FF00]"
    }
  }
}
</script>

<template>
  <section :class="['relative overflow-hidden', isFullPage ? 'bg-[#FDFDFB] pt-24 sm:pt-32 md:pt-40 pb-20 sm:pb-32 md:pb-40' : 'py-20 sm:py-24 md:py-32 bg-black text-white rounded-[40px] sm:rounded-[60px] md:rounded-[120px] mx-2 md:mx-10 mb-20 shadow-2xl']">
    <template v-if="!isFullPage">
      <div class="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#C6FF00]/10 blur-[80px] sm:blur-[120px] rounded-full -mr-20 sm:-mr-40 -mt-20 sm:-mt-40 pointer-events-none opacity-50"></div>
      <div class="absolute bottom-0 left-0 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-blue-500/5 blur-[60px] sm:blur-[100px] rounded-full -ml-10 sm:-ml-20 -mb-10 sm:-mb-20 pointer-events-none"></div>
    </template>

    <div class="max-w-7xl mx-auto relative z-10 px-4 md:px-12">
      <!-- Header Section -->
      <div :class="['text-center space-y-6 md:space-y-10 mb-12 sm:mb-16 md:mb-24', isFullPage ? 'text-black' : 'text-white']">
        <div :class="['pc-view-enter inline-flex items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em]', isFullPage ? 'text-black/30' : 'text-[#C6FF00]']">
          <span :class="['w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full', isFullPage ? 'bg-black' : 'bg-white animate-pulse']"></span>
          {{ isFullPage ? 'THE COMMUNITY HUB' : 'CITY HALL OF FAME' }}
        </div>

        <h2 :class="['font-black leading-[0.85] tracking-tighter italic uppercase', isFullPage ? 'text-5xl sm:text-7xl md:text-[9rem] text-black' : 'text-5xl sm:text-7xl md:text-9xl text-white']">
          Built for <br class="hidden md:block" /> Glory.
        </h2>

        <p :class="['font-bold max-w-2xl mx-auto text-sm sm:text-lg md:text-xl leading-tight tracking-tight px-4', isFullPage ? 'text-black/60' : 'text-white/50']">
          Where the city's finest record their legacy. Find rivals, climb the ranks, and become an amateur legend.
        </p>

        <div v-if="isFullPage" class="max-w-4xl mx-auto space-y-6 sm:space-y-8 pt-4 sm:pt-6">
          <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 px-2 sm:px-0">
            <!-- Search Input -->
            <div class="sm:col-span-8 relative group">
              <input
                type="text"
                placeholder="Scout for athletes..."
                v-model="search"
                class="w-full bg-black/5 border-2 border-transparent focus:border-black rounded-full pl-12 sm:pl-16 pr-6 sm:pr-8 h-auto py-4 sm:py-6 text-black font-black text-sm sm:text-base outline-none transition-all placeholder:text-black/20 shadow-sm focus-visible:ring-0"
              />
              <div class="absolute left-6 sm:left-7 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors">
                <svg width="20" height="20" class="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              </div>
            </div>

            <!-- Location Filter Dropdown -->
            <div class="sm:col-span-4 relative group">
              <UiSelect v-model="activeLocation">
                <UiSelectTrigger class="w-full bg-black/5 border-2 border-transparent focus:border-black rounded-full pl-6 pr-6 h-auto py-4 sm:py-6 text-black font-black text-sm sm:text-base outline-none transition-all shadow-sm hover:bg-black/10 focus:ring-0">
                  <UiSelectValue placeholder="Select Location" />
                </UiSelectTrigger>
                <UiSelectContent class="bg-white/90 backdrop-blur-xl border border-black/5 rounded-3xl shadow-2xl p-2 z-[200]">
                  <UiSelectItem v-for="loc in locations" :key="loc" :value="loc" class="rounded-xl font-bold py-3 text-black focus:bg-[#C6FF00] focus:text-black cursor-pointer">
                    {{ loc }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
              <div class="absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 text-black/30 pointer-events-none">
                <MapPin class="w-4 h-4" />
              </div>
            </div>
          </div>

          <!-- Sport Filter Pills -->
          <div class="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
            <button
              v-for="sport in sports"
              :key="sport"
              @click="activeSport = sport"
              :class="['px-5 sm:px-8 py-2 sm:py-3 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-all', activeSport === sport ? 'bg-black text-white shadow-xl scale-105' : 'bg-gray-100 text-black/40 hover:bg-gray-200']"
            >
              {{ sport }}
            </button>
          </div>
        </div>
      </div>

      <!-- Players Grid with the "Black-out" hover effect -->
      <div :class="['grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6', isFullPage ? 'w-full' : '']">
        <div
          v-for="(player, idx) in filteredPlayers"
          :key="player.id"
          @click="emit('open-player', player)"
          :class="[
            'pc-content-visibility-sm touch-scale touch-target group relative overflow-hidden rounded-[32px] sm:rounded-[40px] border transition-all duration-500 cursor-pointer flex flex-col shadow-sm hover:shadow-2xl',
            getCardClasses(idx).card,
            getCardClasses(idx).text,
            getCardClasses(idx).border
          ]"
        >
          <!-- Morphing Watermark Background -->
          <div class="absolute -top-10 -right-10 w-48 h-48 sm:w-64 sm:h-64 opacity-[0.03] group-hover:opacity-10 group-hover:rotate-12 transition-all duration-1000 pointer-events-none">
            <Logo />
          </div>

          <div class="p-6 sm:p-8 flex flex-col gap-6 h-full">
            <!-- Identity Container -->
            <div class="relative shrink-0 self-center md:self-start">
              <div class="relative">
                <img
                  :src="player.avatar"
                  :alt="player.name"
                  class="w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full object-cover border-[6px] sm:border-[8px] border-black/5 group-hover:border-[#C6FF00] transition-all duration-500 shadow-2xl"
                />
                <div class="absolute -bottom-2 -right-2 bg-[#C6FF00] text-black w-9 h-9 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-black text-base sm:text-2xl shadow-2xl border-4 border-black group-hover:scale-110 transition-transform">
                  #{{ idx + 1 }}
                </div>
              </div>
            </div>

            <!-- Stats & Info Container -->
            <div class="flex-1 min-w-0 w-full flex flex-col justify-between">
              <div class="space-y-4 sm:space-y-5 mb-5 sm:mb-8 text-center md:text-left">
                <div class="flex flex-wrap justify-center md:justify-start gap-2 items-center">
                  <span class="bg-[#C6FF00] text-black text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-3 sm:px-4 py-1.5 rounded-full shadow-lg">
                    {{ player.mainSport }}
                  </span>
                  <span :class="['text-[8px] sm:text-[9px] font-black uppercase tracking-widest transition-colors', getCardClasses(idx).meta]">
                    Verified Legend
                  </span>
                </div>
                <h3 :class="['text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] italic uppercase transition-colors break-words line-clamp-2', getCardClasses(idx).nameHover]">
                  {{ player.name }}
                </h3>
              </div>

              <!-- Rigid Stat Matrix -->
              <div :class="['grid grid-cols-3 gap-0 border-y py-4 sm:py-8 mb-5 sm:mb-8 transition-colors', getCardClasses(idx).border]">
                <div class="text-center px-1">
                  <p :class="['text-lg sm:text-2xl md:text-3xl font-black italic tracking-tighter mb-1 transition-colors', getCardClasses(idx).text]">
                    {{ player.stats.winRate }}
                  </p>
                  <p :class="['text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] transition-colors truncate', getCardClasses(idx).meta]">Win Rate</p>
                </div>
                <div :class="['text-center border-x px-1 sm:px-4 transition-colors', getCardClasses(idx).border]">
                  <p :class="['text-lg sm:text-2xl md:text-3xl font-black italic drop-shadow-sm transition-transform group-hover:scale-110', getCardClasses(idx).statValue]">
                    {{ getPreviewStat(player).value }}
                  </p>
                  <p :class="['text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] transition-colors truncate', getCardClasses(idx).meta]">{{ getPreviewStat(player).label }}</p>
                </div>
                <div class="text-center px-1">
                  <p :class="['text-lg sm:text-2xl md:text-3xl font-black italic tracking-tighter mb-1 transition-colors', getCardClasses(idx).text]">
                    {{ player.stats.mvps }}
                  </p>
                  <p :class="['text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] transition-colors truncate', getCardClasses(idx).meta]">MVPs</p>
                </div>
              </div>

              <!-- Scouting Brief -->
              <div class="flex items-center justify-between gap-3 sm:gap-6 mt-auto">
                <div class="min-w-0 flex-1">
                  <p :class="['text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-1 sm:mb-2 transition-colors', getCardClasses(idx).meta]">PLAYER BIO</p>
                  <p :class="['text-[10px] sm:text-xs md:text-sm font-bold italic leading-tight line-clamp-2 transition-colors opacity-80', getCardClasses(idx).text]">
                    "{{ player.bio }}"
                  </p>
                </div>
                <div class="p-2 sm:p-3 rounded-2xl transition-all group-hover:translate-x-1 shrink-0 bg-[#C6FF00] text-black">
                  <ChevronRight class="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!isFullPage" class="pc-view-enter mt-16 sm:mt-24 md:mt-32 text-center">
        <button
          @click="emit('view-all')"
          class="touch-scale-sm touch-target bg-white text-black px-8 sm:px-12 md:px-20 py-6 md:py-8 rounded-full font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px] hover:bg-[#C6FF00] hover:text-black transition-all shadow-2xl flex items-center gap-3 sm:gap-5 mx-auto"
        >
          View Full City Rankings
          <div class="bg-black text-[#C6FF00] p-2 rounded-full"><ChevronRight /></div>
        </button>
      </div>
    </div>
  </section>
</template>
