<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { GAMES, TOP_PLAYERS } from '@/constants'
import GameCard from '@/components/GameCard.vue'

const router = useRouter()

// Mocking authenticated user data for now
const currentUser = computed(() => TOP_PLAYERS[0] as NonNullable<(typeof TOP_PLAYERS)[0]>)

const activeTab = ref<'hosted' | 'joined'>('hosted')

const hostedGames = computed(() => GAMES.filter(g => g.organizer === currentUser.value.name || g.organizer.includes(currentUser.value.name.split(' ')[0]!)))
const joinedGames = computed(() => GAMES.filter(g => g.participants?.some(p => p.id === currentUser.value.id)))

const onViewMatch = (id: string) => {
  router.push(`/game/${id}`)
}
</script>

<template>
  <div class="bg-[#FDFDFB] min-h-screen">
    <section class="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-12">
        <div class="max-w-4xl mx-auto space-y-8 sm:space-y-10">
            <!-- Header -->
            <header class="space-y-4">
                <div class="pc-fade-left inline-flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-black/30">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#C6FF00]"></span>
                    Your Arena
                </div>
                <h1 class="pc-view-enter text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tighter uppercase text-black">
                    My Games
                </h1>
            </header>

            <!-- Tabs -->
            <div class="flex gap-2 bg-gray-100 p-1.5 rounded-full w-fit">
                <button
                    @click="activeTab = 'hosted'"
                    :class="[
                      'px-5 sm:px-6 py-2.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all',
                      activeTab === 'hosted' ? 'bg-black text-white shadow-md' : 'text-black/40 hover:text-black/60'
                    ]"
                >
                    Hosted ({{ hostedGames.length }})
                </button>
                <button
                    @click="activeTab = 'joined'"
                    :class="[
                      'px-5 sm:px-6 py-2.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all',
                      activeTab === 'joined' ? 'bg-black text-white shadow-md' : 'text-black/40 hover:text-black/60'
                    ]"
                >
                    Joined ({{ joinedGames.length }})
                </button>
            </div>

            <!-- Content -->
            <div class="space-y-4">
                <div v-if="activeTab === 'hosted' && hostedGames.length === 0" class="pc-view-enter py-16 text-center bg-gray-50 rounded-[32px] border border-black/5">
                    <div class="text-4xl mb-4">🏟️</div>
                    <p class="text-black/40 font-bold uppercase text-sm tracking-widest mb-4">You haven't hosted any games yet</p>
                    <button
                        @click="router.push('/discover')"
                        class="bg-[#C6FF00] text-black px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all"
                    >
                        Create Your First Game
                    </button>
                </div>

                <div v-if="activeTab === 'joined' && joinedGames.length === 0" class="pc-view-enter py-16 text-center bg-gray-50 rounded-[32px] border border-black/5">
                    <div class="text-4xl mb-4">🤝</div>
                    <p class="text-black/40 font-bold uppercase text-sm tracking-widest mb-4">You haven't joined any games yet</p>
                    <button
                        @click="router.push('/discover')"
                        class="bg-[#C6FF00] text-black px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all"
                    >
                        Find Games to Join
                    </button>
                </div>

                <template v-if="activeTab === 'hosted'">
                  <GameCard
                      v-for="game in hostedGames"
                      :key="game.id"
                      :game="game"
                      :is-host="true"
                      @click="onViewMatch(game.id)"
                  />
                </template>

                <template v-if="activeTab === 'joined'">
                  <GameCard
                      v-for="game in joinedGames"
                      :key="game.id"
                      :game="game"
                      :is-host="false"
                      @click="onViewMatch(game.id)"
                  />
                </template>
            </div>

            <!-- Quick Actions -->
            <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-black/5">
                <button
                    @click="router.push('/discover')"
                    class="flex-1 bg-black text-[#C6FF00] py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all"
                >
                    Discover Games
                </button>
                <button
                    @click="router.push('/home')"
                    class="flex-1 bg-gray-100 text-black py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-all"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    </section>
  </div>
</template>
