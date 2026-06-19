// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt'
  ],
  googleFonts: {
    families: {
      Inter: [400, 500, 700, 900]
    },
    display: 'swap',
  },
  components: [
    {
      path: '~/components/ui',
      extensions: ['.vue'],
      prefix: 'Ui'
    },
    '~/components'
  ],
  vite: {
    optimizeDeps: {
      include: ['@lucide/vue']
    }
  }
})
