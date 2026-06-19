<script setup lang="ts">
import { GAMES, PROGRAMS, TOP_PLAYERS } from '@/constants'
import Hero from '@/components/Hero.vue'
import Features from '@/components/Features.vue'
import MarketingGamesPreview from '@/components/MarketingGamesPreview.vue'
import MarketingPlayersPreview from '@/components/MarketingPlayersPreview.vue'
import Programs from '@/components/Programs.vue'
import Testimonials from '@/components/Testimonials.vue'
import MarketingFooter from '@/components/MarketingFooter.vue'
</script>

<template>
  <div>
    <Hero />
    <div class="pc-content-visibility bg-[#FDFDFB] -mt-20 relative z-20 rounded-t-[60px] md:rounded-t-[100px] border-t border-black/5 shadow-[0_-40px_100px_rgba(0,0,0,0.1)]">
      <MarketingGamesPreview :games="GAMES.slice(0, 3)" />
    </div>
    <Features />
    <div class="pc-content-visibility bg-black py-40">
      <MarketingPlayersPreview :players="TOP_PLAYERS.slice(0, 2)" />
    </div>
    <Programs :programs="PROGRAMS" />
    <Testimonials />
    <MarketingFooter />
  </div>
</template>
