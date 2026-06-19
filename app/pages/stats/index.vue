<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { TOP_PLAYERS } from '@/constants'
import ProfileDashboard from '@/components/ProfileDashboard.vue'

const router = useRouter()

// Mocking authenticated user data for now
const currentUser = computed(() => TOP_PLAYERS[0])

const onShareProfile = () => {
  if (import.meta.client) {
    const url = window.location.origin + `/profile/${currentUser.value?.id || 'me'}`
    navigator.clipboard.writeText(url)
    alert('PROFILE LINK COPIED TO CLIPBOARD')
  }
}

const onViewMatch = (match: any) => {
  router.push(`/game/${match.slug || match.id}`)
}
</script>

<template>
  <div class="pc-view-enter bg-black min-h-screen pt-24 md:pt-28">
    <ProfileDashboard
      v-if="currentUser"
      :player="currentUser"
      :is-owner="true"
      @share-profile="onShareProfile"
      @view-match="onViewMatch"
    />
    <div v-else class="min-h-screen flex items-center justify-center text-white">
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-white/10 border-t-[#C6FF00] rounded-full animate-spin" />
        <p class="text-[10px] font-black uppercase tracking-widest text-white/50">Loading Identity...</p>
      </div>
    </div>
  </div>
</template>
