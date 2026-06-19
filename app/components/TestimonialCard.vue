<script setup lang="ts">
import type { Testimonial } from '@/types'
import { ArrowUp } from '@/components/ui/Icons'

defineProps<{
  testimonial: Testimonial
}>()

</script>

<template>
  <div class="group grid grid-cols-1 lg:grid-cols-12 gap-0 md:gap-4 h-auto bg-[#F5F5F0] rounded-[64px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700">
    <!-- Quote Section -->
    <div class="lg:col-span-5 p-10 md:p-16 flex flex-col justify-between">
      <div class="space-y-8">
        <div class="text-[#C6FF00]">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H19.017C21.2261 3 23.017 4.79086 23.017 7V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1 21L1 18C1 16.8954 1.89543 16 3 16H6C6.55228 16 7 15.5523 7 15V9C7 8.44772 6.55228 8 6 8H3C1.89543 8 1 7.10457 1 6V5C1 3.89543 1.89543 3 3 3H6C8.20914 3 10 4.79086 10 7V15C10 18.3137 7.31371 21 4 21H1Z" /></svg>
        </div>
        <p class="text-2xl md:text-3xl font-extrabold leading-tight text-black tracking-tight">
          "{{ testimonial.content }}"
        </p>
      </div>
      <div class="mt-12 flex items-center gap-4">
        <div class="h-px w-8 bg-black/20"></div>
        <span class="font-black uppercase tracking-[0.2em] text-sm text-black/40">
          {{ testimonial.author }}
        </span>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="lg:col-span-3 bg-black/5 p-10 md:p-16 flex flex-col justify-between items-start border-y lg:border-y-0 lg:border-x border-white/40">
      <div class="flex items-center gap-4">
        <img
          :src="testimonial.imageUrl"
          :alt="testimonial.trainer"
          class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
        />
        <div>
          <h4 class="font-black text-sm tracking-tight">{{ testimonial.trainer }}</h4>
          <span class="text-[10px] font-bold text-black/40 uppercase tracking-[0.2em]">{{ testimonial.trainerRole }}</span>
        </div>
      </div>

      <div class="mt-12 lg:mt-0 space-y-4">
        <div class="flex items-end gap-3 group/stat">
          <span class="text-8xl font-black tracking-tighter leading-none group-hover/stat:text-[#C6FF00] transition-colors duration-500">
            {{ testimonial.statValue }}
          </span>
          <div class="mb-2 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg group-hover/stat:scale-110 transition-transform">
            <ArrowUp />
          </div>
        </div>
        <p class="text-xs font-black text-black/40 uppercase tracking-widest leading-relaxed max-w-[140px]">
          {{ testimonial.statLabel }}
        </p>
      </div>
    </div>

    <!-- Image Section -->
    <div class="lg:col-span-4 p-4 lg:p-6 h-80 lg:h-auto">
      <div class="w-full h-full relative overflow-hidden rounded-[48px]">
        <img
          :src="testimonial.imageUrl"
          alt="Academy Life"
          class="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-[2000ms]"
        />
        <div class="absolute inset-0 bg-black/10"></div>
      </div>
    </div>
  </div>
</template>
