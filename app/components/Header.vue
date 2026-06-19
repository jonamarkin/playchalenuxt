<script setup lang="ts">
import { Logo } from '@/components/ui/Icons'

withDefaults(defineProps<{
  position?: 'absolute' | 'sticky' | 'relative'
}>(), {
  position: 'absolute'
})
</script>

<template>
  <header 
    :class="[
      'left-0 right-0 z-50 flex justify-between items-center px-6 py-6 md:px-12 md:py-8',
      position === 'sticky' ? 'sticky top-0 bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 
      position === 'absolute' ? 'absolute top-0 pt-10 md:pt-12' : 
      'relative bg-black'
    ]"
  >
    <!-- Logo -->
    <NuxtLink to="/" class="flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-pointer">
      <Logo />
      <span class="font-black text-2xl md:text-3xl tracking-tighter italic uppercase text-white drop-shadow-md">PlayChale.</span>
    </NuxtLink>

    <!-- Navigation -->
    <nav class="hidden md:flex items-center gap-10">
      <NuxtLink to="/discover" active-class="text-[#C6FF00]" class="text-white/60 hover:text-white font-black uppercase text-[11px] tracking-[0.2em] transition-colors">Discover</NuxtLink>
      <NuxtLink to="/community" active-class="text-[#C6FF00]" class="text-white/60 hover:text-white font-black uppercase text-[11px] tracking-[0.2em] transition-colors">Community</NuxtLink>
    </nav>

    <!-- Actions -->
    <div class="flex items-center gap-4">
      <button class="pc-btn-press bg-white text-black px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#C6FF00] transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">Sign In</button>
    </div>
  </header>
</template>
