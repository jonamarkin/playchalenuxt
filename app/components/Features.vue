<script setup lang="ts">
import { Users, Calendar, TrendingUp, Star, Clock, UserPlus } from '@lucide/vue'

const features = [
  {
    icon: Users,
    title: "Connect with players",
    subtitle: "Find athletes in your local area",
    stat: "12.5K",
    label: "Active Players"
  },
  {
    icon: Calendar,
    title: "Create & join games",
    subtitle: "Instant match organization",
    stat: "342",
    label: "Live Games"
  },
  {
    icon: TrendingUp,
    title: "Track performance",
    subtitle: "Data-driven growth analytics",
    stat: "2.8K",
    label: "Matches Today"
  },
  {
    icon: Star,
    title: "Build your legacy",
    subtitle: "Showcase skills & badges",
    stat: "45",
    label: "Avg Games/Mo"
  },
  {
    icon: Clock,
    title: "Real-time updates",
    subtitle: "Never miss a local kickoff",
    stat: "24/7",
    label: "Live Support"
  },
  {
    icon: UserPlus,
    title: "Join communities",
    subtitle: "Niche sport circles & squads",
    stat: "156",
    label: "Tribes"
  }
]
</script>

<template>
  <section class="pc-content-visibility relative py-24 md:py-40 bg-[#FDFDFB] overflow-hidden">
    <!-- Background Watermark Text -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full select-none pointer-events-none overflow-hidden opacity-[0.03]">
      <h2 
        v-motion
        :initial="{ x: '10%' }"
        :visible="{ x: '-10%', transition: { duration: 10000, ease: 'linear' } }"
        class="text-[20rem] md:text-[35rem] font-black italic tracking-tighter leading-none text-black whitespace-nowrap"
      >
        DOMINATE DOMINATE DOMINATE
      </h2>
    </div>

    <div class="relative z-10 px-4 md:px-12 max-w-7xl mx-auto">
      <div class="flex flex-col lg:flex-row items-end justify-between mb-16 md:mb-28 gap-8">
        <div 
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="space-y-6 max-w-3xl"
        >
          <div class="inline-flex items-center gap-3 bg-black text-white px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.4em]">
            <span class="w-1.5 h-1.5 rounded-full bg-[#C6FF00] animate-pulse"></span>
            CORE ADVANTAGE
          </div>
          <h2 class="text-5xl md:text-8xl font-black tracking-tighter italic leading-[0.85] uppercase text-black">
            Everything <br /> you need to <span class="text-[#C6FF00] bg-black px-4 inline-block transform -rotate-1">Win.</span>
          </h2>
        </div>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
          class="text-lg md:text-xl text-black/40 font-bold max-w-md tracking-tight leading-tight lg:text-right"
        >
          Stop settling for casual. PlayChale gives you the pro tools to organize, compete, and climb the local ranks.
        </p>
      </div>

      <!-- Features Scroll Area -->
      <div class="flex lg:grid lg:grid-cols-3 gap-6 md:gap-10 overflow-x-auto lg:overflow-visible pb-12 lg:pb-0 hide-scrollbar snap-x snap-mandatory lg:snap-none">
        <div
          v-for="(feature, index) in features"
          :key="index"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, delay: index * 150 } }"
          class="pc-card-lift min-w-[300px] lg:min-w-0 bg-white hover:bg-black border border-black/10 hover:border-white/20 rounded-[48px] p-10 flex flex-col transition-all duration-500 snap-center relative group hover:-translate-y-2"
        >
          <!-- Highlight bar on hover -->
          <div class="absolute top-0 left-10 right-10 h-1 bg-[#C6FF00] rounded-b-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

          <div class="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-[#C6FF00] transition-colors duration-500">
            <div class="text-black transition-transform duration-500 group-hover:scale-[1.02]">
              <component :is="feature.icon" :size="32" :stroke-width="2" />
            </div>
          </div>

          <div class="space-y-3 mb-12">
            <h3 class="font-black text-2xl md:text-3xl leading-none tracking-tighter italic uppercase text-black group-hover:text-white transition-colors">
              {{ feature.title }}
            </h3>
            <p class="text-sm font-bold tracking-tight text-black/30 group-hover:text-white/40 transition-colors">
              {{ feature.subtitle }}
            </p>
          </div>

          <div class="mt-auto pt-8 border-t border-black/10 group-hover:border-white/20 flex items-end justify-between transition-colors">
            <div>
              <div class="text-4xl md:text-5xl font-black italic tracking-tighter text-black group-hover:text-white leading-none mb-1 transition-colors">
                {{ feature.stat }}
              </div>
              <div class="text-[10px] font-black uppercase tracking-[0.2em] text-black/20 group-hover:text-white/20 transition-colors">
                {{ feature.label }}
              </div>
            </div>
            <div class="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-black/10 group-hover:text-[#C6FF00] group-hover:border-[#C6FF00] transition-all group-hover:rotate-12">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Call to Action -->
      <div 
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :visibleOnce="{ opacity: 1, scale: 1, transition: { duration: 500, delay: 400 } }"
        class="mt-20 md:mt-32 text-center"
      >
        <div class="inline-block p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
          <div class="flex items-center gap-2 px-6 py-3">
            <div class="flex -space-x-3">
              <img v-for="i in 4" :key="i" class="w-8 h-8 rounded-full border-2 border-white" :src="`https://i.pravatar.cc/100?u=${i}`" alt="user" />
            </div>
            <p class="text-[11px] font-black uppercase tracking-widest text-black/60">
              Join <span class="text-black">5,000+</span> athletes in your area
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
