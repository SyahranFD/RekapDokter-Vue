<script setup>
import { formatTime } from '@/utils/utils.js'

defineProps({
  message: { type: Object, required: true },
})
</script>

<template>
  <div
    class="flex flex-col"
    :class="message.role === 'user' ? 'items-end' : 'items-start'"
    style="animation: chat-in 0.2s ease-out;"
  >
    <div
      class="max-w-[72%] px-4 py-3 text-sm leading-relaxed whitespace-pre-line"
      :class="message.role === 'user'
        ? 'text-white rounded-[16px_16px_4px_16px]'
        : 'text-heading bg-card rounded-[16px_16px_16px_4px]'"
      :style="message.role === 'user' ? 'background: #14532C;' : ''"
    >
      {{ message.text }}
    </div>
    <span class="text-[11px] text-placeholder mt-1 px-1">
      {{ formatTime(message.timestamp) }}
    </span>
  </div>
</template>
