<script setup lang="ts">
import { ref, computed } from 'vue'
import { Logo, ChevronRight, MapPin } from '@/components/ui/Icons'

const emit = defineEmits<{
  (e: 'complete', data: any): void
  (e: 'skip'): void
}>()

const step = ref(1)
const isLoading = ref(false)

const data = ref({
  name: '',
  sports: [] as string[],
  level: '',
  location: '',
  email: '',
  password: ''
})

const SPORTS = [
  { name: 'Football', icon: '⚽' },
  { name: 'Basketball', icon: '🏀' },
  { name: 'Tennis', icon: '🎾' },
  { name: 'Volleyball', icon: '🏐' },
  { name: 'Swimming', icon: '🏊' },
  { name: 'Athletics', icon: '🏃' }
]

const LEVELS = [
  { name: 'Beginner', label: 'Just starting out', intensity: 'Rookie' },
  { name: 'Intermediate', label: 'Weekend warrior', intensity: 'Semi-Pro' },
  { name: 'Competitive', label: 'Play to win', intensity: 'Pro' }
]

const LEVEL_CONFIG: Record<string, any> = {
  'Beginner': { matches: '0', rivals: '12', grade: 'Bronze', drive: 'Rookie' },
  'Intermediate': { matches: '24', rivals: '156', grade: 'Silver', drive: 'Semi-Pro' },
  'Competitive': { matches: '89', rivals: '482', grade: 'Gold', drive: 'Pro' }
}

const TOTAL_STEPS = 6

const nextStep = () => {
  if (step.value < TOTAL_STEPS) step.value++
}

const prevStep = () => {
  if (step.value > 1) step.value--
}

const toggleSport = (sport: string) => {
  if (data.value.sports.includes(sport)) {
    data.value.sports = data.value.sports.filter(s => s !== sport)
  } else {
    data.value.sports.push(sport)
  }
}

const handleFinalSign = (e: Event) => {
  e.preventDefault()
  setIsLoading(true)
  setTimeout(() => {
    setIsLoading(false)
    emit('complete', data.value)
  }, 1500)
}

const handleSocialAuth = (provider: string) => {
  setIsLoading(true)
  setTimeout(() => {
    setIsLoading(false)
    data.value.name = data.value.name || 'Google Athlete'
    data.value.sports = data.value.sports.length ? data.value.sports : ['Football']
    data.value.level = data.value.level || 'Intermediate'
    data.value.location = data.value.location || 'Accra'
    emit('complete', data.value)
  }, 1500)
}

const setIsLoading = (val: boolean) => {
  isLoading.value = val
}

const handleLocationEnter = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && data.value.location) nextStep()
}

const handleNameEnter = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && data.value.name) nextStep()
}
</script>

