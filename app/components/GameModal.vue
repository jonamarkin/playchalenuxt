<script setup lang="ts">
import { ref, computed } from 'vue'
import { X, ChevronRight, MapPin, Clock } from '@/components/ui/Icons'
import { GAMES, TOP_PLAYERS } from '@/constants'
import type { ModalType } from '@/composables/useUI'

const props = defineProps<{
  type: ModalType
  item?: any
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'create', data: any): void
  (e: 'join', id: string): void
  (e: 'update-profile', id: string, data: any): void
  (e: 'update-stats', id: string, data: any): void
  (e: 'contact-organizer', data: any): void
  (e: 'challenge', data: any): void
}>()

const step = ref(1)
const loading = ref(false)
const history = ref<{type: ModalType, item: any}[]>([])

const currentType = ref<ModalType>(props.type)
const currentItem = ref<any>(props.item)

const pushView = (type: ModalType, item: any = currentItem.value) => {
  history.value.push({ type: currentType.value, item: currentItem.value })
  currentType.value = type
  currentItem.value = item
}

const goBack = () => {
  if (history.value.length > 0) {
    const last = history.value.pop()!
    currentType.value = last.type
    currentItem.value = last.item
  }
}

// Forms
const createForm = ref({
  sport: 'Football', title: '', location: '', time: '18:00', date: '', spotsTotal: 10, skillLevel: 'All Levels', price: '$5'
})
const profileForm = ref({
  name: currentItem.value?.name || '', mainSport: currentItem.value?.mainSport || 'Football'
})
const statsForm = ref({ ...currentItem.value?.attributes })
const contactMessage = ref('')
const challengeMsg = ref('')

const isDarkTheme = computed(() => ['join', 'create', 'contact-organizer', 'share-profile', 'match-detail', 'profile', 'challenge', 'detailed-stats', 'manage-game', 'edit-profile', 'stats'].includes(currentType.value as string))

const onSubmit = (action: string) => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    if (action === 'create') emit('create', createForm.value)
    else if (action === 'join') emit('join', currentItem.value?.id)
    else if (action === 'profile') emit('update-profile', currentItem.value?.id, profileForm.value)
    else if (action === 'stats') emit('update-stats', currentItem.value?.id, statsForm.value)
    else if (action === 'contact') emit('contact-organizer', contactMessage.value)
    else if (action === 'challenge') emit('challenge', challengeMsg.value)
    
    step.value = 2
    setTimeout(() => emit('close'), 2000)
  }, 1000)
}
</script>

