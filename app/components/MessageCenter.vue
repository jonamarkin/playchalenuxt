<script setup lang="ts">
import { ref, computed } from 'vue'
import { getSportIcon, Logo, X, ChevronRight } from '@/components/ui/Icons'
import type { Message, Game } from '@/types'

const props = defineProps<{
  messages: Message[]
  hostedGames: Game[]
}>()

const emit = defineEmits<{
  (e: 'readMessage', id: string): void
  (e: 'archiveMessage', id: string): void
  (e: 'sendReply', payload: { gameId: string, content: string, recipientId: string }): void
  (e: 'updateChallenge', payload: { challengeId: string, status: 'accepted' | 'declined' }): void
}>()

const selectedGameId = ref<string | 'all'>('all')
const activeThreadUserId = ref<string | null>(null)
const mobileView = ref<'games' | 'threads' | 'chat'>('games')
const replyText = ref('')
const inquiryType = ref<'all' | 'inquiry' | 'challenge'>('all')

const threads = computed(() => {
  const threadMap: Record<string, { user: any, messages: Message[], gameId: string, type?: string }> = {}

  props.messages.forEach(m => {
    if (selectedGameId.value !== 'all' && m.gameId !== selectedGameId.value) return
    if (inquiryType.value !== 'all' && m.type !== inquiryType.value) return

    const isHost = m.senderId === 'host-user'
    const playerUserId = isHost ? m.recipientId : m.senderId

    if (!playerUserId) return

    const key = `${m.gameId}-${playerUserId}`

    if (!threadMap[key]) {
      threadMap[key] = {
        user: isHost
          ? { name: 'Player', id: playerUserId, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200' }
          : { name: m.senderName, id: m.senderId, avatar: m.senderAvatar },
        messages: [],
        gameId: m.gameId,
        type: m.type
      }
    }
    threadMap[key].messages.push(m)
  })

  Object.values(threadMap).forEach(t => {
    t.messages.sort((a, b) => b.id.localeCompare(a.id))
  })

  return Object.values(threadMap).sort((a, b) => b.messages[0]!.id.localeCompare(a.messages[0]!.id))
})

const activeThread = computed(() => {
  if (!activeThreadUserId.value) return null
  return threads.value.find(t => t.user.id === activeThreadUserId.value)
})

const handleSendReply = () => {
  if (!replyText.value.trim() || !activeThread.value) return
  emit('sendReply', { gameId: activeThread.value.gameId, content: replyText.value, recipientId: activeThread.value.user.id })
  replyText.value = ''
}

const handleGameSelect = (id: string | 'all') => {
  selectedGameId.value = id
  mobileView.value = 'threads'
}

const handleThreadSelect = (userId: string) => {
  activeThreadUserId.value = userId
  mobileView.value = 'chat'
  const thread = threads.value.find(t => t.user.id === userId)
  thread?.messages.forEach(m => {
    if (!m.isRead) emit('readMessage', m.id)
  })
}

const getIcon = (sport: string) => getSportIcon(sport)

const reverseMessages = computed(() => {
  if (!activeThread.value) return []
  return [...activeThread.value.messages].reverse()
})
</script>

<template>
  <section class="min-h-screen bg-black pt-28 pb-6 md:pb-20 px-4 md:px-12 text-white flex flex-col">
    <div class="max-w-[1600px] mx-auto w-full flex-1 flex flex-col md:flex-row gap-4 md:gap-10">
      
      <!-- Pane 1: Game & Action Sidebar -->
      <div :class="[mobileView !== 'games' ? 'hidden md:flex' : 'flex', 'w-full md:w-20 shrink-0 md:flex-col gap-4 items-center overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar']">
        <button
          @click="handleGameSelect('all')"
          :class="['w-14 h-14 rounded-2xl flex items-center justify-center transition-all shrink-0', selectedGameId === 'all' ? 'bg-[#C6FF00] text-black shadow-lg shadow-lime-500/20' : 'bg-white/5 text-white/40 hover:bg-white/10']"
        >
          <span class="font-black text-xs italic uppercase">All</span>
        </button>
        <div class="h-px w-8 bg-white/10 hidden md:block" />
        <button
          v-for="game in hostedGames"
          :key="game.id"
          @click="handleGameSelect(game.id)"
          :class="['w-14 h-14 rounded-2xl flex items-center justify-center transition-all relative shrink-0', selectedGameId === game.id ? 'bg-[#C6FF00] text-black shadow-lg shadow-lime-500/20' : 'bg-white/5 text-white/40 hover:bg-white/10']"
        >
          <component :is="getIcon(game.sport)" class="w-6 h-6" />
          <span v-if="messages.some(m => m.gameId === game.id && !m.isRead)" class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black animate-pulse" />
        </button>
        <div class="flex-1" />
        <button
          @click="inquiryType = inquiryType === 'challenge' ? 'all' : 'challenge'"
          :class="['w-14 h-14 rounded-2xl flex items-center justify-center transition-all shrink-0 border-2', inquiryType === 'challenge' ? 'bg-red-500 border-red-500 text-white animate-pulse' : 'bg-white/5 border-white/10 text-white/40']"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
        </button>
      </div>

      <!-- Pane 2: Thread List -->
      <div :class="[mobileView !== 'threads' ? 'hidden md:flex' : 'flex', 'w-full md:w-80 shrink-0 bg-white/5 border border-white/10 rounded-[40px] flex flex-col overflow-hidden']">
        <div class="p-8 border-b border-white/5 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-1">Incoming</h4>
              <h3 class="text-2xl font-black italic uppercase tracking-tighter">Inbox</h3>
            </div>
            <button @click="mobileView = 'games'" class="md:hidden p-3 bg-white/5 rounded-full"><X class="w-5 h-5" /></button>
          </div>

          <div class="bg-black/40 p-1 rounded-full flex gap-1 border border-white/5">
            <button
              v-for="t in ['all', 'inquiry', 'challenge']"
              :key="t"
              @click="inquiryType = t as 'all' | 'inquiry' | 'challenge'"
              :class="['flex-1 py-2 rounded-full text-[8px] font-black uppercase tracking-widest transition-all', inquiryType === t ? 'bg-white text-black' : 'text-white/40 hover:text-white']"
            >
              {{ t }}
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-2">
          <button
            v-for="thread in threads"
            :key="`${thread.gameId}-${thread.user.id}`"
            @click="handleThreadSelect(thread.user.id)"
            :class="['w-full text-left p-5 rounded-[32px] transition-all flex items-center gap-4 relative group', activeThreadUserId === thread.user.id ? 'bg-white/10' : 'hover:bg-white/5']"
          >
            <div class="relative shrink-0">
              <img :src="thread.user.avatar" :alt="thread.user.name" class="w-12 h-12 rounded-full border-2 border-white/10 object-cover" />
              <div v-if="thread.type === 'challenge'" class="absolute -bottom-1 -right-1 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black">VS</div>
              <div v-if="thread.messages.some(m => !m.isRead)" class="absolute top-0 right-0 w-3 h-3 bg-[#C6FF00] rounded-full border-2 border-black" />
            </div>
            <div class="overflow-hidden">
              <h5 class="font-black italic uppercase tracking-tight truncate">{{ thread.user.name }}</h5>
              <p :class="['text-[10px] font-black uppercase tracking-widest truncate', thread.type === 'challenge' ? 'text-red-500' : 'text-[#C6FF00]']">
                {{ thread.type === 'challenge' ? 'CHALLENGE' : hostedGames.find(g => g.id === thread.gameId)?.title.split(' ')[0] }}
              </p>
              <p class="text-[10px] text-white/30 truncate mt-1">{{ thread.messages[0]?.content }}</p>
            </div>
          </button>
          <div v-if="threads.length === 0" class="py-20 text-center opacity-10 flex flex-col items-center gap-4">
            <Logo :size="40" />
            <p class="text-sm font-black italic uppercase">No {{ inquiryType }}s found</p>
          </div>
        </div>
      </div>

      <!-- Pane 3: Chat/Challenge View -->
      <div :class="[mobileView !== 'chat' ? 'hidden md:flex' : 'flex', 'flex-1 bg-white/5 border border-white/10 rounded-[40px] md:rounded-[56px] flex flex-col overflow-hidden relative']">
        <template v-if="activeThread">
          <div :key="activeThread.user.id" class="pc-view-enter flex-1 flex flex-col h-full">
            <div class="p-6 md:p-10 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-md relative z-10 shrink-0">
              <div class="flex items-center gap-3 md:gap-5">
                <button @click="mobileView = 'threads'" class="md:hidden p-2 bg-white/5 rounded-full"><ChevronRight class="w-5 h-5 rotate-180" /></button>
                <img :src="activeThread.user.avatar" :alt="activeThread.user.name" class="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-[#C6FF00] object-cover" />
                <div class="overflow-hidden">
                  <h3 class="text-xl md:text-3xl font-black italic uppercase tracking-tighter truncate">{{ activeThread.user.name }}</h3>
                  <div class="hidden sm:flex items-center gap-3">
                    <span :class="['text-[9px] font-black uppercase px-3 py-1 rounded-full shrink-0', activeThread.type === 'challenge' ? 'bg-red-500 text-white' : 'bg-[#C6FF00] text-black']">
                      {{ activeThread.type === 'challenge' ? 'Opponent' : 'Inquiry' }}
                    </span>
                    <span class="text-[9px] font-black uppercase text-white/30 tracking-widest truncate">
                      {{ activeThread.type === 'challenge' ? 'Awaiting Acceptance' : 'Match Inquiry' }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex gap-2">
                <button
                  @click="activeThread.messages.forEach(m => emit('archiveMessage', m.id)); activeThreadUserId = null; mobileView = 'threads'"
                  class="bg-white/5 hover:bg-red-500/20 hover:text-red-500 p-3 md:p-4 rounded-full transition-all text-white/30"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                </button>
              </div>
            </div>

            <div class="flex-1 overflow-y-auto p-6 md:p-12 space-y-6 md:space-y-8 flex flex-col-reverse hide-scrollbar">
              <div class="flex flex-col gap-6 md:gap-8">
                <template v-for="msg in reverseMessages" :key="msg.id">
                  <div v-if="msg.type === 'challenge' && msg.challengeDetails" class="w-full bg-red-500/10 border-2 border-red-500/20 rounded-[40px] p-8 space-y-6 my-4">
                    <div class="flex justify-between items-center">
                      <div>
                        <h4 class="text-red-500 text-[10px] font-black uppercase tracking-[0.4em] mb-1">Direct Challenge</h4>
                        <p class="text-white text-2xl font-black italic uppercase">{{ msg.challengeDetails.type }} {{ msg.challengeDetails.sport }}</p>
                      </div>
                      <div v-if="msg.challengeDetails.status === 'pending'" class="bg-red-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase italic animate-pulse">Pending</div>
                    </div>
                    <p class="text-white/60 font-medium italic">"{{ msg.challengeDetails.message }}"</p>

                    <div v-if="msg.challengeDetails.status === 'pending' && msg.senderId !== 'host-user'" class="grid grid-cols-2 gap-4 pt-4">
                      <button
                        @click="emit('updateChallenge', { challengeId: msg.challengeDetails!.id, status: 'accepted' })"
                        class="bg-white text-black py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-xl"
                      >
                        Accept Challenge
                      </button>
                      <button
                        @click="emit('updateChallenge', { challengeId: msg.challengeDetails!.id, status: 'declined' })"
                        class="bg-white/5 text-white/40 border border-white/10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                      >
                        Decline
                      </button>
                    </div>

                    <div v-if="msg.challengeDetails.status !== 'pending'" :class="['py-4 text-center rounded-full font-black uppercase text-xs tracking-widest', msg.challengeDetails.status === 'accepted' ? 'bg-[#C6FF00] text-black' : 'bg-white/5 text-white/40']">
                      Challenge {{ msg.challengeDetails.status.toUpperCase() }}
                    </div>
                  </div>

                  <div :class="['flex', msg.senderId === 'host-user' ? 'justify-end' : 'justify-start']">
                    <div :class="['max-w-[85%] md:max-w-[70%] rounded-[28px] md:rounded-[32px] p-5 md:p-6', msg.senderId === 'host-user' ? (msg.type === 'challenge' ? 'bg-red-500 text-white' : 'bg-[#C6FF00] text-black') : 'bg-white/10 text-white border border-white/5']">
                      <p class="text-sm md:text-base font-bold leading-relaxed">{{ msg.content }}</p>
                      <p :class="['text-[8px] font-black uppercase tracking-widest mt-2', msg.senderId === 'host-user' ? 'text-white/40' : 'text-white/20']">{{ msg.timestamp }}</p>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <div class="p-6 md:p-8 border-t border-white/5 bg-black/40 backdrop-blur-xl shrink-0">
              <div class="flex gap-3 md:gap-4">
                <textarea
                  v-model="replyText"
                  :placeholder="activeThread.type === 'challenge' ? 'Drop some trash talk...' : 'Type pro-response...'"
                  class="flex-1 bg-white/5 border border-white/10 rounded-[28px] md:rounded-[32px] p-4 md:p-6 text-sm font-bold text-white outline-none focus:border-[#C6FF00] transition-all resize-none h-16 md:h-20"
                />
                <button
                  @click="handleSendReply"
                  :class="[activeThread.type === 'challenge' ? 'bg-red-500' : 'bg-[#C6FF00]', 'text-black w-16 h-16 md:w-20 md:h-20 rounded-[28px] md:rounded-[32px] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shrink-0']"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polyline points="22 2 15 22 11 13 2 9 22 2" /></svg>
                </button>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="flex-1 flex flex-col items-center justify-center opacity-20 text-center p-8 space-y-6 md:space-y-8">
            <Logo :size="80" />
            <div class="space-y-2">
              <h3 class="text-3xl md:text-4xl font-black italic uppercase tracking-tighter">Combat Dashboard</h3>
              <p class="text-[10px] md:text-sm font-black uppercase tracking-widest">Select an inquiry or challenge to manage</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>
