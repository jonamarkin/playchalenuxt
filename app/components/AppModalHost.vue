<script setup lang="ts">
import { useUI } from '@/composables/useUI'
import GameModal from '@/components/GameModal.vue'
import PostGameModal from '@/components/PostGameModal.vue'

const { activeModal, selectedItem, closeModal } = useUI()

const handleCreate = (gameData: any) => {
  console.log('Creating game', gameData)
  // Mock API call
}

const handleJoin = (gameId: string) => {
  console.log('Joining game', gameId)
  // Mock API call
}

const handleUpdateProfile = (playerId: string, data: any) => {
  console.log('Update profile', playerId, data)
}

const handleUpdateStats = (playerId: string, data: any) => {
  console.log('Update stats', playerId, data)
}
</script>

<template>
  <div>
    <Transition name="fade">
      <GameModal
        v-if="activeModal && activeModal !== 'post-game'"
        :type="activeModal"
        :item="selectedItem"
        @close="closeModal"
        @create="handleCreate"
        @join="handleJoin"
        @update-profile="handleUpdateProfile"
        @update-stats="handleUpdateStats"
      />
    </Transition>
    
    <Transition name="fade">
      <PostGameModal
        v-if="activeModal === 'post-game'"
        :game="selectedItem"
        user-id="me"
        @close="closeModal"
        @complete="closeModal"
      />
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
