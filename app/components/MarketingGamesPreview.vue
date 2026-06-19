<script setup lang="ts">
import type { Game } from '@/types'

const props = defineProps<{
  games: Game[]
}>()

const ClockIcon = {
  template: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>`
}

const MapPinIcon = {
  template: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>`
}

const ChevronIcon = {
  template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>`
}
</script>

<template>
  <section class="pc-render-contain px-4 md:px-12 py-24 md:py-32 bg-transparent">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 px-4 gap-6">
        <div class="space-y-4">
          <div class="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-black/30">
            <span class="w-1.5 h-1.5 rounded-full bg-[#C6FF00]" />
            LIVE GAMES
          </div>
          <h2 class="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Games Near You</h2>
        </div>
        <NuxtLink to="/discover" class="touch-scale-sm touch-target bg-black text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all w-full md:w-auto text-center hover:bg-[#C6FF00] hover:text-black">
          Explore Full Feed
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        <NuxtLink
          v-for="game in games"
          :key="game.id"
          :to="`/game/${game.slug || game.id}`"
          class="touch-card touch-target group bg-white hover:bg-black rounded-[48px] p-6 flex flex-col cursor-pointer transition-all duration-500 hover:shadow-[0_60px_120px_rgba(0,0,0,0.25)] border border-black/10 hover:border-white/20 relative overflow-hidden h-full min-h-[560px]"
        >
          <div class="relative h-64 md:h-72 rounded-[40px] overflow-hidden mb-8">
            <img
              :src="game.imageUrl"
              :alt="game.title"
              class="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-[1500ms] ease-out"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            <div class="absolute top-6 left-6 right-6 flex justify-between items-start">
              <div class="flex flex-col gap-2">
                <span class="glass px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
                  {{ game.sport }}
                </span>
                <span 
                  class="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg"
                  :class="game.spotsTaken === game.spotsTotal ? 'bg-red-500 text-white' : 'bg-[#C6FF00] text-black'"
                >
                  {{ game.spotsTaken === game.spotsTotal ? 'SQUAD FULL' : `${Math.max(game.spotsTotal - game.spotsTaken, 0)} OPEN` }}
                </span>
              </div>
              <div class="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl flex flex-col items-center min-w-[70px] border border-white/20">
                <span class="text-[10px] font-black uppercase tracking-widest text-black/40 leading-none mb-1">Price</span>
                <span class="text-sm font-black text-black leading-none">{{ game.price }}</span>
              </div>
            </div>
          </div>

          <div class="flex-1 flex flex-col px-4 pb-4">
            <div class="mb-8">
              <h3 class="text-3xl md:text-4xl font-black tracking-tighter italic leading-[0.9] uppercase text-black group-hover:text-white mb-5 transition-colors duration-300">
                {{ game.title }}
              </h3>
              <div class="space-y-3">
                <div class="flex items-center gap-4 text-black/50 group-hover:text-white/40 font-black text-[11px] uppercase tracking-[0.15em] transition-colors">
                  <div class="w-5 h-5 flex items-center justify-center shrink-0"><component :is="MapPinIcon" /></div>
                  <span class="truncate">{{ game.location }}</span>
                </div>
                <div class="flex items-center gap-4 text-black/50 group-hover:text-white/40 font-black text-[11px] uppercase tracking-[0.15em] transition-colors">
                  <div class="w-5 h-5 flex items-center justify-center shrink-0"><component :is="ClockIcon" /></div>
                  <span>{{ game.date }} • {{ game.time }}</span>
                </div>
              </div>
            </div>

            <div class="mt-auto space-y-8">
              <div class="space-y-4">
                <div class="flex justify-between items-end px-1">
                  <span class="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 group-hover:text-white/20 transition-colors">Squad Recruitment</span>
                  <span class="text-sm font-black italic text-black group-hover:text-white transition-colors">
                    {{ game.spotsTaken }} <span class="text-[10px] font-black opacity-30 mx-1">/</span> {{ game.spotsTotal }}
                  </span>
                </div>
                <div class="h-3 w-full bg-gray-100 group-hover:bg-white/5 rounded-full overflow-hidden transition-colors">
                  <div
                    class="h-full transition-all duration-1000"
                    :class="((game.spotsTaken / game.spotsTotal) * 100) > 85 ? 'bg-red-500' : 'bg-black group-hover:bg-[#C6FF00]'"
                    :style="{ width: `${Math.min((game.spotsTaken / game.spotsTotal) * 100, 100)}%` }"
                  />
                </div>
              </div>

              <div class="flex items-center justify-between pt-6 border-t border-black/10 group-hover:border-white/20 transition-colors -mr-6">
                <span class="text-[10px] font-black uppercase tracking-[0.25em] text-black/30 group-hover:text-white/30">
                  {{ game.organizer }}
                </span>
                <span class="h-14 pl-8 pr-6 rounded-l-full rounded-r-none text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shrink-0 bg-black text-white group-hover:bg-[#C6FF00] group-hover:text-black">
                  View Match
                  <component :is="ChevronIcon" />
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
