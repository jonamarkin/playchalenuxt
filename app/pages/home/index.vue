<script setup lang="ts">
import { computed } from 'vue'
import AppDashboard from '@/components/AppDashboard.vue'
import { GAMES, TOP_PLAYERS } from '@/constants'

// Mocking authenticated user data for now (since we don't have a real backend)
const currentUser = computed(() => TOP_PLAYERS[0] as NonNullable<(typeof TOP_PLAYERS)[0]>)

const upcomingGames = computed(() => GAMES.slice(0, 3))

// Mocking my games
const myGames = computed(() => ({
  hostedGames: GAMES.filter(g => g.organizer === currentUser.value.name || g.organizer.includes(currentUser.value.name.split(' ')[0]!)),
  joinedGames: GAMES.filter(g => g.participants?.some(p => p.id === currentUser.value.id))
}))

const risingStars = computed(() => TOP_PLAYERS.filter(p => p.id !== currentUser.value.id).slice(0, 5))

</script>

<template>
  <div class="pt-24 md:pt-28">
    <AppDashboard
      :player="currentUser"
      :upcoming-games="upcomingGames"
      :my-games="myGames"
      :rising-stars="risingStars"
    />
  </div>
</template>
