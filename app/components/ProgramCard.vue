<script setup lang="ts">
import type { Program } from '@/types'

const props = defineProps<{
  program: Program
  href: string
}>()

const isPrimary = computed(() => props.program.accentColor === '#C6FF00')

</script>

<template>
  <NuxtLink
    :to="href"
    class="pc-card-lift touch-target w-[300px] md:w-[400px] h-[580px] md:h-[680px] rounded-[56px] flex flex-col p-8 md:p-12 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_40px_80px_rgba(0,0,0,0.05)] relative overflow-hidden group"
    :style="{ backgroundColor: isPrimary ? '#C6FF00' : '#F5F5F0' }"
  >
    <div class="absolute top-[-40px] right-[-40px] opacity-[0.03] group-hover:rotate-12 transition-transform duration-[2000ms] pointer-events-none">
      <svg class="w-80 h-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12a10 10 0 0 1 10-10" />
        <path d="M12 22a10 10 0 0 1 10-10" />
      </svg>
    </div>

    <div class="relative z-10 flex flex-col gap-2 mb-12">
      <div class="flex flex-wrap gap-2">
        <span class="bg-white/95 backdrop-blur-sm px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
          {{ program.ageRange }}
        </span>
        <span 
          class="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm"
          :class="isPrimary ? 'bg-black text-white' : 'bg-white/95'"
        >
          {{ program.category }}
        </span>
      </div>
    </div>

    <div class="relative z-10 mb-8">
      <h3 class="text-5xl md:text-6xl font-black text-black mb-6 leading-[0.85] tracking-tighter">
        {{ program.title }}
      </h3>
      <p class="text-base md:text-lg text-black/50 font-bold leading-tight max-w-[280px]">
        {{ program.description }}
      </p>
    </div>

    <div class="mt-auto relative rounded-[48px] overflow-hidden h-72 md:h-80 shadow-2xl group-hover:scale-[1.02] transition-transform duration-700">
      <img
        :src="program.imageUrl"
        :alt="program.title"
        class="object-cover w-full h-full grayscale-[0.4] group-hover:grayscale-0 transition-all duration-700"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      <div class="absolute bottom-6 left-6 right-6">
        <span class="pc-btn-press w-full bg-white/20 backdrop-blur-2xl border border-white/20 text-white rounded-full py-5 px-8 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] group-hover:bg-white/40 transition-all">
          Full Details
          <div class="pc-icon-kick bg-[#C6FF00] text-black w-7 h-7 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
