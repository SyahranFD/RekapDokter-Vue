<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useVisits } from '@/composables/useVisits.js'
import { useChat } from '@/composables/useChat.js'
import { formatDateShort } from '@/utils/utils.js'
import ChatBubble from './chat-component/ChatBubble.vue'
import ChatInput from './chat-component/ChatInput.vue'

const { getCurrentVisit } = useVisits()
const visit = ref(getCurrentVisit())

const { messages, isTyping, sendMessage } = useChat(visit.value?.id || 'default')

const scrollEl = ref(null)

const quickQuestions = [
  'Efek samping Amoxicillin?',
  'Kapan minum Paracetamol?',
  'Kapan harus kontrol?',
]

const scrollToBottom = async () => {
  await nextTick()
  if (scrollEl.value) scrollEl.value.scrollTop = scrollEl.value.scrollHeight
}

watch(messages, scrollToBottom, { deep: true })
onMounted(scrollToBottom)

const handleSend = (text) => sendMessage(text)
const handleQuick = (q) => sendMessage(q)

const contextItems = computed(() => {
  if (!visit.value) return []
  return [
    { label: 'Diagnosis', value: visit.value.diagnosis },
    { label: 'Dokter', value: visit.value.doctorName },
    { label: 'Tanggal', value: formatDateShort(visit.value.date) },
    { label: 'Obat', value: visit.value.summary?.medications?.map((m) => m.name).join(', ') || '—' },
  ]
})
</script>

<template>
  <div class="max-w-[960px] mx-auto px-8 py-10">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-[28px] font-bold text-heading tracking-tight">Tanya Dokter AI</h1>
      <p v-if="visit" class="text-sm text-placeholder mt-1">
        Berdasarkan kunjungan {{ formatDateShort(visit.date) }}
      </p>
    </div>

    <div class="grid gap-6" style="grid-template-columns: 1fr 280px; height: 580px;">
      <!-- Chat Area -->
      <div class="bg-white border border-border rounded-2xl flex flex-col overflow-hidden">
        <!-- Messages -->
        <div ref="scrollEl" class="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-3.5">
          <ChatBubble v-for="msg in messages" :key="msg.id" :message="msg" />

          <!-- Typing indicator -->
          <div v-if="isTyping" class="flex items-start">
            <div class="bg-card rounded-[16px_16px_16px_4px] px-4 py-3 flex items-center gap-1">
              <div
                v-for="i in 3"
                :key="i"
                class="w-1.5 h-1.5 rounded-full bg-placeholder"
                :style="`animation: pulse-dot 1.2s ease infinite ${(i-1) * 0.2}s`"
              />
            </div>
          </div>
        </div>

        <!-- Input -->
        <ChatInput @send="handleSend" />
      </div>

      <!-- Sidebar -->
      <div class="flex flex-col gap-3">
        <!-- Context -->
        <div class="bg-white border border-border rounded-2xl p-5">
          <p class="text-[11px] font-semibold text-primary uppercase tracking-widest mb-3">Konteks Kunjungan</p>
          <div v-for="item in contextItems" :key="item.label" class="text-sm mb-1.5">
            <span class="text-placeholder">{{ item.label }}: </span>
            <span class="text-body font-medium">{{ item.value }}</span>
          </div>
          <div v-if="contextItems.length === 0" class="text-sm text-placeholder">
            Tidak ada kunjungan aktif.
          </div>
        </div>

        <!-- Quick Questions -->
        <div class="bg-white border border-border rounded-2xl p-5">
          <p class="text-[11px] font-semibold text-primary uppercase tracking-widest mb-3">Pertanyaan Umum</p>
          <button
            v-for="q in quickQuestions"
            :key="q"
            @click="handleQuick(q)"
            class="block w-full text-left py-2.5 border-b border-border last:border-b-0 text-sm text-body hover:text-primary cursor-pointer transition-colors bg-transparent border-0 border-b border-border"
          >
            {{ q }}
          </button>
        </div>

        <!-- Disclaimer -->
        <div class="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex gap-2">
          <Icon icon="lucide:info" class="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p class="text-xs text-amber-700 leading-relaxed">
            Untuk kondisi serius, selalu konsultasikan langsung ke dokter Anda.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button.border-0.border-b {
  border-bottom: 1px solid #e4e4e7!important;
}
</style>
