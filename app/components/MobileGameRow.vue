<script setup lang="ts">
import { computed } from 'vue'
import type { Game } from '@/types'
import { Clock, MapPin } from '@/components/ui/Icons'

const props = defineProps<{
  game: Game
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const openSpots = computed(() => Math.max(0, props.game.spotsTotal - props.game.spotsTaken))
const isFull = computed(() => openSpots.value === 0)
</script>

<template>
  <button
    type="button"
    @click="emit('click')"
    class="pc-card-lift touch-target group w-full rounded-[30px] border border-black/5 bg-white p-3 text-left shadow-sm"
  >
    <div class="flex gap-4">
      <div class="relative h-28 w-28 shrink-0 overflow-hidden rounded-[24px] bg-black">
        <img
          :src="game.imageUrl"
          :alt="game.title"
          class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span :class="['absolute bottom-2 left-2 rounded-full px-2.5 py-1 text-[8px] font-black uppercase tracking-widest', isFull ? 'bg-red-500 text-white' : 'bg-[#C6FF00] text-black']">
          {{ isFull ? 'Full' : `${openSpots} open` }}
        </span>
      </div>

      <div class="flex min-w-0 flex-1 flex-col py-1">
        <div class="mb-2 flex items-center justify-between gap-3">
          <span class="rounded-full bg-black/5 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-black/45">
            {{ game.sport }}
          </span>
          <span class="text-[10px] font-black uppercase tracking-widest text-black">
            {{ game.price }}
          </span>
        </div>

        <h3 class="line-clamp-2 text-lg font-black italic uppercase leading-[0.95] tracking-tighter text-black">
          {{ game.title }}
        </h3>

        <div class="mt-auto space-y-1.5 pt-3 text-[9px] font-black uppercase tracking-widest text-black/40">
          <div class="flex items-center gap-2">
            <Clock class="w-3 h-3 shrink-0" />
            <span class="truncate">{{ game.date }} · {{ game.time }}</span>
          </div>
          <div class="flex items-center gap-2">
            <MapPin class="w-3 h-3 shrink-0" />
            <span class="truncate">{{ game.location }}</span>
          </div>
        </div>
      </div>
    </div>
  </button>
</template>
