import { useAuth } from '@/composables/useAuth'

export default defineNuxtRouteMiddleware((to, from) => {
  const { user, hasProfile } = useAuth()

  const publicRoutes = ['/', '/login', '/onboarding', '/discover']
  const isPublic = publicRoutes.includes(to.path) || 
                   to.path.startsWith('/game/') || 
                   (to.path.startsWith('/profile/') && to.path !== '/profile/me')

  // Redirect unauthenticated users to login
  if (!user.value && !isPublic) {
    return navigateTo('/login')
  }

  // Redirect authenticated users without a profile to onboarding
  if (user.value && !hasProfile.value && to.path !== '/onboarding' && to.path !== '/login') {
    return navigateTo('/onboarding')
  }

  // Prevent authenticated users from going to login
  if (user.value && to.path === '/login') {
    return navigateTo(hasProfile.value ? '/home' : '/onboarding')
  }
})
