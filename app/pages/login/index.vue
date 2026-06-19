<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login } = useAuth()
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref<string | null>(null)

const handleLogin = (e: Event) => {
  e.preventDefault()
  isLoading.value = true
  error.value = null

  setTimeout(() => {
    isLoading.value = false
    login()
  }, 1500)
}

const handleSocialAuth = (provider: string) => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    login()
  }, 1500)
}
</script>

<template>
  <div class="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
    <!-- Background Ambience -->
    <div class="absolute inset-0 pointer-events-none opacity-20">
      <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C6FF00]/10 blur-[150px] rounded-full -mr-40 -mt-40"></div>
      <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full -ml-40 -mb-40"></div>
    </div>

    <div class="pc-view-enter z-10 w-full max-w-md p-8 space-y-8">
      <div class="text-center space-y-4">
        <div class="flex justify-center mb-6">
          <div class="scale-150">
            <Logo />
          </div>
        </div>
        <h1 class="text-4xl font-black italic tracking-tighter uppercase leading-none">
          Enter The <br /> Arena
        </h1>
        <p class="text-white/40 text-xs font-bold uppercase tracking-widest">
          Sign in to manage your legacy
        </p>
      </div>

      <div class="space-y-4">
        <button
          @click="handleSocialAuth('google')"
          :disabled="isLoading"
          class="w-full bg-white text-black p-4 rounded-full flex items-center justify-center gap-3 hover:bg-gray-200 transition-all font-bold text-sm uppercase tracking-wider relative overflow-hidden group disabled:opacity-50"
        >
          <span v-if="isLoading" class="opacity-50">Connecting...</span>
          <template v-else>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.172-1.224 1.224-3.136 2.584-6.392 2.584-5.112 0-9.216-4.144-9.216-9.256s4.104-9.256 9.216-9.256c2.784 0 4.888 1.104 6.384 2.504l2.312-2.312c-2.128-2.024-4.88-3.192-8.696-3.192-7.392 0-13.432 6.04-13.432 13.432s6.04 13.432 13.432 13.432c4.016 0 7.04-1.32 9.424-3.792 2.448-2.448 3.216-5.888 3.216-8.544 0-.816-.064-1.584-.2-2.312h-12.42z" /></svg>
            <span>Continue with Google</span>
          </template>
        </button>

        <div class="flex items-center gap-4 py-2">
          <div class="h-px bg-white/10 flex-1"></div>
          <span class="text-[10px] font-black text-white/20 uppercase tracking-widest">OR</span>
          <div class="h-px bg-white/10 flex-1"></div>
        </div>

        <form @submit="handleLogin" class="space-y-4">
          <div class="space-y-2">
            <input
              type="email"
              placeholder="Email Address"
              required
              v-model="email"
              class="w-full bg-white/5 border-2 border-white/10 h-12 rounded-full px-6 focus:border-[#C6FF00] placeholder:text-white/20 outline-none transition-all font-bold"
            />
          </div>
          <div class="space-y-2">
            <input
              type="password"
              placeholder="Password"
              required
              v-model="password"
              class="w-full bg-white/5 border-2 border-white/10 h-12 rounded-full px-6 focus:border-[#C6FF00] placeholder:text-white/20 outline-none transition-all font-bold"
            />
          </div>

          <div v-if="error" class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs text-center font-bold">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full h-12 bg-[#C6FF00] hover:bg-[#b0ff00] text-black rounded-full font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(198,255,0,0.2)] transition-all disabled:opacity-50"
          >
            {{ isLoading ? 'Signing In...' : 'Access Account' }}
          </button>
        </form>
      </div>

      <div class="text-center">
        <NuxtLink to="/onboarding" class="text-white/40 hover:text-[#C6FF00] text-xs font-bold uppercase tracking-widest transition-colors">
          New Athlete? <span class="text-white border-b border-white/20 pb-0.5">Start Draft</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