<template>
  <div class="fixed inset-0 z-[150] bg-black text-white flex flex-col overflow-hidden">
    <!-- Background Ambience -->
    <div class="absolute inset-0 pointer-events-none opacity-20">
      <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C6FF00]/10 blur-[150px] rounded-full -mr-40 -mt-40"></div>
      <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full -ml-40 -mb-40"></div>
    </div>

    <!-- Progress Bar -->
    <div class="absolute top-0 left-0 right-0 h-1.5 bg-white/5 flex z-50">
      <div
        class="h-full bg-[#C6FF00] shadow-[0_0_20px_#C6FF00] transition-all duration-500"
        :style="{ width: `${(step / TOTAL_STEPS) * 100}%` }"
      />
    </div>

    <header class="p-6 md:p-10 flex justify-between items-center relative z-20 bg-gradient-to-b from-black to-transparent">
      <div class="flex items-center gap-4">
        <button
          v-if="step > 1 && step < TOTAL_STEPS"
          @click="prevStep"
          class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all mr-2"
        >
          <div class="rotate-180 scale-125"><ChevronRight /></div>
        </button>
        <div class="flex items-center gap-3">
          <Logo />
          <span class="font-black text-xl md:text-2xl tracking-tighter italic uppercase">PRO DRAFT.</span>
        </div>
      </div>
      <div v-if="step < TOTAL_STEPS" class="flex items-center gap-4">
        <NuxtLink
          to="/login"
          class="text-[#C6FF00] text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors border border-[#C6FF00]/30 px-4 py-2 rounded-full hover:bg-[#C6FF00]/10"
        >
          Sign In
        </NuxtLink>
        <button
          @click="emit('skip')"
          class="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] hover:text-white transition-colors"
        >
          Exit Draft
        </button>
      </div>
    </header>

    <div class="flex-1 overflow-y-auto px-6 py-12 relative z-10 hide-scrollbar">
      <div class="max-w-6xl mx-auto flex flex-col items-center justify-center min-h-full">
        <Transition name="fade" mode="out-in">
          <!-- STEP 1 -->
          <div v-if="step === 1" class="w-full space-y-12 text-center" key="step1">
            <div class="space-y-4">
              <span class="text-[10px] font-black uppercase tracking-[0.5em] text-[#C6FF00]">PHASE 01: ARENA</span>
              <h2 class="text-4xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.85]">Select your <br /> disciplines.</h2>
              <p class="text-white/40 text-[10px] uppercase tracking-widest">Select all that apply</p>
            </div>

            <div class="flex flex-col items-center gap-8">
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 w-full max-w-4xl">
                <button
                  v-for="s in SPORTS"
                  :key="s.name"
                  @click="toggleSport(s.name)"
                  :class="[
                    'group border-2 p-6 md:p-10 rounded-[32px] md:rounded-[48px] hover:scale-105 transition-all duration-500 flex flex-col items-center gap-3 md:gap-6',
                    data.sports.includes(s.name) ? 'bg-[#C6FF00] border-[#C6FF00] text-black scale-105' : 'bg-white/5 border-white/5 hover:bg-white/10 text-white'
                  ]"
                >
                  <span :class="['text-3xl md:text-5xl transition-transform', data.sports.includes(s.name) ? 'scale-125' : 'group-hover:scale-125']">{{ s.icon }}</span>
                  <span class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">{{ s.name }}</span>
                </button>
              </div>

              <button
                @click="nextStep"
                :disabled="data.sports.length === 0"
                class="px-12 py-6 rounded-full bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-[#C6FF00] disabled:opacity-30 disabled:hover:bg-white transition-all w-full md:w-auto"
              >
                Confirm Selection ({{ data.sports.length }})
              </button>
            </div>
          </div>

          <!-- STEP 2 -->
          <div v-else-if="step === 2" class="w-full space-y-12 text-center" key="step2">
            <div class="space-y-4">
              <span class="text-[10px] font-black uppercase tracking-[0.5em] text-[#C6FF00]">PHASE 02: LEVEL</span>
              <h2 class="text-4xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.85]">What's your <br /> level?</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl mx-auto">
              <button
                v-for="l in LEVELS"
                :key="l.name"
                @click="data.level = l.name; nextStep()"
                class="group bg-white/5 border-2 border-white/5 p-8 md:p-12 rounded-[40px] md:rounded-[56px] hover:bg-white hover:text-black transition-all duration-500 text-left relative overflow-hidden"
              >
                <div class="absolute top-0 right-0 p-6 md:p-8 opacity-10 group-hover:opacity-30 transition-all font-black italic text-2xl md:text-4xl">{{ l.intensity }}</div>
                <h3 class="text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-2">{{ l.name }}</h3>
                <p class="text-[10px] md:text-xs font-bold opacity-40 group-hover:opacity-60">{{ l.label }}</p>
              </button>
            </div>
          </div>

          <!-- STEP 3 -->
          <div v-else-if="step === 3" class="w-full space-y-12 text-center" key="step3">
            <div class="space-y-4">
              <span class="text-[10px] font-black uppercase tracking-[0.5em] text-[#C6FF00]">PHASE 03: REGION</span>
              <h2 class="text-4xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.85]">Where do <br /> you play?</h2>
            </div>

            <div class="max-w-md mx-auto w-full px-4">
              <div class="relative group w-full">
                <div class="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C6FF00] transition-colors z-10"><MapPin /></div>
                <input
                  type="text"
                  placeholder="Enter your city..."
                  v-model="data.location"
                  @keydown="handleLocationEnter"
                  autofocus
                  class="w-full bg-white/5 border-2 border-white/10 rounded-full pl-16 pr-8 py-6 text-base md:text-xl font-black outline-none focus:border-[#C6FF00] transition-all focus-visible:ring-0 placeholder:text-white/20"
                />
              </div>
              <p class="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Press enter to lock region</p>
            </div>
          </div>

          <!-- STEP 4 -->
          <div v-else-if="step === 4" class="w-full space-y-12 text-center" key="step4">
            <div class="space-y-4">
              <span class="text-[10px] font-black uppercase tracking-[0.5em] text-[#C6FF00]">PHASE 04: IDENTITY</span>
              <h2 class="text-4xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.85]">The Athlete <br /> Signature.</h2>
            </div>

            <div class="max-w-md mx-auto w-full px-4">
              <div class="relative group w-full">
                <div class="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C6FF00] transition-colors z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </div>
                <input
                  type="text"
                  placeholder="Name or Username..."
                  v-model="data.name"
                  @keydown="handleNameEnter"
                  autofocus
                  class="w-full bg-white/5 border-2 border-white/10 rounded-full pl-16 pr-8 py-6 text-base md:text-xl font-black outline-none focus:border-[#C6FF00] transition-all focus-visible:ring-0 placeholder:text-white/20"
                />
              </div>
              <p class="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">This is how you'll be known in the Arena</p>
            </div>
          </div>

          <!-- STEP 5 -->
          <div v-else-if="step === 5" class="w-full bg-white/5 border border-white/10 p-6 md:p-20 rounded-[40px] md:rounded-[80px] text-center space-y-8 md:space-y-12 relative overflow-hidden" key="step5">
            <div class="absolute top-0 right-0 p-20 opacity-5 rotate-12 hidden md:block"><Logo /></div>

            <div class="space-y-4 md:space-y-6">
              <span class="bg-[#C6FF00] text-black px-4 md:px-6 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest">DRAFT REPORT: {{ data.name.toUpperCase() }}</span>
              <h2 class="text-3xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.85]">Welcome to <br class="hidden md:block" /> the Elite.</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-left w-full">
              <div class="p-6 md:p-8 bg-black border border-white/10 rounded-[32px] md:rounded-[40px] shadow-2xl">
                <p class="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">Projected Matches</p>
                <p class="text-4xl md:text-5xl font-black italic text-[#C6FF00]">{{ LEVEL_CONFIG[data.level]?.matches || '0' }}</p>
                <p class="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/30 mt-2 truncate">In {{ data.location }}</p>
              </div>
              <div class="p-6 md:p-8 bg-black border border-white/10 rounded-[32px] md:rounded-[40px] shadow-2xl">
                <p class="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">Potential Rivals</p>
                <p class="text-4xl md:text-5xl font-black italic text-[#C6FF00]">{{ LEVEL_CONFIG[data.level]?.rivals || '0' }}</p>
                <p class="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/30 mt-2">Active {{ data.sports.join(', ') }}</p>
              </div>
              <div class="p-6 md:p-8 bg-black border border-white/10 rounded-[32px] md:rounded-[40px] shadow-2xl">
                <p class="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">Starting Tier</p>
                <p class="text-4xl md:text-5xl font-black italic text-[#C6FF00]">{{ LEVEL_CONFIG[data.level]?.grade || 'Bronze' }}</p>
                <p class="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/30 mt-2 truncate">Level: {{ LEVEL_CONFIG[data.level]?.drive || data.level }}</p>
              </div>
            </div>

            <div class="flex flex-col md:flex-row items-center justify-center gap-6 pt-6 md:pt-10">
              <button @click="nextStep" class="w-full md:w-auto h-auto bg-[#C6FF00] text-black px-12 py-5 md:py-6 rounded-full font-black uppercase tracking-widest text-[10px] md:text-[11px] shadow-2xl shadow-lime-500/20 hover:scale-105 hover:bg-[#b0ff00] transition-all">Sign Athlete Contract</button>
            </div>
          </div>

          <!-- STEP 6 -->
          <div v-else-if="step === 6" class="max-w-2xl w-full flex flex-col items-center space-y-8 md:space-y-12 mx-auto" key="step6">
            <div class="text-center space-y-4">
              <span class="text-[10px] font-black uppercase tracking-[0.5em] text-[#C6FF00]">PHASE 06: COMMISSIONING</span>
              <h2 class="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.85]">Finalize <br /> Credentials.</h2>
              <p class="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest">Commissioning profile for {{ data.name }}</p>
            </div>

            <div v-if="isLoading" class="flex flex-col items-center gap-6 py-20">
              <div class="w-16 h-16 border-4 border-white/10 border-t-[#C6FF00] rounded-full animate-spin"></div>
              <p class="text-[10px] font-black uppercase tracking-[0.3em] text-[#C6FF00] animate-pulse">Commissioning Athlete...</p>
            </div>
            <div v-else class="w-full space-y-8 md:space-y-10">
              <div class="grid grid-cols-1 gap-4">
                <button
                  @click="handleSocialAuth('google')"
                  class="bg-white text-black p-5 rounded-full flex items-center justify-center gap-4 hover:bg-gray-200 transition-all group"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.172-1.224 1.224-3.136 2.584-6.392 2.584-5.112 0-9.216-4.144-9.216-9.256s4.104-9.256 9.216-9.256c2.784 0 4.888 1.104 6.384 2.504l2.312-2.312c-2.128-2.024-4.88-3.192-8.696-3.192-7.392 0-13.432 6.04-13.432 13.432s6.04 13.432 13.432 13.432c4.016 0 7.04-1.32 9.424-3.792 2.448-2.448 3.216-5.888 3.216-8.544 0-.816-.064-1.584-.2-2.312h-12.42z" /></svg>
                  <span class="text-[10px] font-black uppercase tracking-widest">Google</span>
                </button>
              </div>

              <div class="flex items-center gap-4 py-2">
                <div class="h-px bg-white/10 flex-1"></div>
                <span class="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">OR DIRECT SIGNING</span>
                <div class="h-px bg-white/10 flex-1"></div>
              </div>

              <form @submit="handleFinalSign" class="space-y-4">
                <div class="space-y-2">
                  <label class="text-[9px] font-black uppercase tracking-widest text-white/30 ml-4">Athlete Email</label>
                  <input
                    type="email"
                    required
                    placeholder="scout@academy.pro"
                    v-model="data.email"
                    class="w-full bg-white/5 border-2 border-white/5 focus:border-[#C6FF00] rounded-full px-8 py-5 text-base font-bold outline-none transition-all placeholder:text-white/20"
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-[9px] font-black uppercase tracking-widest text-white/30 ml-4">Secret Access Code</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    v-model="data.password"
                    class="w-full bg-white/5 border-2 border-white/5 focus:border-[#C6FF00] rounded-full px-8 py-5 text-base font-bold outline-none transition-all placeholder:text-white/20"
                  />
                </div>

                <button
                  type="submit"
                  class="w-full bg-white text-black py-6 rounded-full font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-[#C6FF00] transition-all mt-6"
                >
                  Commission Account
                </button>
              </form>

              <p class="text-[8px] font-black text-center text-white/20 uppercase tracking-[0.2em] leading-relaxed">
                By commissioning, you agree to our Pro-Athlete terms of conduct <br /> and amateur eligibility guidelines.
              </p>

              <div class="pt-6 text-center border-t border-white/5">
                <p class="text-white/40 text-xs font-bold">
                  Already have an account?
                  <NuxtLink to="/login" class="text-[#C6FF00] hover:underline font-black uppercase tracking-wider ml-1">
                    Sign In
                  </NuxtLink>
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
    
    <footer class="p-6 md:p-10 flex justify-center opacity-20 relative z-20 bg-gradient-to-t from-black to-transparent">
      <p class="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-center">© 2026 PLAYCHALE ATHLETE MANAGEMENT SYSTEM</p>
    </footer>
  </div>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
