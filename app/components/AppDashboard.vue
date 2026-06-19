<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Logo, ArrowUp, Clock, MapPin, ChevronRight } from '@/components/ui/Icons'
import type { PlayerProfile, Game } from '@/types'

const props = defineProps<{
  player: PlayerProfile
  upcomingGames: Game[]
  myGames?: { hostedGames: Game[], joinedGames: Game[] }
  risingStars?: PlayerProfile[]
}>()

const router = useRouter()

const onViewMatch = (game: Game) => {
  router.push(`/game/${game.id}`)
}

const onNavigate = (path: string) => {
  if (path.startsWith('/')) {
    router.push(path)
  } else {
    router.push(`/${path}`)
  }
}

const spotlightGame = computed(() => props.upcomingGames[0])
</script>

<template>
  <section class="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-12 min-h-screen bg-[#FDFDFB] text-black">
    <div class="max-w-7xl mx-auto space-y-8 sm:space-y-10 md:space-y-16">
      <!-- Welcome Header -->
      <header class="flex flex-col gap-6 sm:gap-8">
        <div class="space-y-3 sm:space-y-4">
          <div class="pc-fade-left inline-flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-black/30">
            <span class="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black"></span>
            Athlete Command Center
          </div>
          <h1 class="pc-view-enter text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black italic tracking-tighter uppercase leading-[0.85]">
            Welcome back, <br /> <span class="text-[#C6FF00] bg-black px-3 sm:px-5 inline-block -rotate-1 shadow-2xl">{{ player.name.split(' ')[0] }}</span>
          </h1>
        </div>
        <div class="pc-view-enter bg-black text-white p-5 sm:p-6 md:p-8 rounded-[32px] sm:rounded-[40px] flex items-center gap-5 sm:gap-8 shadow-2xl relative overflow-hidden w-fit">
          <div class="absolute top-0 right-0 p-4 sm:p-6 opacity-5 rotate-12"><Logo :size="80" /></div>
          <div class="text-right">
            <p class="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">City Rank</p>
            <p class="text-2xl sm:text-3xl md:text-4xl font-black italic text-[#C6FF00]">#1,242</p>
          </div>
          <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C6FF00] text-black flex items-center justify-center font-black shadow-xl">
            <ArrowUp class="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-14">
        <!-- Main Feed -->
        <div class="lg:col-span-8 space-y-8 sm:space-y-10 md:space-y-12">
          <!-- Spotlight Match -->
          <div
            v-if="spotlightGame"
            class="pc-view-enter relative aspect-[4/3] sm:aspect-video md:aspect-[21/9] rounded-[32px] sm:rounded-[48px] md:rounded-[56px] overflow-hidden group cursor-pointer shadow-2xl border-2 sm:border-4 border-black/5"
            @click="onViewMatch(spotlightGame)"
          >
            <img
              :src="spotlightGame.imageUrl"
              :alt="spotlightGame.title"
              class="object-cover w-full h-full transition-transform duration-[2s] group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            <div class="absolute inset-0 p-6 sm:p-8 md:p-10 lg:p-14 flex flex-col justify-end sm:justify-center">
              <span class="bg-[#C6FF00] text-black px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-3 sm:mb-4 md:mb-6 inline-block w-fit shadow-lg">Spotlight Match Today</span>
              <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-white italic uppercase tracking-tighter mb-3 sm:mb-4 md:mb-6 leading-none">{{ spotlightGame.title }}</h2>
              <div class="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 text-white/70 font-black uppercase tracking-widest text-[8px] sm:text-[9px] md:text-[10px]">
                <div class="flex items-center gap-2 sm:gap-3"><Clock class="w-4 h-4" /> {{ spotlightGame.time }}</div>
                <div class="flex items-center gap-2 sm:gap-3"><MapPin class="w-4 h-4" /> {{ spotlightGame.location.split('•')[0] }}</div>
              </div>
            </div>
          </div>

          <!-- Quick Actions & Stats -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            <div class="touch-card bg-white border-2 border-black/5 rounded-[32px] sm:rounded-[40px] md:rounded-[44px] p-6 sm:p-8 md:p-10 hover:border-[#C6FF00] transition-all shadow-sm flex flex-col justify-between min-h-[140px] sm:min-h-[160px]">
              <div class="text-black/10 mb-4 sm:mb-6 md:mb-8 scale-50 sm:scale-75 origin-left"><Logo /></div>
              <div>
                <h3 class="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter leading-none mb-1 text-black">{{ player.stats?.winRate || '0%' }}</h3>
                <p class="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-black/30">Win Rate</p>
              </div>
            </div>
            
            <div class="touch-card bg-black border-2 border-white/10 rounded-[32px] sm:rounded-[40px] md:rounded-[44px] p-6 sm:p-8 md:p-10 hover:border-[#C6FF00] transition-all shadow-sm flex flex-col justify-between min-h-[140px] sm:min-h-[160px]">
              <div class="text-[#C6FF00]/30 mb-4 sm:mb-6 md:mb-8"><ArrowUp class="w-8 h-8" /></div>
              <div>
                <h3 class="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter leading-none mb-1 text-[#C6FF00]">{{ player.stats?.mvps || 0 }}</h3>
                <p class="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/40">Season MVPs</p>
              </div>
            </div>

            <div class="touch-card bg-white border-2 border-black/5 rounded-[32px] sm:rounded-[40px] md:rounded-[44px] p-6 sm:p-8 md:p-10 hover:border-[#C6FF00] transition-all shadow-sm flex flex-col justify-between min-h-[140px] sm:min-h-[160px]">
              <div class="text-black/10 mb-4 sm:mb-6 md:mb-8"><Clock class="w-8 h-8" /></div>
              <div>
                <h3 class="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter leading-none mb-1 text-black">{{ player.stats?.reliability || '0%' }}</h3>
                <p class="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-black/30">Match Reliability</p>
              </div>
            </div>
          </div>

          <!-- Match Feed -->
          <div class="space-y-6 sm:space-y-8">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 sm:gap-0 border-b border-black/5 pb-4 sm:pb-6">
              <h3 class="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter">Recommended Games</h3>
              <button @click="onNavigate('discover')" class="text-black/40 hover:text-black font-black uppercase text-[9px] sm:text-[10px] tracking-[0.2em] transition-colors text-left sm:text-right">View All Matches</button>
            </div>
            <div class="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
              <div
                v-for="game in upcomingGames.slice(1, 3)"
                :key="game.id"
                @click="onViewMatch(game)"
                class="touch-scale bg-white border-2 border-black/5 p-5 sm:p-6 md:p-8 rounded-[32px] sm:rounded-[40px] md:rounded-[48px] flex gap-4 sm:gap-5 md:gap-6 items-center hover:bg-black hover:text-white transition-all cursor-pointer group shadow-sm"
              >
                <img :src="game.imageUrl" :alt="game.title" class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-[20px] sm:rounded-[28px] md:rounded-[32px] object-cover shadow-lg shrink-0" />
                <div class="flex-1 min-w-0">
                  <span class="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-black/40 group-hover:text-[#C6FF00] mb-1 sm:mb-2 block">{{ game.sport }}</span>
                  <h4 class="text-base sm:text-lg md:text-xl font-black italic uppercase tracking-tighter group-hover:text-white transition-colors truncate">{{ game.title }}</h4>
                  <div class="flex items-center gap-3 sm:gap-4 mt-1 sm:mt-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest opacity-40">
                    <Clock class="w-3 h-3" /> {{ game.time }}
                  </div>
                </div>
                <div class="p-3 sm:p-4 bg-black/5 group-hover:bg-[#C6FF00] group-hover:text-black rounded-full transition-all shrink-0">
                  <ChevronRight class="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-4 space-y-8 sm:space-y-10 md:space-y-12">
          <!-- Athlete Pro Profile -->
          <div class="bg-black text-white rounded-[40px] sm:rounded-[48px] md:rounded-[60px] p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8 md:space-y-10 shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 right-0 p-6 sm:p-8 md:p-10 opacity-10 pointer-events-none"><Logo :size="100" /></div>
            <div class="flex items-center gap-5 sm:gap-6 md:gap-8 relative z-10">
              <img :src="player.avatar" :alt="player.name" class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-3 sm:border-4 border-[#C6FF00] shadow-2xl object-cover" />
              <div class="min-w-0">
                <h4 class="text-lg sm:text-xl md:text-2xl font-black italic uppercase tracking-tighter leading-none truncate">{{ player.name }}</h4>
                <p class="text-[9px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-widest text-[#C6FF00] mt-1 sm:mt-2">{{ player.mainSport }} Elite</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3 sm:gap-4 py-5 sm:py-6 md:py-8 border-y border-white/10">
              <div>
                <span class="block text-xl sm:text-2xl font-black italic">{{ player.stats?.gamesPlayed || 0 }}</span>
                <span class="text-[8px] sm:text-[9px] font-black uppercase text-white/30 tracking-widest">Matches</span>
              </div>
              <div>
                <span class="block text-xl sm:text-2xl font-black italic">{{ player.stats?.rating || '0.0' }}</span>
                <span class="text-[8px] sm:text-[9px] font-black uppercase text-white/30 tracking-widest">Season Rtg</span>
              </div>
            </div>
            <div class="space-y-3 sm:space-y-4 pt-2">
              <button @click="onNavigate('stats')" class="w-full bg-[#C6FF00] text-black py-4 sm:py-5 rounded-full font-black uppercase tracking-widest text-[10px] sm:text-[11px] hover:scale-105 transition-all shadow-xl shadow-lime-500/10">Manage Pro Profile</button>
              <button @click="onNavigate('community')" class="w-full bg-white/5 border border-white/10 py-4 sm:py-5 rounded-full font-black uppercase tracking-widest text-[10px] sm:text-[11px] hover:bg-white/10 transition-all">Scout Competitors</button>
            </div>
          </div>

          <!-- My Games Quick Access -->
          <div v-if="myGames" class="bg-white border-2 border-black/5 rounded-[40px] sm:rounded-[48px] p-6 sm:p-8 space-y-5 shadow-sm hover:border-[#C6FF00] transition-all">
            <div class="flex items-center justify-between">
              <h3 class="text-lg sm:text-xl font-black italic uppercase tracking-tighter">My Games</h3>
              <button @click="onNavigate('mygames')" class="text-[9px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors">View All</button>
            </div>
            <div class="grid grid-cols-2 gap-3 sm:gap-4">
              <div class="bg-gray-50 rounded-[20px] p-4 text-center">
                <span class="block text-2xl sm:text-3xl font-black italic">{{ myGames.hostedGames.length }}</span>
                <span class="text-[8px] sm:text-[9px] font-black uppercase text-black/30 tracking-widest">Hosted</span>
              </div>
              <div class="bg-gray-50 rounded-[20px] p-4 text-center">
                <span class="block text-2xl sm:text-3xl font-black italic">{{ myGames.joinedGames.length }}</span>
                <span class="text-[8px] sm:text-[9px] font-black uppercase text-black/30 tracking-widest">Joined</span>
              </div>
            </div>
            <div v-if="myGames.hostedGames.filter(g => g.visibility === 'private').length > 0" class="flex items-center gap-2 text-[9px] font-bold text-black/40">
              <span class="bg-black text-[#C6FF00] px-2 py-0.5 rounded-full text-[7px] font-black uppercase">Private</span>
              <span>{{ myGames.hostedGames.filter(g => g.visibility === 'private').length }} private game(s)</span>
            </div>
            <button
              @click="onNavigate('mygames')"
              class="w-full bg-black text-[#C6FF00] py-3.5 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all"
            >
              Manage My Games
            </button>
          </div>

          <!-- Rising Legends Leaderboard Preview -->
          <div class="space-y-6 sm:space-y-8 bg-gray-50 p-6 sm:p-8 md:p-10 rounded-[40px] sm:rounded-[48px] md:rounded-[56px] border border-black/5">
            <h3 class="text-xl sm:text-2xl font-black italic uppercase tracking-tighter">Rising Stars</h3>
            <div class="space-y-4 sm:space-y-5 md:space-y-6">
              <template v-if="risingStars && risingStars.length > 0">
                <div
                  v-for="(star, i) in risingStars"
                  :key="star.id"
                  class="flex items-center justify-between group cursor-pointer gap-3 hover:bg-black/5 rounded-xl p-2 -mx-2 transition-colors"
                  @click="onNavigate(`profile/${star.id}`)"
                >
                  <div class="flex items-center gap-3 sm:gap-4 md:gap-5 min-w-0">
                    <div class="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl sm:rounded-2xl bg-black text-[#C6FF00] flex items-center justify-center font-black text-[10px] sm:text-xs italic shrink-0">#{{ i + 1 }}</div>
                    <template v-if="star.avatar">
                      <img
                        :src="star.avatar"
                        :alt="star.name"
                        class="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl object-cover shrink-0"
                      />
                    </template>
                    <template v-else>
                      <div class="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-[#C6FF00] to-[#8BC34A] flex items-center justify-center text-black font-black text-sm shrink-0">
                        {{ star.name.charAt(0).toUpperCase() }}
                      </div>
                    </template>
                    <div class="min-w-0">
                      <p class="font-black italic text-sm sm:text-base uppercase tracking-tight group-hover:text-black transition-colors truncate">{{ star.name }}</p>
                      <p class="text-[8px] sm:text-[9px] font-black uppercase text-black/30 tracking-widest">{{ star.mainSport }}</p>
                    </div>
                  </div>
                  <div class="text-black/30 group-hover:text-black transition-colors shrink-0">
                    <ChevronRight class="w-4 h-4" />
                  </div>
                </div>
              </template>
              <template v-else>
                <p class="text-black/40 text-sm text-center py-4">No players found yet</p>
              </template>
            </div>
            <button @click="onNavigate('community')" class="w-full py-3 sm:py-4 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-black/30 hover:text-black transition-colors">View Global Rankings</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
