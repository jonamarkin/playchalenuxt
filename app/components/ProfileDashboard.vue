<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronRight } from '@/components/ui/Icons'
import ImageUpload from '@/components/ImageUpload.vue'
import type { PlayerProfile } from '@/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const props = defineProps<{
  player: PlayerProfile
  isOwner?: boolean
}>()

const emit = defineEmits<{
  (e: 'editStats'): void
  (e: 'editProfile'): void
  (e: 'shareProfile'): void
  (e: 'viewMatch', match: any): void
}>()

const activeSport = ref(props.player.mainSport)

const activeStats = computed(() => {
  return props.player.sportStats?.[activeSport.value] || props.player.stats
})

const metrics = computed(() => [
  { label: 'Matches', value: activeStats.value?.gamesPlayed || 0, color: 'text-white' },
  { label: 'Win Rate', value: activeStats.value?.winRate || '0%', color: 'text-[#C6FF00]' },
  { label: 'Reliability', value: activeStats.value?.reliability || '0%', color: 'text-white' },
  { label: 'MVPs', value: activeStats.value?.mvps || 0, color: 'text-white' }
])

const sportSpecificHighlights = computed(() => {
  const s = activeStats.value
  if (!s) return []

  if (activeSport.value === 'Football') {
    return [
      { label: 'Goals', value: s.goals || 0 },
      { label: 'Assists', value: s.assists || 0 },
      { label: 'Clean Sheets', value: s.cleanSheets || 0 }
    ]
  }
  if (activeSport.value === 'Basketball') {
    return [
      { label: 'Total Points', value: s.points || 0 },
      { label: 'Rebounds', value: s.rebounds || 0 },
      { label: 'Steals', value: s.steals || 0 }
    ]
  }
  if (activeSport.value === 'Tennis') {
    return [
      { label: 'Sets Won', value: s.setsWon || 0 },
      { label: 'Aces', value: s.aces || 0 },
      { label: 'Win Streak', value: s.winStreak || 0 }
    ]
  }
  if (activeSport.value === 'Volleyball') {
    return [
      { label: 'Aces', value: s.aces || 0 },
      { label: 'Blocks', value: s.blocks || 0 },
      { label: 'Digs', value: s.digs || 0 }
    ]
  }
  if (activeSport.value === 'Swimming') {
    return [
      { label: 'Laps Swum', value: s.lapsSwum || 0 },
      { label: 'Meet Wins', value: s.meetWins || 0 },
      { label: 'Podiums', value: s.podiums || 0 }
    ]
  }
  if (activeSport.value === 'Athletics') {
    return [
      { label: 'PB Count', value: s.personalBests || 0 },
      { label: 'Meet Wins', value: s.meetWins || 0 },
      { label: 'Podiums', value: s.podiums || 0 }
    ]
  }
  return []
})

const filteredHistory = computed(() => {
  return (props.player.matchHistory || []).filter(m => m.sport === activeSport.value)
})

const onImageSelected = (file: File) => {
  // In a real app, this would upload the file to a server
  console.log('Selected image:', file.name)
}
</script>

