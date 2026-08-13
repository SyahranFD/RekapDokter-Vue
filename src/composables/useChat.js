import { ref, watch } from 'vue'
import { generateId, getDummyReply } from '@/utils/utils.js'

export function useChat(visitId) {
  const storageKey = `rekap_chat_${visitId}`

  const messages = ref(JSON.parse(localStorage.getItem(storageKey) || '[]'))
  const isTyping = ref(false)

  if (messages.value.length === 0) {
    messages.value.push({
      id: generateId('msg'),
      role: 'ai',
      text: 'Halo! Saya AI Asisten Rekap Dokter. Anda bisa bertanya tentang obat yang diresepkan, dosis, efek samping, pantangan, atau jadwal kontrol Anda. Apa yang ingin Anda tanyakan?',
      timestamp: new Date().toISOString(),
    })
  }

  watch(messages, (val) => {
    localStorage.setItem(storageKey, JSON.stringify(val))
  }, { deep: true })

  async function sendMessage(text) {
    if (!text.trim()) return

    messages.value.push({
      id: generateId('msg'),
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString(),
    })

    isTyping.value = true
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 800))
    isTyping.value = false

    messages.value.push({
      id: generateId('msg'),
      role: 'ai',
      text: getDummyReply(text),
      timestamp: new Date().toISOString(),
    })
  }

  function clearChat() {
    messages.value = []
    localStorage.removeItem(storageKey)
  }

  return {
    messages,
    isTyping,
    sendMessage,
    clearChat,
  }
}
