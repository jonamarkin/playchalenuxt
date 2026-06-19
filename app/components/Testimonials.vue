<script setup lang="ts">
import { TESTIMONIALS } from '@/constants'
import TestimonialCard from './TestimonialCard.vue'
</script>

<template>
  <section class="pc-content-visibility py-24 md:py-48 px-6 md:px-12 bg-white">
    <div class="max-w-7xl mx-auto">
      <div 
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center space-y-6 mb-24 md:mb-40"
      >
        <div class="inline-flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-black/30">
          <span class="w-3 h-3 rounded-full bg-[#C6FF00] shadow-[0_0_15px_#C6FF00]"></span>
          OUR COMMUNITY
        </div>
        <h2 class="text-6xl md:text-9xl font-black text-[#111111] leading-[0.85] tracking-tighter">
          Real Stories. <br class="hidden md:block" /> Real Growth.
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-16 md:gap-32">
        <div
          v-for="(testimonial, index) in TESTIMONIALS"
          :key="testimonial.id"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, delay: index * 300 } }"
        >
          <TestimonialCard :testimonial="testimonial" />
        </div>
      </div>
    </div>
  </section>
</template>
