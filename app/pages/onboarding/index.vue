<script setup lang="ts">
import { useRouter } from 'vue-router'
import Onboarding from '@/components/Onboarding.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleComplete = (data: any) => {
  console.log('Onboarding complete', data)
  authStore.completeOnboarding(data)
}

const handleSkip = () => {
  router.push('/discover')
}
</script>

<template>
  <div class="pc-view-enter">
    <Onboarding 
      @complete="handleComplete" 
      @skip="handleSkip" 
    />
  </div>
</template>
