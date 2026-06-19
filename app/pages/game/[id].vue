<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { GAMES } from '@/constants'
import { ChevronRight, getSportIcon } from '@/components/ui/Icons'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { user, hasProfile } = storeToRefs(authStore)

const game = computed(() => GAMES.find(g => g.id === route.params.id))

const loading = ref(false)
const hasJoined = ref(false)

const handleJoin = () => {
  if (!user.value) {
    router.push('/login')
    return
  }
  if (!hasProfile.value) {
    router.push('/onboarding')
    return
  }

  if (hasJoined.value) return
  loading.value = true
  setTimeout(() => {
    hasJoined.value = true
    loading.value = false
    alert('JOIN REQUEST SENT!')
  }, 1500)
}
</script>

<template>
  <div class="min-h-screen bg-black text-white font-sans selection:bg-[#C6FF00] selection:text-black relative pt-24 md:pt-28">

    <template v-if="!game">
      <div class="min-h-screen bg-black flex items-center justify-center text-white">
          <div class="animate-pulse flex flex-col items-center gap-4">
              <div class="w-12 h-12 bg-[#C6FF00] rounded-full animate-bounce"></div>
              <p class="font-black uppercase tracking-widest text-xs opacity-50">Arena Not Found</p>
          </div>
      </div>
    </template>
    <template v-else>
      <!-- Background Ambient -->
      <div class="fixed top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#C6FF00]/5 to-transparent pointer-events-none" />

      <button
          @click="router.back()"
          class="fixed top-28 md:top-32 left-4 md:left-8 z-[100] w-10 h-10 bg-black/50 backdrop-blur-md border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
      >
          <ChevronRight class="rotate-180 w-5 h-5" />
      </button>

      <div class="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-8 pb-32 pt-32">
          <!-- Header Section -->
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
              <div class="space-y-4">
                  <div class="flex items-center gap-3">
                      <span class="bg-[#C6FF00] text-black px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em]">
                          Upcoming Match
                      </span>
                      <span class="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-[#C6FF00] text-[#C6FF00]">
                          {{ game.status }}
                      </span>
                  </div>
                  <h1 class="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none text-white">
                      {{ game.title }}
                  </h1>
              </div>
          </div>

          <!-- JOIN VIEW -->
          <div class="pc-view-enter grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 relative z-10">

              <!-- Left Col: Info & Image -->
              <div class="lg:col-span-2 space-y-8">
                  <div class="relative aspect-video rounded-[32px] sm:rounded-[48px] overflow-hidden border border-white/10 shadow-2xl">
                      <img
                          :src="game.imageUrl"
                          :alt="game.title"
                          class="object-cover w-full h-full"
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                      <!-- Float Badge -->
                      <div class="absolute top-4 sm:top-8 left-4 sm:left-8 bg-black/30 backdrop-blur-xl border border-white/10 px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center gap-2 sm:gap-3">
                          <div class="text-[#C6FF00] w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                            <component :is="getSportIcon(game.sport)" />
                          </div>
                          <span class="text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest">{{ game.sport }}</span>
                      </div>

                      <div class="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 pr-6">
                          <p class="text-[#C6FF00] font-black uppercase tracking-[0.2em] text-[8px] sm:text-[10px] mb-1 sm:mb-2">Location</p>
                          <p class="text-2xl sm:text-3xl md:text-4xl font-black italic uppercase text-white leading-none break-words">{{ game.location }}</p>
                      </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                      <div class="bg-white/5 border border-white/5 p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] space-y-2">
                          <p class="text-white/30 text-[8px] sm:text-[9px] font-black uppercase tracking-widest">Date & Time</p>
                          <p class="text-base sm:text-lg md:text-xl font-black text-white italic">{{ game.date }} @ {{ game.time }}</p>
                      </div>
                      <div class="bg-white/5 border border-white/5 p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] space-y-2">
                          <p class="text-white/30 text-[8px] sm:text-[9px] font-black uppercase tracking-widest">Entry Fee</p>
                          <p class="text-base sm:text-lg md:text-xl font-black text-[#C6FF00] italic">{{ game.price }}</p>
                      </div>
                  </div>
              </div>

              <!-- Right Col: Squad & Actions -->
              <div class="space-y-8">

                  <!-- Organizer Card -->
                  <div class="bg-white/5 border border-white/10 p-1 rounded-[32px]">
                      <div class="bg-black p-5 sm:p-6 rounded-[28px] flex items-center gap-4">
                          <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C6FF00] flex items-center justify-center font-black italic text-lg text-black">
                              {{ game.organizer.charAt(0) }}
                          </div>
                          <div>
                              <p class="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-white/40">Hosted By</p>
                              <p class="text-white font-black italic uppercase text-sm sm:text-base">{{ game.organizer }}</p>
                          </div>
                      </div>
                  </div>

                  <!-- Squad List -->
                  <div class="bg-white/5 border border-white/10 rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 min-h-[400px] flex flex-col">
                      <div class="flex justify-between items-center mb-6">
                          <h3 class="text-base sm:text-lg font-black italic uppercase text-white">Squad</h3>
                          <span class="text-[#C6FF00] font-black text-xs sm:text-sm">{{ (game.participants?.length || 0) + (hasJoined ? 1 : 0) }} / {{ game.spotsTotal }}</span>
                      </div>

                      <div class="flex-1 space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                          <div v-for="p in game.participants" :key="p.id" class="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 hover:bg-white/5 rounded-2xl transition-colors">
                              <img
                                  :src="p.avatar"
                                  :alt="p.name"
                                  class="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10 object-cover"
                              />
                              <div class="flex-1 min-w-0">
                                  <p class="text-white font-black italic text-xs sm:text-sm truncate">{{ p.name }}</p>
                                  <p class="text-white/30 text-[7px] sm:text-[8px] font-black uppercase tracking-widest">{{ p.role || 'Player' }}</p>
                              </div>
                          </div>

                          <div v-if="hasJoined" class="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-white/10 rounded-2xl transition-colors border border-[#C6FF00]/50">
                              <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#C6FF00] bg-[#C6FF00]/20 flex items-center justify-center text-[#C6FF00] font-black text-[10px] sm:text-xs shrink-0">
                                ME
                              </div>
                              <div class="flex-1 min-w-0">
                                  <p class="text-white font-black italic text-xs sm:text-sm truncate">You</p>
                                  <p class="text-[#C6FF00] text-[7px] sm:text-[8px] font-black uppercase tracking-widest truncate">Pending Approval</p>
                              </div>
                          </div>

                          <div v-for="i in Math.max(0, game.spotsTotal - (game.participants?.length || 0) - (hasJoined ? 1 : 0))" :key="`empty-${i}`" class="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 opacity-30">
                              <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-dashed border-white/30 shrink-0" />
                              <p class="text-white font-black uppercase text-[9px] sm:text-[10px] tracking-widest">Open Spot</p>
                          </div>
                      </div>

                      <div class="pt-6 sm:pt-8 mt-4 border-t border-white/10">
                          <button 
                            @click="handleJoin" 
                            :disabled="loading || hasJoined || ((game.participants?.length || 0) >= game.spotsTotal)"
                            class="w-full py-4 sm:py-5 rounded-full bg-[#C6FF00] text-black font-black uppercase tracking-widest hover:bg-lime-400 hover:scale-[1.02] shadow-xl text-[10px] sm:text-xs transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                          >
                              {{ loading ? 'Sending Request...' : (hasJoined ? 'Requested' : 'Join Squad') }}
                          </button>
                      </div>
                  </div>

              </div>
          </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}
</style>
