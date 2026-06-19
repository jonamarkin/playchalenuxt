<script setup lang="ts">
import { Logo, ChevronRight, MapPin, Clock } from '@/components/ui/Icons'

const props = withDefaults(defineProps<{
  discoverHref?: string
}>(), {
  discoverHref: '/discover'
})

const tickerItems = [1, 2, 3]
const dummyPlayers = [1, 2, 3]
const nearbyGames = [
  { sport: 'Football', label: 'Dusk Kickoff', time: '19:00', spots: '3 Open', price: '$5' },
  { sport: 'Basketball', label: 'Full Court 5s', time: '20:30', spots: '6 Open', price: 'Free' }
]
</script>

<template>
  <section id="top" class="relative min-h-[90vh] md:min-h-screen bg-black text-white overflow-hidden rounded-b-[60px] md:rounded-b-[100px] z-10 flex flex-col justify-center">
    <!-- Navbar -->
    <nav class="absolute top-0 left-0 right-0 px-6 pt-10 md:px-12 md:pt-12 flex justify-start items-center z-50">
      <div 
        v-motion
        :initial="{ y: -20, opacity: 0 }"
        :enter="{ y: 0, opacity: 1, transition: { duration: 800, delay: 100 } }"
        class="flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-pointer"
      >
        <Logo />
        <span class="font-black text-2xl md:text-3xl tracking-tighter italic uppercase text-white drop-shadow-md">PlayChale.</span>
      </div>
    </nav>

    <!-- Background Layer -->
    <div class="absolute inset-0 z-0">
      <div 
        v-motion
        :initial="{ scale: 1.08, opacity: 0 }"
        :enter="{ scale: 1, opacity: 0.5, transition: { duration: 2000, ease: 'easeOut' } }"
        class="w-full h-full"
      >
        <img
          src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=2560"
          alt="Sports Action"
          class="object-cover w-full h-full"
        />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
    </div>

    <!-- Live Activity Ticker (Top Floating) -->
    <div class="absolute top-24 left-0 right-0 z-20 pointer-events-none hidden md:block overflow-hidden">
      <div class="flex whitespace-nowrap gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 animate-ticker">
        <template v-for="i in tickerItems" :key="i">
          <span class="flex items-center gap-3"><span class="w-1.5 h-1.5 rounded-full bg-[#C6FF00]"></span> Marcus J. scored 3 goals in 5v5</span>
          <span class="flex items-center gap-3"><span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Elena R. climbed to Rank #12 in Basketball</span>
          <span class="flex items-center gap-3"><span class="w-1.5 h-1.5 rounded-full bg-[#C6FF00]"></span> 15 games scheduled for this evening</span>
        </template>
      </div>
    </div>

    <div class="relative z-10 w-full px-6 md:px-12 pb-24 md:pb-36 pt-24 md:pt-16">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-8 text-white space-y-12">
          <div 
            v-motion
            :initial="{ y: 30, opacity: 0 }"
            :enter="{ y: 0, opacity: 1, transition: { duration: 800, delay: 200 } }"
            class="space-y-6"
          >
            <div class="inline-flex items-center gap-3 bg-[#C6FF00] text-black px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(198,255,0,0.3)]">
              <span class="w-2 h-2 rounded-full bg-black animate-ping"></span>
              ACTIVE IN YOUR CITY
            </div>
            <h1 class="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter italic drop-shadow-2xl">
              <span class="whitespace-nowrap">Step Out,</span> <br /> 
              <span class="text-transparent bg-clip-text bg-gradient-to-br from-[#C6FF00] to-[#8eb800] whitespace-nowrap drop-shadow-[0_0_40px_rgba(198,255,0,0.4)]">PlayChale.</span>
            </h1>
          </div>

          <div 
            v-motion
            :initial="{ y: 30, opacity: 0 }"
            :enter="{ y: 0, opacity: 1, transition: { duration: 800, delay: 600 } }"
            class="flex flex-col sm:flex-row items-center gap-8"
          >
            <NuxtLink
              :to="discoverHref"
              class="pc-btn-press touch-target w-full sm:w-auto bg-[#C6FF00] text-black px-8 py-4 md:px-12 md:py-6 rounded-full font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(198,255,0,0.3)] hover:shadow-[0_0_60px_rgba(198,255,0,0.6)] transition-all duration-500 group"
            >
              Discover Games
              <div class="pc-icon-kick bg-black text-white rounded-full p-1 group-hover:rotate-12 transition-transform">
                <ChevronRight />
              </div>
            </NuxtLink>

            <div class="flex items-center gap-5">
              <div class="flex -space-x-3">
                <img
                  v-for="i in dummyPlayers"
                  :key="i"
                  class="w-10 h-10 rounded-full border-4 border-black"
                  :src="`https://i.pravatar.cc/100?u=${i + 10}`"
                  alt="user"
                />
              </div>
              <div class="text-left">
                <p class="text-[11px] font-black uppercase tracking-widest text-white">482 Players Active</p>
                <p class="text-[9px] font-black uppercase tracking-widest text-[#C6FF00]">Live in your vicinity</p>
              </div>
            </div>
          </div>
        </div>

        <div 
          v-motion
          :initial="{ x: 50, opacity: 0 }"
          :enter="{ x: 0, opacity: 1, transition: { duration: 800, delay: 900, type: 'spring' } }"
          class="lg:col-span-4 hidden lg:flex flex-col gap-6"
        >
          <div class="pc-card-lift glass rounded-[48px] p-8 border border-white/10 space-y-6 shadow-2xl relative overflow-hidden group">
            <div class="absolute top-0 right-0 p-6 opacity-10 rotate-12 group-hover:rotate-12 transition-transform duration-[2000ms]">
              <Logo />
            </div>

            <div class="flex justify-between items-center">
              <h4 class="text-[10px] font-black uppercase tracking-widest text-[#C6FF00]">Happening Nearby</h4>
              <MapPin />
            </div>

            <div class="space-y-4">
              <div 
                v-for="(item, i) in nearbyGames"
                :key="i" 
                class="pc-choice-card bg-white/5 p-5 rounded-[24px] border border-white/5 hover:bg-white/10 hover:scale-[1.02] transition-all cursor-pointer group/item"
              >
                <div class="flex justify-between items-center mb-2">
                  <span class="text-[9px] font-black text-white/60 uppercase tracking-widest">{{ item.sport }}</span>
                  <span class="text-[9px] font-black text-[#C6FF00] uppercase tracking-widest bg-[#C6FF00]/10 px-2 py-0.5 rounded">{{ item.spots }}</span>
                </div>
                <h5 class="text-lg font-black italic uppercase text-white group-hover/item:text-[#C6FF00] transition-colors">{{ item.label }}</h5>
                <div class="mt-3 flex items-center justify-between">
                  <div class="flex items-center gap-2 text-[10px] font-black uppercase text-white/50 tracking-widest">
                    <Clock /> {{ item.time }} Tonight
                  </div>
                  <span class="text-sm font-black italic text-white">{{ item.price }}</span>
                </div>
              </div>
            </div>

            <NuxtLink :to="discoverHref" class="pc-btn-press touch-target block text-center w-full py-3 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-all">
              Browse All Games
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes ticker {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
.animate-ticker {
  animation: ticker 30s linear infinite;
}
</style>
