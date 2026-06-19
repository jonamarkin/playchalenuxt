<script setup lang="ts">
import { computed } from 'vue'
import { SPORT_STATS } from '@/constants'

export interface PendingApproval {
  id: string
  game_id: string
  user_id: string
  stats: Record<string, any>
  showed_up: boolean
  games: {
    id: string
    title: string
    sport: string
    date: string
    time: string
    image_url: string
  }
  game_results: {
    result_data: Record<string, any>
    status: string
  }
}

const props = defineProps<{
  approval: PendingApproval
  userId: string
}>()

const emit = defineEmits<{
  (e: 'approved'): void
}>()

const sportConfig = computed(() => {
  const sport = props.approval.games?.sport || 'Football'
  return (SPORT_STATS[sport] || SPORT_STATS.Football)!
})

const gameResult = computed(() => props.approval.game_results?.result_data || {})

const isPending = false // mocked state for pending request

const handleApprove = () => {
  console.log('Approved stats for', props.approval.game_id)
  emit('approved')
}

const handleReject = () => {
  console.log('Rejected stats for', props.approval.game_id)
  emit('approved')
}
</script>

<template>
  <div v-if="approval.games" class="pc-view-enter bg-white border-2 border-black/5 rounded-[28px] overflow-hidden shadow-sm hover:shadow-lg transition-all">
    <!-- Header -->
    <div class="relative h-24 sm:h-32">
      <img
        :src="approval.games.image_url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018'"
        :alt="approval.games.title"
        class="object-cover w-full h-full"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div class="absolute bottom-3 left-4 right-4">
        <span class="bg-[#C6FF00] text-black px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">
          Pending Approval
        </span>
        <h4 class="text-white font-black italic uppercase tracking-tighter text-lg mt-1 truncate">
          {{ approval.games.title }}
        </h4>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 space-y-4 text-black">
      <!-- Game Result -->
      <div class="flex items-center justify-between pb-4 border-b border-black/5">
        <span class="text-xs font-black uppercase tracking-widest text-black/40">Final Score</span>
        <span class="text-xl font-black">
          {{ gameResult[sportConfig.gameResult[0]?.key || ''] || 0 }} - {{ gameResult[sportConfig.gameResult[1]?.key || ''] || 0 }}
        </span>
      </div>

      <!-- Your Stats -->
      <div class="space-y-3">
        <span class="text-xs font-black uppercase tracking-widest text-black/40">Your Stats</span>
        <div class="grid grid-cols-3 gap-3">
          <div v-for="stat in sportConfig.playerStats" :key="stat.key" class="bg-gray-50 rounded-xl p-3 text-center">
            <span class="text-2xl">{{ stat.icon }}</span>
            <p class="text-lg font-black mt-1">{{ approval.stats[stat.key] || 0 }}</p>
            <p class="text-[8px] font-bold uppercase tracking-widest text-black/40">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <!-- Attendance -->
      <div :class="['flex items-center gap-2 p-3 rounded-xl', approval.showed_up ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600']">
        <span class="text-lg">{{ approval.showed_up ? '✓' : '✗' }}</span>
        <span class="text-sm font-bold">
          {{ approval.showed_up ? 'Marked as Present' : 'Marked as No-Show' }}
        </span>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 pt-2">
        <button
          @click="handleReject"
          :disabled="isPending"
          class="flex-1 py-3 bg-gray-100 text-black rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-all disabled:opacity-50"
        >
          Dispute
        </button>
        <button
          @click="handleApprove"
          :disabled="isPending"
          class="flex-1 py-3 bg-[#C6FF00] text-black rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all disabled:opacity-50"
        >
          {{ isPending ? 'Approving...' : 'Approve' }}
        </button>
      </div>
    </div>
  </div>
</template>
