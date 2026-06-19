<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TOP_PLAYERS } from '@/constants'
import ProfileDashboard from '@/components/ProfileDashboard.vue'

import { useUI } from '@/composables/useUI'

const route = useRoute()
const router = useRouter()
const { openModal } = useUI()

// Mocking authenticated user data for now
const currentUser = computed(() => TOP_PLAYERS[0])

const profileId = route.params.id as string
const isMe = profileId === 'me' || profileId === currentUser.value?.id

const playerData = computed(() => {
  if (isMe) return currentUser.value
  return TOP_PLAYERS.find(p => p.id === profileId)
})

const onShareProfile = () => {
  if (playerData.value) openModal('share-profile', playerData.value)
}

const onEditProfile = () => {
  if (playerData.value) openModal('edit-profile', playerData.value)
}

const onEditStats = () => {
  if (playerData.value) openModal('stats', playerData.value)
}

const onViewMatch = (match: any) => {
  router.push(`/game/${match.slug || match.id}`)
}
</script>

<template>
  <div class="pc-view-enter bg-black min-h-screen pt-24 md:pt-28">
    <ProfileDashboard
      v-if="playerData"
      :player="playerData"
      :is-owner="isMe"
      @share-profile="onShareProfile"
      @edit-profile="onEditProfile"
      @edit-stats="onEditStats"
      @view-match="onViewMatch"
    />
    <div v-else class="min-h-screen flex items-center justify-center text-white">
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-white/10 border-t-[#C6FF00] rounded-full animate-spin" />
        <p class="text-[10px] font-black uppercase tracking-widest text-white/50">Scouting Player...</p>
      </div>
    </div>
  </div>
</template>
