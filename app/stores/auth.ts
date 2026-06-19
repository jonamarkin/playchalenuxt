import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { TOP_PLAYERS } from '@/constants'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref<any | null>(null)
  const hasProfile = ref(false)

  const login = () => {
    // Mock login logic
    user.value = { email: 'athlete@playchale.com' }
    hasProfile.value = true // Assume they have a profile for now, can be toggled
    router.push(hasProfile.value ? '/home' : '/onboarding')
  }

  const logout = () => {
    user.value = null
    hasProfile.value = false
    router.push('/login')
  }

  const completeOnboarding = (profileData: any) => {
    hasProfile.value = true
    user.value = { ...user.value, ...profileData, id: 'me' }
    router.push('/home')
  }

  // To simulate missing profile flow
  const setMissingProfile = () => {
    user.value = { email: 'new@playchale.com' }
    hasProfile.value = false
  }

  // If user is logged in and has profile, return mock data from TOP_PLAYERS to populate UI
  const profile = computed(() => {
    if (user.value && hasProfile.value) {
      return { ...TOP_PLAYERS[0], ...user.value }
    }
    return null
  })

  return {
    user,
    hasProfile,
    profile,
    login,
    logout,
    completeOnboarding,
    setMissingProfile
  }
})
