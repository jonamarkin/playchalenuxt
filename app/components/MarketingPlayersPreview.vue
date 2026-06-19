<script setup lang="ts">
import type { PlayerProfile } from '@/types'

const props = defineProps<{
  players: PlayerProfile[]
}>()

const ChevronIcon = {
  template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>`
}

function getPreviewStat(player: PlayerProfile) {
  if (player.mainSport === 'Football') {
    return { label: 'Goals', value: player.stats.goals || 0 }
  } else if (player.mainSport === 'Basketball') {
    return { label: 'Points', value: player.stats.points || 0 }
  }
  return { label: 'Rating', value: player.stats.rating }
}
</script>

<template>
  <section class="pc-render-contain relative overflow-hidden py-20 sm:py-24 md:py-32 bg-black text-white rounded-[40px] sm:rounded-[60px] md:rounded-[120px] mx-2 md:mx-10 mb-20 shadow-2xl">
    <div class="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#C6FF00]/10 blur-[80px] sm:blur-[120px] rounded-full -mr-20 sm:-mr-40 -mt-20 sm:-mt-40 pointer-events-none opacity-50" />
    <div class="absolute bottom-0 left-0 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-blue-500/5 blur-[60px] sm:blur-[100px] rounded-full -ml-10 sm:-ml-20 -mb-10 sm:-mb-20 pointer-events-none" />

    <div class="max-w-7xl mx-auto relative z-10 px-4 md:px-12">
      <div class="text-center space-y-6 md:space-y-10 mb-12 sm:mb-16 md:mb-24 text-white">
        <div class="inline-flex items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[#C6FF00]">
          <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white animate-pulse" />
          CITY HALL OF FAME
        </div>

        <h2 class="font-black leading-[0.85] tracking-tighter italic uppercase text-5xl sm:text-7xl md:text-9xl text-white">
          Built for <br /> Glory.
        </h2>

        <p class="font-bold max-w-[19rem] sm:max-w-2xl mx-auto text-sm sm:text-lg md:text-xl leading-tight tracking-tight px-4 text-white/50">
          Find active players nearby, compare form, and build your local sports circle.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
        <NuxtLink
          v-for="(player, idx) in players"
          :key="player.id"
          :to="`/profile/${player.slug || player.id}`"
          class="touch-scale touch-target group relative overflow-hidden rounded-[32px] sm:rounded-[40px] border transition-all duration-500 cursor-pointer flex flex-col shadow-sm bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/20 hover:shadow-2xl"
        >
          <div class="p-6 sm:p-8 flex flex-col gap-6">
            <div class="flex items-center gap-5">
              <div class="relative shrink-0">
                <img
                  :src="player.avatar"
                  :alt="player.name"
                  class="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-[6px] border-white/20 group-hover:border-[#C6FF00] transition-all duration-500 shadow-2xl"
                />
                <div class="absolute -bottom-2 -right-2 bg-[#C6FF00] text-black w-10 h-10 rounded-full flex items-center justify-center font-black text-base shadow-2xl border-4 border-black group-hover:scale-[1.02] transition-transform">
                  #{{ idx + 1 }}
                </div>
              </div>

              <div class="min-w-0">
                <div class="flex flex-wrap gap-2 items-center mb-4">
                  <span class="bg-[#C6FF00] text-black text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-3 sm:px-4 py-1.5 rounded-full shadow-lg">
                    {{ player.mainSport }}
                  </span>
                  <span class="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-white/40">
                    Verified Legend
                  </span>
                </div>
                <h3 class="text-2xl sm:text-4xl font-black tracking-tighter leading-[0.9] italic uppercase group-hover:text-white transition-colors break-words line-clamp-2">
                  {{ player.name }}
                </h3>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-0 border-y border-white/10 py-5 transition-colors">
              <div class="text-center px-1">
                <p class="text-lg sm:text-2xl md:text-3xl font-black italic tracking-tighter mb-1 text-white">
                  {{ player.stats.winRate }}
                </p>
                <p class="text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-white/40 truncate">Win Rate</p>
              </div>
              <div class="text-center border-x border-white/10 px-1 sm:px-4">
                <p class="text-lg sm:text-2xl md:text-3xl font-black italic text-[#C6FF00] group-hover:scale-[1.02] transition-transform">
                  {{ getPreviewStat(player).value }}
                </p>
                <p class="text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-white/40 truncate">
                  {{ getPreviewStat(player).label }}
                </p>
              </div>
              <div class="text-center px-1">
                <p class="text-lg sm:text-2xl md:text-3xl font-black italic tracking-tighter mb-1 text-white">
                  {{ player.stats.mvps }}
                </p>
                <p class="text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-white/40 truncate">MVPs</p>
              </div>
            </div>

            <div class="flex items-center justify-between gap-3 mt-auto">
              <div class="min-w-0 flex-1">
                <p class="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-1 sm:mb-2 text-white/40">PLAYER BIO</p>
                <p class="text-[10px] sm:text-xs md:text-sm font-bold italic leading-tight line-clamp-2 opacity-80 text-white">
                  {{ player.bio }}
                </p>
              </div>
              <div class="p-2 sm:p-3 rounded-2xl transition-all group-hover:translate-x-1 shrink-0 bg-[#C6FF00] text-black">
                <component :is="ChevronIcon" />
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div class="mt-16 sm:mt-24 md:mt-32 text-center">
        <NuxtLink to="/community" class="touch-scale-sm touch-target bg-white text-black px-8 sm:px-12 md:px-20 py-6 md:py-8 rounded-full font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px] hover:bg-[#C6FF00] hover:text-black transition-all shadow-2xl inline-flex items-center gap-3 sm:gap-5 mx-auto">
          View Full City Rankings
          <span class="bg-black text-[#C6FF00] p-2 rounded-full"><component :is="ChevronIcon" /></span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
