<script setup lang="ts">
import { ref } from 'vue'
import { X } from '@/components/ui/Icons'

const props = defineProps<{
  game: any
  userId: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'complete'): void
}>()

const step = ref<'attendance' | 'result' | 'review'>('attendance')
const loading = ref(false)

const gameResult = ref({ home: 0, away: 0 })

const onSubmit = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    emit('complete')
  }, 1500)
}
</script>

<template>
  <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
    <div class="absolute inset-0" @click="emit('close')" />

    <div class="relative bg-white rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col text-black">
      <!-- Header -->
      <div class="bg-black text-white p-6 relative">
        <button @click="emit('close')" class="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-all">
          <X class="w-5 h-5" />
        </button>
        <p class="text-[9px] font-black uppercase tracking-widest text-[#C6FF00] mb-2">Post-Game Report</p>
        <h2 class="text-2xl font-black italic uppercase tracking-tighter">{{ game?.title || 'Game Title' }}</h2>
      </div>

      <!-- Content -->
      <div class="p-6 overflow-y-auto max-h-[50vh] flex-1">
        <div v-if="step === 'attendance'" class="space-y-6">
          <h3 class="text-lg font-black uppercase tracking-tighter">Who showed up?</h3>
          <p class="text-sm text-black/50">Mark players who attended the game.</p>
          <div class="p-8 text-center text-black/30 font-bold uppercase text-xs tracking-widest bg-gray-50 rounded-2xl">
            Attendance checked implicitly for all.
          </div>
        </div>

        <div v-else-if="step === 'result'" class="space-y-6">
          <h3 class="text-lg font-black uppercase tracking-tighter">Final Score</h3>
          <div class="grid grid-cols-2 gap-6 mt-6">
            <div class="space-y-2">
              <label class="text-xs font-black uppercase tracking-widest text-black/50">Team A</label>
              <input type="number" v-model="gameResult.home" class="w-full text-center text-4xl font-black p-4 bg-gray-50 rounded-2xl border-2 border-black/10 focus:border-[#C6FF00] focus:outline-none" />
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black uppercase tracking-widest text-black/50">Team B</label>
              <input type="number" v-model="gameResult.away" class="w-full text-center text-4xl font-black p-4 bg-gray-50 rounded-2xl border-2 border-black/10 focus:border-[#C6FF00] focus:outline-none" />
            </div>
          </div>
        </div>

        <div v-else-if="step === 'review'" class="space-y-6">
          <h3 class="text-lg font-black uppercase tracking-tighter">Review & Submit</h3>
          <div class="bg-gray-50 rounded-2xl p-4 space-y-4">
            <div class="flex justify-between items-center pb-3 border-b border-black/5">
              <span class="font-bold">Final Score</span>
              <span class="text-xl font-black">{{ gameResult.home }} - {{ gameResult.away }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t border-black/5 flex gap-3">
        <button v-if="step !== 'attendance'" @click="step = step === 'review' ? 'result' : 'attendance'" class="flex-1 py-4 bg-gray-100 text-black rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-all">
          Back
        </button>
        <button v-if="step !== 'review'" @click="step = step === 'attendance' ? 'result' : 'review'" class="flex-1 py-4 bg-black text-[#C6FF00] rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all">
          Continue
        </button>
        <button v-else @click="onSubmit" :disabled="loading" class="flex-1 py-4 bg-[#C6FF00] text-black rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all disabled:opacity-50">
          {{ loading ? 'Submitting...' : 'Submit for Approval' }}
        </button>
      </div>
    </div>
  </div>
</template>
