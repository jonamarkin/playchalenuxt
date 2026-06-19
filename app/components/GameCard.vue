<script setup lang="ts">
import { computed } from 'vue'
import { Clock, ChevronRight } from '@/components/ui/Icons'
import type { Game } from '@/types'

const props = defineProps<{
  game: Game
  isHost?: boolean
}>()

const isFull = computed(() => props.game.spotsTaken === props.game.spotsTotal)
</script>

<template>
  <div
    class="touch-scale bg-white border-2 border-black/5 p-5 sm:p-6 rounded-[28px] sm:rounded-[32px] flex gap-4 sm:gap-5 items-center hover:border-[#C6FF00] transition-all cursor-pointer group shadow-sm"
  >
    <img
      :src="game.imageUrl"
      :alt="game.title"
      class="w-16 h-16 sm:w-20 sm:h-20 rounded-[16px] sm:rounded-[20px] object-cover shadow-lg shrink-0"
    />
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <span class="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-black/40">{{ game.sport }}</span>
        <span v-if="game.visibility === 'private'" class="bg-black text-[#C6FF00] px-2 py-0.5 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-wider">Private</span>
        <span v-if="isHost" class="bg-[#C6FF00] text-black px-2 py-0.5 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-wider">Host</span>
      </div>
      <h4 class="text-base sm:text-lg font-black italic uppercase tracking-tighter truncate">{{ game.title }}</h4>
      <div class="flex items-center gap-3 sm:gap-4 mt-1 text-[9px] sm:text-[10px] font-bold text-black/40">
        <div class="flex items-center gap-1"><Clock class="w-3 h-3" /> {{ game.date }} • {{ game.time }}</div>
        <div class="flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          {{ game.spotsTaken }}/{{ game.spotsTotal }}
        </div>
      </div>
    </div>
    <div class="p-3 bg-black/5 group-hover:bg-[#C6FF00] group-hover:text-black rounded-full transition-all shrink-0">
      <ChevronRight class="w-5 h-5" />
    </div>
  </div>
</template>
