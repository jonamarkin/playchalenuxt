<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Logo, Plus, Menu, X } from '@/components/ui/Icons'
import { TOP_PLAYERS } from '@/constants'

const router = useRouter()
const route = useRoute()

const isMenuOpen = ref(false)
const scrolled = ref(false)

// For mock purposes
const user = computed(() => TOP_PLAYERS[0])

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navItems = [
  { label: 'Home', id: 'home', path: '/home' },
  { label: 'Discover', id: 'discover', path: '/discover' },
  { label: 'Community', id: 'community', path: '/community' },
  { label: 'My Stats', id: 'stats', path: '/stats' },
  { label: 'Inbox', id: 'messages', path: '/messages' }
]

const activeView = computed(() => {
  if (route.path === '/') return 'landing'
  return route.path.split('/')[1] || 'home'
})

const isLanding = computed(() => activeView.value === 'landing')
// Only use transparent dark theme when on the landing page hero and not scrolled
const headerTheme = computed(() => (isLanding.value && !scrolled.value) ? 'dark' : 'light')

const isActive = (id: string) => {
  if (id === 'home') return activeView.value === 'home' || activeView.value === 'landing'
  return activeView.value === id
}

const onNavigate = (path: string) => {
  router.push(path)
  isMenuOpen.value = false
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const onOpenCreate = () => {
  // Mock Create Game
  alert('Open Create Game Modal')
}

const signOut = () => {
  // Mock sign out
  router.push('/')
}
</script>

<template>
  <div>
    <header :class="[
      'fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-8 py-3 md:py-4 flex justify-between items-center',
      headerTheme === 'light' ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100' : 'bg-transparent'
    ]">
      <div class="flex items-center gap-3 md:gap-6">
        <div
          class="pc-fade-left flex items-center gap-3 md:gap-4 cursor-pointer group"
          @click="onNavigate('/')"
        >
          <Logo />
          <span :class="['hidden sm:block font-black text-xl tracking-tighter transition-colors duration-300', headerTheme === 'light' ? 'text-black' : 'text-white']">
            PlayChale
          </span>
        </div>

        <nav
          :class="['pc-fade-left hidden lg:flex transition-all duration-300 rounded-full px-2 py-1 gap-1 items-center border shadow-sm', headerTheme === 'light' ? 'bg-black/5 border-black/10' : 'bg-white/10 border-white/20 backdrop-blur-md']"
        >
          <button
            v-for="item in navItems"
            :key="item.id"
            @click="onNavigate(item.path)"
            :class="[
              'px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all',
              isActive(item.id) 
                ? (headerTheme === 'light' ? 'bg-black text-white' : 'bg-[#C6FF00] text-black shadow-lg shadow-lime-500/20') 
                : (headerTheme === 'light' ? 'text-black/70 hover:text-black hover:bg-black/5' : 'text-white/80 hover:text-white hover:bg-white/10')
            ]"
          >
            {{ item.label }}
          </button>
        </nav>
      </div>

      <div class="pc-fade-right flex items-center gap-2 md:gap-3">
        <button
          @click="onOpenCreate"
          :class="['transition-all duration-300 px-3 sm:px-5 md:px-7 py-2 md:py-2.5 rounded-full flex items-center gap-2 md:gap-3 group shadow-lg', headerTheme === 'light' ? 'bg-black text-white hover:bg-[#C6FF00] hover:text-black' : 'bg-[#C6FF00] text-black hover:bg-white']"
        >
          <span class="hidden sm:block text-[10px] md:text-xs font-black uppercase tracking-widest">Create Game</span>
          <div :class="['rounded-full p-1 transition-transform group-hover:translate-x-1', headerTheme === 'light' ? 'bg-white/10' : 'bg-black/10']">
            <Plus class="w-4 h-4" />
          </div>
        </button>

        <button
          @click="isMenuOpen = !isMenuOpen"
          :class="['backdrop-blur-md w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full shadow-sm transition-all border active:scale-90', headerTheme === 'light' ? 'bg-white/90 border-gray-100 text-black' : 'bg-white/10 border-white/20 text-white']"
        >
          <X v-if="isMenuOpen" class="w-5 h-5" />
          <Menu v-else class="w-5 h-5" />
        </button>
      </div>
    </header>

    <div
      v-if="isMenuOpen"
      class="pc-slide-panel fixed inset-0 z-[110] bg-black text-white flex flex-col p-8 pt-32"
    >
      <div class="flex justify-between items-center absolute top-8 left-8 right-8">
        <div class="flex items-center gap-4 cursor-pointer" @click="onNavigate('/')">
          <Logo />
          <span class="font-black text-2xl tracking-tighter italic uppercase">PLAYCHALE.</span>
        </div>
        <button @click="isMenuOpen = false" class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="space-y-8 mt-12 overflow-y-auto">
        <button
          v-for="(item, idx) in navItems"
          :key="item.id"
          @click="onNavigate(item.path)"
          class="block text-5xl md:text-7xl font-black italic tracking-tighter hover:text-[#C6FF00] transition-all text-left group w-full"
        >
          <span class="text-xs not-italic opacity-30 mr-6">0{{ idx + 1 }}</span>
          {{ item.label }}
        </button>

        <button
          v-if="user"
          @click="signOut"
          class="block text-5xl md:text-7xl font-black italic tracking-tighter text-red-500 hover:text-red-400 transition-all text-left mt-8 group w-full"
        >
          <span class="text-xs not-italic opacity-30 mr-6 text-white">0{{ navItems.length + 1 }}</span>
          Log Out
        </button>
      </div>
    </div>
  </div>
</template>
