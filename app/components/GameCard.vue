<script setup lang="ts">
import type { Game } from '@/types'
import { MapPin, Clock, ChevronRight } from '@/components/ui/Icons'

const props = defineProps<{
  game: Game
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const isFull = computed(() => props.game.spotsTaken === props.game.spotsTotal)
const fillPercentage = computed(() => (props.game.spotsTaken / props.game.spotsTotal) * 100)
</script>

<template>
  <div
    @click="emit('click')"
    class="pc-card-lift touch-target group bg-white hover:bg-black rounded-[48px] p-6 flex flex-col cursor-pointer transition-all duration-500 hover:shadow-[0_60px_120px_rgba(0,0,0,0.25)] border border-black/10 hover:border-white/20 relative overflow-hidden h-full min-h-[620px]"
  >
    <!-- Visual Identity Section -->
    <div class="relative h-64 md:h-80 rounded-[40px] overflow-hidden mb-8">
      <img
        :src="game.imageUrl"
        :alt="game.title"
        class="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-[1500ms] ease-out"
      />

      <!-- Gradient Overlay for Tag Visibility -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

      <!-- Floating Tags -->
      <div class="absolute top-6 left-6 right-6 flex justify-between items-start">
        <div class="flex flex-col gap-2">
          <span class="glass px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
            {{ game.sport }}
          </span>
          <span 
            class="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg"
            :class="isFull ? 'bg-red-500 text-white' : 'bg-[#C6FF00] text-black'"
          >
            {{ isFull ? 'SQUAD FULL' : `${game.spotsTotal - game.spotsTaken} OPEN` }}
          </span>
        </div>
        <div class="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl flex flex-col items-center min-w-[70px] border border-white/20">
          <span class="text-[10px] font-black uppercase tracking-widest text-black/40 leading-none mb-1">Price</span>
          <span class="text-sm font-black text-black leading-none">{{ game.price }}</span>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="flex-1 flex flex-col px-4 pb-4">
      <div class="mb-10">
        <h3 class="text-3xl md:text-5xl font-black tracking-tighter italic leading-[0.9] uppercase text-black group-hover:text-white mb-5 transition-colors duration-300">
          {{ game.title }}
        </h3>

        <div class="space-y-3">
          <div class="flex items-center gap-4 text-black/50 group-hover:text-white/40 font-black text-[11px] uppercase tracking-[0.15em] transition-colors">
            <div class="w-5 h-5 flex items-center justify-center shrink-0"><MapPin /></div>
            <span class="truncate">{{ game.location }}</span>
          </div>
          <div class="flex items-center gap-4 text-black/50 group-hover:text-white/40 font-black text-[11px] uppercase tracking-[0.15em] transition-colors">
            <div class="w-5 h-5 flex items-center justify-center shrink-0"><Clock /></div>
            <span>{{ game.date }} • {{ game.time }}</span>
          </div>
        </div>
      </div>

      <div class="mt-auto space-y-10">
        <!-- Squad Progress Bar -->
        <div class="space-y-4">
          <div class="flex justify-between items-end px-1">
            <span class="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 group-hover:text-white/20 transition-colors">Squad Recruitment</span>
            <span class="text-sm font-black italic text-black group-hover:text-white transition-colors">
              {{ game.spotsTaken }} <span class="text-[10px] font-black opacity-30 mx-1">/</span> {{ game.spotsTotal }}
            </span>
          </div>
          <div class="h-3 w-full bg-gray-100 group-hover:bg-white/5 rounded-full overflow-hidden transition-colors">
            <div
              :style="{ width: `${fillPercentage}%` }"
              class="h-full transition-all duration-1000"
              :class="fillPercentage > 85 ? 'bg-red-500' : 'bg-black group-hover:bg-[#C6FF00]'"
            />
          </div>
        </div>

        <!-- Action Row - Integrated Button Design -->
        <div class="flex items-center justify-between pt-8 border-t border-black/10 group-hover:border-white/20 transition-colors -mr-6">
          <div class="flex -space-x-4 shrink-0 pl-0">
            <img 
              v-for="p in game.participants?.slice(0, 3)" 
              :key="p.id" 
              :src="p.avatar" 
              class="w-12 h-12 rounded-full border-[4px] border-white group-hover:border-black transition-colors object-cover shadow-md" 
              alt="participant" 
            />
            <div 
              v-if="game.participants && game.participants.length > 3" 
              class="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-white/10 text-black group-hover:text-white flex items-center justify-center text-[10px] font-black border-[4px] border-white group-hover:border-black transition-all"
            >
              +{{ game.participants.length - 3 }}
            </div>
          </div>

          <button
            :disabled="isFull"
            class="pc-btn-press h-16 pl-10 pr-8 rounded-l-full rounded-r-none text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 shrink-0"
            :class="isFull ? 'bg-gray-100 text-black/20 cursor-not-allowed' : 'bg-black text-white group-hover:bg-[#C6FF00] group-hover:text-black shadow-[-20px_0_40px_rgba(0,0,0,0.1)] group-hover:shadow-[-20px_0_40px_rgba(198,255,0,0.2)]'"
          >
            {{ isFull ? 'SQUAD FULL' : 'JOIN MATCH' }}
            <div v-if="!isFull" class="pc-icon-kick group-hover:translate-x-1 transition-transform duration-300">
              <ChevronRight />
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
