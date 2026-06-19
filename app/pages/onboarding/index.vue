<script setup lang="ts">
import { useRouter } from 'vue-router'
import Onboarding from '@/components/Onboarding.vue'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { completeOnboarding } = useAuth()

const handleComplete = (data: any) => {
  console.log('Onboarding complete', data)
  completeOnboarding(data)
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