<template>
  <section class="min-h-screen bg-black pt-24 md:pt-32 pb-20 md:pb-32 px-4 md:px-12 text-white overflow-hidden relative">
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-[#C6FF00]/5 to-transparent pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="flex flex-col lg:flex-row gap-8 md:gap-16 items-start">

        <div class="pc-view-enter w-full lg:w-[380px] shrink-0">
          <div class="bg-white/5 backdrop-blur-3xl rounded-[56px] p-8 md:p-10 border border-white/10 space-y-10 relative overflow-hidden shadow-2xl">
            <div class="flex flex-col items-center text-center space-y-6">
              <div class="relative">
                <template v-if="isOwner">
                  <ImageUpload
                    :current-image="player.avatar"
                    @image-selected="onImageSelected"
                  />
                </template>
                <template v-else>
                  <img :src="player.avatar" :alt="player.name" class="w-40 h-40 rounded-full object-cover border-[6px] border-white/5 shadow-2xl" />
                </template>
                <div class="absolute -bottom-1 -right-1 bg-[#C6FF00] text-black w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shadow-2xl uppercase italic">PRO</div>
              </div>
              <div>
                <h2 class="text-4xl font-black italic tracking-tighter uppercase leading-none">{{ player.name }}</h2>
                <p class="text-[#C6FF00] font-black uppercase tracking-[0.3em] text-[8px] mt-2">{{ player.mainSport }} Specialist</p>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 pt-4">
              <button
                v-if="isOwner"
                @click="emit('editProfile')"
                class="w-full bg-white/10 text-white py-6 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-white/20 transition-all border border-white/5 flex items-center justify-center gap-3 min-h-[64px]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                Edit Profile
              </button>
              <button
                @click="emit('shareProfile')"
                class="w-full bg-[#C6FF00] text-black py-6 rounded-full font-black uppercase tracking-widest text-[11px] hover:scale-105 transition-all flex items-center justify-center gap-3 min-h-[64px] shadow-xl shadow-lime-500/10"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
                Share Pro Card
              </button>
              <button
                v-if="isOwner"
                @click="emit('editStats')"
                class="w-full bg-white/5 text-white/60 py-4 rounded-full font-black uppercase tracking-widest text-[9px] hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                Update Season Stats
              </button>
            </div>
          </div>
        </div>

        <div class="flex-1 w-full">
          <div class="pc-fade-right space-y-16">
            <div class="space-y-10">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <h3 class="text-4xl sm:text-6xl md:text-8xl font-black leading-none italic tracking-tighter uppercase">Performance.</h3>

                <!-- Sport Selector -->
                <div class="w-full md:w-auto">
                  <Select v-model="activeSport">
                    <SelectTrigger class="w-full md:w-[180px] bg-white/5 border-white/10 text-white rounded-full h-12 px-6 font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all focus:ring-[#C6FF00]">
                      <SelectValue placeholder="Select Sport" />
                    </SelectTrigger>
                    <SelectContent class="bg-black border border-white/10 text-white rounded-xl">
                      <SelectItem
                        v-for="sport in Object.keys(player.sportStats || {})"
                        :key="sport"
                        :value="sport"
                        class="font-black uppercase tracking-widest text-[10px] focus:bg-[#C6FF00] focus:text-black py-3 cursor-pointer"
                      >
                        {{ sport }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div v-for="m in metrics" :key="m.label" class="bg-white/5 rounded-[40px] p-8 md:p-10 border border-white/10 group hover:bg-white/10 transition-all">
                  <span :class="`text-5xl sm:text-6xl md:text-8xl font-black italic tracking-tighter block leading-none mb-4 ${m.color}`">{{ m.value }}</span>
                  <span class="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/40">{{ m.label }}</span>
                </div>
              </div>
            </div>

            <!-- Sport Specific Highlights -->
            <div class="space-y-8">
              <h4 class="text-2xl font-black italic tracking-tight uppercase border-l-4 border-[#C6FF00] pl-4">{{ activeSport }} Highlights</h4>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div v-for="h in sportSpecificHighlights" :key="h.label" class="bg-white/5 rounded-[32px] p-8 border border-white/5 hover:border-[#C6FF00]/30 transition-all">
                  <span class="block text-4xl font-black text-[#C6FF00] italic mb-1">{{ h.value }}</span>
                  <span class="text-[10px] font-black uppercase tracking-widest text-white/30">{{ h.label }}</span>
                </div>
              </div>
            </div>

            <div class="space-y-8">
              <div class="flex justify-between items-center">
                <h4 class="text-2xl font-black italic tracking-tight uppercase">Recent Match Activity</h4>
                <button class="text-[#C6FF00] font-black uppercase tracking-widest text-[9px] border-b border-[#C6FF00] pb-1">View Full Log</button>
              </div>
              <div class="space-y-4">
                <template v-if="filteredHistory.length > 0">
                  <div v-for="(match, i) in filteredHistory" :key="i" @click="emit('viewMatch', match)" class="bg-white/5 hover:bg-white/10 transition-all rounded-[32px] p-8 border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 cursor-pointer group">
                    <div class="flex items-center gap-6">
                      <div class="w-16 h-16 bg-black border border-white/10 rounded-full flex items-center justify-center font-black text-xs text-[#C6FF00] italic uppercase">{{ match.date }}</div>
                      <div>
                        <h5 class="text-xl font-black tracking-tight mb-1">{{ match.title }}</h5>
                        <span :class="`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${match.result === 'Win' || match.result === 'W' ? 'text-[#C6FF00]' : 'text-red-500'}`">
                          <span :class="`w-2 h-2 rounded-full ${match.result === 'Win' || match.result === 'W' ? 'bg-[#C6FF00]' : 'bg-red-500'}`"></span>
                          {{ match.result }}
                        </span>
                      </div>
                    </div>
                    <div class="flex gap-12 items-center">
                      <div class="text-center">
                        <span class="block text-3xl font-black text-white italic">{{ match.score.split(' ')[0] }}</span>
                        <span class="text-[10px] font-black uppercase opacity-30 tracking-widest">{{ match.sport === 'Basketball' ? 'Points' : 'Goals' }}</span>
                      </div>
                      <div class="text-center">
                        <span class="block text-3xl font-black text-white italic">{{ match.rating }}</span>
                        <span class="text-[10px] font-black uppercase opacity-30 tracking-widest">Rating</span>
                      </div>
                      <div class="p-3 rounded-full bg-white/5 group-hover:bg-[#C6FF00] group-hover:text-black transition-all">
                        <ChevronRight />
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="text-center py-12 text-white/30 italic">No matches recorded for {{ activeSport }} yet.</div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
