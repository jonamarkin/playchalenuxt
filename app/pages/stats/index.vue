<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import ProfileDashboard from '@/components/ProfileDashboard.vue'

import { useUI } from '@/composables/useUI'

const router = useRouter()
const { openModal } = useUI()

const authStore = useAuthStore()
const { profile } = storeToRefs(authStore)
const currentUser = computed(() => profile.value)

const onShareProfile = () => {
  openModal('share-profile', currentUser.value)
}

const onEditProfile = () => {
  openModal('edit-profile', currentUser.value)
}

const onEditStats = () => {
  openModal('stats', currentUser.value)
}

const onViewMatch = (match: any) => {
  router.push(`/game/${match.slug || match.id}`)
}
</script>

<template>
  <div class="pc-view-enter bg-black min-h-screen">
    <ProfileDashboard
      v-if="currentUser"
      :player="currentUser"
      :is-owner="true"
      @share-profile="onShareProfile"
      @edit-profile="onEditProfile"
      @edit-stats="onEditStats"
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
