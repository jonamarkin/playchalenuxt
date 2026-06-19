<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { TOP_PLAYERS } from '@/constants'
import type { PlayerProfile } from '@/types'

const router = useRouter()
const isFetchingNextPage = ref(false)

const loadMore = () => {
  isFetchingNextPage.value = true
  setTimeout(() => {
    isFetchingNextPage.value = false
    // Simulate loading more data by doing nothing right now,
    // as we just use the static constant.
  }, 1000)
}

const handleOpenPlayer = (player: PlayerProfile) => {
  router.push(`/profile/${player.slug || player.id}`)
}
</script>

<template>
  <div class="min-h-screen bg-[#FDFDFB] text-black font-sans flex flex-col selection:bg-[#C6FF00] selection:text-black">
    <Header position="sticky" />

    <main class="flex-1 w-full">
      <div class="pc-view-enter">
        <TopPlayers
          :players="TOP_PLAYERS"
          :is-full-page="true"
          @open-player="handleOpenPlayer"
        />

        <div class="flex justify-center pb-20 mt-10">
          <button
            @click="loadMore"
            :disabled="isFetchingNextPage"
            class="bg-[#C6FF00] text-black font-black uppercase tracking-widest rounded-full px-8 py-6 hover:scale-105 transition-all text-xs disabled:opacity-50 disabled:hover:scale-100"
          >
            {{ isFetchingNextPage ? 'Loading Legends...' : 'Load More Athletes' }}
          </button>
        </div>
      </div>
    </main>

    <MarketingFooter />
  </div>
</template>
