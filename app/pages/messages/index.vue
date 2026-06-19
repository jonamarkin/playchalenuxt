<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { MESSAGES, GAMES, TOP_PLAYERS } from '@/constants'
import MessageCenter from '@/components/MessageCenter.vue'
import Header from '@/components/Header.vue'

const router = useRouter()

// Mock user state
const hasProfile = true
const archivedIds = ref<string[]>([])

// Filter messages based on what's not archived
const activeMessages = computed(() => {
  return MESSAGES.filter(m => !archivedIds.value.includes(m.id))
})

const hostedGames = computed(() => {
  return GAMES.filter(g => g.organizer?.includes('Alex') || g.organizer === 'Me')
})

const onReadMessage = (id: string) => {
  // Mock marking as read
}

const onArchiveMessage = (id: string) => {
  archivedIds.value.push(id)
}

const onSendReply = (payload: { gameId: string, content: string, recipientId: string }) => {
  console.log('Sending reply:', payload)
}

const onUpdateChallenge = (payload: { challengeId: string, status: 'accepted' | 'declined' }) => {
  console.log('Update challenge:', payload)
}
</script>

<template>
  <div class="pc-view-enter">
    <MessageCenter 
      :messages="activeMessages"
      :hosted-games="hostedGames"
      @read-message="onReadMessage"
      @archive-message="onArchiveMessage"
      @send-reply="onSendReply"
      @update-challenge="onUpdateChallenge"
    />
  </div>
</template>
