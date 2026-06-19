<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Game } from '@/types'
import { ChevronRight } from '@/components/ui/Icons'

const props = defineProps<{
  games: Game[]
  selectedDate: string | null
}>()

const emit = defineEmits<{
  (e: 'select', date: string): void
}>()

const currentMonth = ref(new Date())

const daysInMonth = computed(() => new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1, 0).getDate())
const firstDayOfMonth = computed(() => new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth(), 1).getDay())
const monthName = computed(() => currentMonth.value.toLocaleString('default', { month: 'long' }))
const monthShort = computed(() => monthName.value.substring(0, 3))

const days = computed(() => Array.from({ length: daysInMonth.value }, (_, i) => i + 1))
const blanks = computed(() => Array.from({ length: firstDayOfMonth.value }, (_, i) => i))

const prevMonth = () => {
  currentMonth.value = new Date(currentMonth.value.setMonth(currentMonth.value.getMonth() - 1))
}

const nextMonth = () => {
  currentMonth.value = new Date(currentMonth.value.setMonth(currentMonth.value.getMonth() + 1))
}

const gameMatchesDay = (gameDate: string, day: number) => {
  if (gameDate === 'Today') {
    const today = new Date()
    return day === today.getDate() &&
      currentMonth.value.getMonth() === today.getMonth() &&
      currentMonth.value.getFullYear() === today.getFullYear()
  }
  const hasMonth = gameDate.includes(monthShort.value)
  const dayMatch = gameDate.match(/\s(\d{1,2})$/)
  const dayString = dayMatch?.[1]
  const hasDay = dayString ? parseInt(dayString) === day : false
  return hasMonth && hasDay
}

const getGameCountForDay = (day: number) => {
  return props.games.filter(g => gameMatchesDay(g.date, day)).length
}

const gamesThisMonth = computed(() => {
  return props.games.filter(g => {
    if (g.date === 'Today') {
      const today = new Date()
      return currentMonth.value.getMonth() === today.getMonth() && currentMonth.value.getFullYear() === today.getFullYear()
    }
    return g.date.includes(monthShort.value)
  }).length
})

const nextMonthWithGames = computed(() => {
  if (gamesThisMonth.value > 0) return null
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  for (let i = 1; i <= 12; i++) {
    const checkDate = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + i, 1)
    const checkMonthShort = months[checkDate.getMonth()] as string
    const gamesInMonth = props.games.filter(g => g.date.includes(checkMonthShort)).length
    if (gamesInMonth > 0) {
      return { date: checkDate, monthName: checkDate.toLocaleString('default', { month: 'long' }), count: gamesInMonth }
    }
  }
  return null
})

const handleSelect = (day: number) => {
  const dayStr = day.toString()
  emit('select', props.selectedDate === dayStr ? "" : dayStr)
}

const isToday = (day: number) => {
  const today = new Date()
  return day === today.getDate() && currentMonth.value.getMonth() === today.getMonth() && currentMonth.value.getFullYear() === today.getFullYear()
}
</script>

<template>
  <div class="bg-black text-white p-6 md:p-10 rounded-[48px] shadow-2xl">
    <div class="flex justify-between items-center mb-10">
      <h3 class="text-3xl font-black italic tracking-tighter uppercase">{{ monthName }} {{ currentMonth.getFullYear() }}</h3>
      <div class="flex gap-3">
        <button @click="prevMonth" class="p-3 hover:bg-white/10 rounded-full transition-colors border border-white/10"><ChevronRight class="rotate-180" /></button>
        <button @click="nextMonth" class="p-3 hover:bg-white/10 rounded-full transition-colors border border-white/10"><ChevronRight /></button>
      </div>
    </div>

    <div class="grid grid-cols-7 gap-2 md:gap-3 mb-4">
      <div v-for="d in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="d" class="text-center text-[10px] font-black uppercase tracking-widest text-white/30 py-2">
        {{ d }}
      </div>
    </div>

    <div class="grid grid-cols-7 gap-2 md:gap-3">
      <div v-for="b in blanks" :key="`b-${b}`" class="aspect-square"></div>
      
      <button
        v-for="d in days"
        :key="d"
        @click="handleSelect(d)"
        :class="[
          'aspect-square rounded-2xl md:rounded-[28px] flex flex-col items-center justify-center gap-1 transition-all relative border',
          selectedDate === d.toString() 
            ? 'bg-[#C6FF00] text-black border-[#C6FF00] scale-105 shadow-lg shadow-[#C6FF00]/30 z-10' 
            : isToday(d) 
              ? 'bg-white/10 border-[#C6FF00]/50' 
              : getGameCountForDay(d) > 0 
                ? 'bg-white/5 border-white/10 hover:border-[#C6FF00]/50 hover:bg-white/10' 
                : 'bg-white/5 border-white/5 hover:border-white/20'
        ]"
      >
        <span :class="['text-sm md:text-lg font-black', isToday(d) && selectedDate !== d.toString() ? 'text-[#C6FF00]' : '']">{{ d }}</span>
        
        <div v-if="getGameCountForDay(d) > 0 && selectedDate !== d.toString()" class="flex items-center gap-0.5">
          <div v-for="i in Math.min(getGameCountForDay(d), 3)" :key="i" :class="['w-1.5 h-1.5 rounded-full bg-[#C6FF00]', isToday(d) ? 'animate-pulse' : '']"></div>
          <span v-if="getGameCountForDay(d) > 3" class="text-[8px] font-black text-[#C6FF00] ml-0.5">+{{ getGameCountForDay(d) - 3 }}</span>
        </div>
        
        <span v-if="selectedDate === d.toString() && getGameCountForDay(d) > 0" class="text-[9px] font-black uppercase">
          {{ getGameCountForDay(d) }} Game{{ getGameCountForDay(d) > 1 ? 's' : '' }}
        </span>
      </button>
    </div>

    <!-- No games this month - show next available -->
    <div v-if="gamesThisMonth === 0" class="mt-8 p-6 bg-white/5 border border-white/10 rounded-[32px] text-center">
      <p class="text-white/40 text-sm font-bold mb-4">No games scheduled in {{ monthName }}</p>
      <button
        v-if="nextMonthWithGames"
        @click="currentMonth = nextMonthWithGames.date"
        class="inline-flex items-center gap-3 bg-[#C6FF00] text-black px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all"
      >
        <span>⚡</span>
        Jump to {{ nextMonthWithGames.monthName }} ({{ nextMonthWithGames.count }} games)
        <ChevronRight />
      </button>
      <p v-else class="text-white/20 text-xs font-bold uppercase tracking-widest">No upcoming games found</p>
    </div>
  </div>
</template>
