<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const emit = defineEmits(['send'])
const text = ref('')

const handleSend = () => {
  if (!text.value.trim()) return
  emit('send', text.value)
  text.value = ''
}

const handleKeydown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}
</script>

<template>
  <div class="flex gap-2.5 p-4 border-t border-border bg-white">
    <input
      v-model="text"
      @keydown="handleKeydown"
      placeholder="Ketik pertanyaanmu..."
      class="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm bg-bg placeholder:text-placeholder"
    />
    <button
      @click="handleSend"
      :disabled="!text.trim()"
      class="w-11 h-11 rounded-xl flex items-center justify-center border-0 cursor-pointer transition-opacity disabled:opacity-40"
      style="background: #14532C;"
    >
      <Icon icon="lucide:send" class="w-4 h-4 text-white" />
    </button>
  </div>
</template>
