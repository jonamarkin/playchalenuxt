<template>
  <div class="min-h-screen bg-[#FDFDFB]">
    <Header />
    <slot />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>
