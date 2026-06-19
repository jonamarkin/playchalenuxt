<template>
  <div class="min-h-screen bg-[#FDFDFB]">
    <Header />
    <slot />
    <AppModalHost />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import AppModalHost from '@/components/AppModalHost.vue'
</script>