<template>
  <div class="fixed inset-0 z-[200] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/95 backdrop-blur-2xl" @click="emit('close')" />

    <div :class="[
      'relative w-full max-w-2xl rounded-[40px] md:rounded-[56px] shadow-2xl overflow-y-auto max-h-[90vh] p-6 md:p-12 hide-scrollbar transition-all duration-300 transform scale-100 opacity-100',
      isDarkTheme ? 'bg-black border border-white/10 text-white' : 'bg-white text-black'
    ]">
      <!-- Header Actions -->
      <div class="absolute top-6 right-6 md:top-8 md:right-8 flex gap-2 md:gap-3 z-20">
        <button v-if="history.length > 0" @click="goBack" :class="['w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all', isDarkTheme ? 'bg-white/10 text-white hover:bg-[#C6FF00] hover:text-black' : 'bg-gray-100 text-black hover:bg-black hover:text-white']">
          <ChevronRight class="rotate-180 w-5 h-5" />
        </button>
        <button @click="emit('close')" :class="['w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all', isDarkTheme ? 'bg-white/10 text-white hover:bg-[#C6FF00] hover:text-black' : 'bg-gray-100 text-black hover:bg-black hover:text-white']">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Success Step -->
      <div v-if="step === 2" class="py-12 text-center space-y-6">
        <div class="w-20 h-20 md:w-24 md:h-24 bg-[#C6FF00] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-lime-500/20">
          <svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h2 :class="['text-3xl md:text-4xl font-black tracking-tighter italic uppercase', isDarkTheme ? 'text-[#C6FF00]' : 'text-black']">
          Success!
        </h2>
        <p :class="['font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px]', isDarkTheme ? 'text-white/60' : 'text-black/60']">
          Action complete.
        </p>
      </div>

      <!-- Main Step -->
      <div v-else class="space-y-6 md:space-y-8">
        <!-- Title Header -->
        <div class="space-y-2">
          <div class="flex items-center gap-3">
            <span :class="['text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] px-4 md:px-5 py-1.5 rounded-full inline-block', isDarkTheme ? 'bg-[#C6FF00] text-black' : 'bg-black text-white']">
              {{ currentType?.replace('-', ' ') }}
            </span>
          </div>
          <h2 class="text-4xl md:text-6xl font-black tracking-tighter leading-tight italic uppercase">
            {{ currentType === 'create' ? 'Host a Match' : (currentItem?.title || currentItem?.name || 'Action') }}
          </h2>
        </div>

        <!-- CREATE -->
        <form v-if="currentType === 'create'" @submit.prevent="onSubmit('create')" class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[9px] font-black uppercase tracking-widest text-white/30 ml-4">Discipline</label>
              <select v-model="createForm.sport" class="w-full bg-white/5 border-2 border-white/5 focus:border-[#C6FF00] rounded-full px-6 py-4 text-white font-bold outline-none transition-all appearance-none">
                <option value="Football">Football</option>
                <option value="Basketball">Basketball</option>
                <option value="Tennis">Tennis</option>
                <option value="Padel">Padel</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-[9px] font-black uppercase tracking-widest text-white/30 ml-4">Match Title</label>
              <input v-model="createForm.title" required placeholder="Saturday Night 5v5" class="w-full bg-white/5 border-2 border-white/5 focus:border-[#C6FF00] rounded-full px-6 py-4 text-white font-bold outline-none transition-all placeholder:text-white/20" />
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-[9px] font-black uppercase tracking-widest text-white/30 ml-4">Location</label>
            <input v-model="createForm.location" required placeholder="City Sports Arena" class="w-full bg-white/5 border-2 border-white/5 focus:border-[#C6FF00] rounded-full px-6 py-4 text-white font-bold outline-none transition-all placeholder:text-white/20" />
          </div>
          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[9px] font-black uppercase tracking-widest text-white/30 ml-4">Time</label>
              <input v-model="createForm.time" type="time" required class="w-full bg-white/5 border-2 border-white/5 focus:border-[#C6FF00] rounded-full px-6 py-4 text-white font-bold outline-none transition-all" />
            </div>
            <div class="space-y-2">
              <label class="text-[9px] font-black uppercase tracking-widest text-white/30 ml-4">Max Capacity</label>
              <input v-model="createForm.spotsTotal" type="number" required min="2" class="w-full bg-white/5 border-2 border-white/5 focus:border-[#C6FF00] rounded-full px-6 py-4 text-white font-bold outline-none transition-all" />
            </div>
          </div>
          <button type="submit" :disabled="loading" class="w-full bg-[#C6FF00] text-black py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:scale-[1.02] transition-all shadow-xl disabled:opacity-50">
            {{ loading ? 'Publishing...' : 'Publish Match to Feed' }}
          </button>
        </form>

        <!-- JOIN -->
        <div v-else-if="currentType === 'join'" class="space-y-8">
          <div class="relative h-48 md:h-64 rounded-[32px] overflow-hidden bg-white/10">
            <img :src="currentItem?.imageUrl" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div class="absolute bottom-6 left-6">
              <p class="text-white text-xs font-black uppercase tracking-widest">{{ currentItem?.sport }}</p>
              <p class="text-[#C6FF00] text-sm font-black">{{ currentItem?.price }}</p>
            </div>
          </div>
          <div class="space-y-4">
            <div class="flex items-center gap-3 text-white/80"><Clock class="w-5 h-5"/> <span class="font-bold">{{ currentItem?.date }} • {{ currentItem?.time }}</span></div>
            <div class="flex items-center gap-3 text-white/80"><MapPin class="w-5 h-5"/> <span class="font-bold">{{ currentItem?.location }}</span></div>
          </div>
          <button @click="onSubmit('join')" :disabled="loading" class="w-full bg-[#C6FF00] text-black py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:scale-[1.02] transition-all shadow-xl disabled:opacity-50">
            {{ loading ? 'Processing...' : 'Join This Match' }}
          </button>
        </div>

        <!-- PROFILE / SHARE-PROFILE -->
        <div v-else-if="currentType === 'profile' || currentType === 'share-profile'" class="space-y-8 text-center">
          <img :src="currentItem?.avatar" class="w-32 h-32 mx-auto rounded-full border-4 border-[#C6FF00] object-cover" />
          <h3 class="text-3xl font-black italic uppercase">{{ currentItem?.name }}</h3>
          <p class="text-[#C6FF00] font-black uppercase tracking-widest text-xs">{{ currentItem?.mainSport }} Elite</p>
          <div class="flex justify-center gap-8 py-4 border-y border-white/10">
            <div><span class="block text-2xl font-black text-white italic">{{ currentItem?.stats?.rating || 'N/A' }}</span><span class="text-[8px] font-black uppercase text-white/30">Rating</span></div>
            <div><span class="block text-2xl font-black text-white italic">{{ currentItem?.stats?.winRate || 'N/A' }}</span><span class="text-[8px] font-black uppercase text-white/30">Win Rate</span></div>
          </div>
          <div class="grid grid-cols-2 gap-4" v-if="currentType === 'profile'">
            <button @click="pushView('detailed-stats')" class="bg-white/5 py-4 rounded-full font-black uppercase text-[10px] hover:bg-white/10 transition-all">Detailed Stats</button>
            <button @click="pushView('challenge')" class="bg-[#C6FF00] text-black py-4 rounded-full font-black uppercase text-[10px] hover:scale-105 transition-all shadow-xl">Issue Challenge</button>
          </div>
          <div v-else>
            <button class="w-full bg-[#C6FF00] text-black py-5 rounded-full font-black uppercase tracking-widest text-[11px] shadow-xl hover:scale-[1.02] transition-all">
              Copy Pro Profile Link
            </button>
          </div>
        </div>

        <!-- EDIT PROFILE -->
        <form v-else-if="currentType === 'edit-profile'" @submit.prevent="onSubmit('profile')" class="space-y-8">
          <div class="space-y-2">
            <label class="text-[9px] font-black uppercase tracking-widest text-white/30 ml-4">Full Name</label>
            <input v-model="profileForm.name" required class="w-full bg-white/5 border-2 border-white/5 focus:border-[#C6FF00] rounded-full px-6 py-4 text-white font-bold outline-none transition-all placeholder:text-white/20" />
          </div>
          <div class="space-y-2">
            <label class="text-[9px] font-black uppercase tracking-widest text-white/30 ml-4">Main Discipline</label>
            <select v-model="profileForm.mainSport" class="w-full bg-white/5 border-2 border-white/5 focus:border-[#C6FF00] rounded-full px-6 py-4 text-white font-bold outline-none transition-all appearance-none">
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
              <option value="Tennis">Tennis</option>
              <option value="Padel">Padel</option>
            </select>
          </div>
          <button type="submit" :disabled="loading" class="w-full bg-[#C6FF00] text-black py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:scale-[1.02] transition-all shadow-xl disabled:opacity-50">
            {{ loading ? 'Saving...' : 'Update Profile' }}
          </button>
        </form>

        <!-- STATS -->
        <form v-else-if="currentType === 'stats'" @submit.prevent="onSubmit('stats')" class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-white/5 p-8 rounded-[40px] border border-white/10">
            <div v-for="(val, key) in statsForm" :key="key" class="space-y-3">
              <div class="flex justify-between items-center px-2">
                <label class="text-[10px] font-black uppercase tracking-widest text-white/40">{{ key }}</label>
                <span class="text-sm font-black text-[#C6FF00]">{{ val }}</span>
              </div>
              <input type="range" min="0" max="99" v-model.number="statsForm[key]" class="w-full h-1.5 bg-white/10 rounded-full appearance-none accent-[#C6FF00] cursor-pointer" />
            </div>
          </div>
          <button type="submit" :disabled="loading" class="w-full bg-[#C6FF00] text-black py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:scale-[1.02] transition-all shadow-xl disabled:opacity-50">
            {{ loading ? 'Saving...' : 'Update Pro Stats' }}
          </button>
        </form>

        <!-- CHALLENGE -->
        <form v-else-if="currentType === 'challenge'" @submit.prevent="onSubmit('challenge')" class="space-y-8">
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Challenge Message</label>
            <textarea v-model="challengeMsg" required placeholder="Drop some trash talk or match rules..." class="w-full h-32 bg-white/5 border-2 border-white/5 focus:border-[#C6FF00] rounded-[32px] p-6 text-white font-bold placeholder:text-white/20 outline-none transition-all resize-none" />
          </div>
          <button type="submit" :disabled="loading" class="w-full bg-[#C6FF00] text-black py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:scale-[1.02] transition-all shadow-xl disabled:opacity-50">
            {{ loading ? 'Issuing...' : 'Send Challenge Request' }}
          </button>
        </form>

        <!-- FALLBACK -->
        <div v-else class="text-center py-12 text-white/50 font-black uppercase tracking-widest text-sm">
          View Details
        </div>
      </div>
    </div>
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
</style>
