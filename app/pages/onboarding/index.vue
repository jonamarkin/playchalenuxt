<script setup lang="ts">
import { useRouter } from 'vue-router'
import Onboarding from '@/components/Onboarding.vue'

const router = useRouter()

const completeOnboarding = (data: any) => {
  console.log('Onboarding Complete:', data)
  // Mock login and redirect
  router.push('/home')
}

const handleNavigate = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="pc-view-enter">
    <Onboarding 
      @complete="completeOnboarding" 
      @skip="handleNavigate('/discover')" 
    />
  </div>
</template>
