<script setup lang="ts">
import { useRouter } from 'vue-router'
import Onboarding from '@/components/Onboarding.vue'

const router = useRouter()

const handleComplete = (data: any) => {
  console.log('Onboarding complete', data)
  router.push('/discover')
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
