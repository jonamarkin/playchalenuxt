<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  currentImage?: string
}>()

const emit = defineEmits<{
  (e: 'imageSelected', file: File): void
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const objectUrl = URL.createObjectURL(file)
    previewUrl.value = objectUrl
    emit('imageSelected', file)
  }
}

const currentDisplayImage = computed(() => {
  return previewUrl.value || props.currentImage || 'https://i.pravatar.cc/150?u=custom'
})

const triggerFileInput = () => {
  fileInputRef.value?.click()
}
</script>

<template>
  <div class="relative group cursor-pointer" @click="triggerFileInput">
    <div class="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-[#C6FF00] transition-colors shadow-2xl">
      <img
        :src="currentDisplayImage"
        alt="Profile Avatar"
        class="object-cover w-full h-full"
      />

      <!-- Overlay on hover -->
      <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
        <svg class="w-8 h-8 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        <span class="text-[10px] font-black uppercase tracking-widest">Change</span>
      </div>
    </div>

    <input
      type="file"
      ref="fileInputRef"
      @change="handleFileChange"
      accept="image/*"
      class="hidden"
    />

    <div class="absolute -bottom-2 -right-2 bg-[#C6FF00] text-black p-2 rounded-full shadow-lg border-4 border-black">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    </div>
  </div>
</template>
