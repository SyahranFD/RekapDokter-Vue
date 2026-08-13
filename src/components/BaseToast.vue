<script setup>
import { Icon } from '@iconify/vue'
import { useToast } from '@/composables/useToast.js'

const { toasts, dismiss } = useToast()

const iconMap = {
  success: 'lucide:check-circle',
  error: 'lucide:x-circle',
  info: 'lucide:info',
  default: 'lucide:bell',
}

const colorMap = {
  success: 'text-primary',
  error: 'text-destructive',
  info: 'text-blue-500',
  default: 'text-body',
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="flex items-center gap-3 bg-white border border-border rounded-xl px-4 py-3 shadow-lg min-w-[280px] max-w-sm cursor-pointer"
        @click="dismiss(toast.id)"
      >
        <Icon
          :icon="iconMap[toast.type] || iconMap.default"
          class="w-4 h-4 flex-shrink-0"
          :class="colorMap[toast.type] || colorMap.default"
        />
        <p class="text-sm text-heading flex-1">{{ toast.message }}</p>
        <Icon icon="lucide:x" class="w-3.5 h-3.5 text-placeholder flex-shrink-0" />
      </div>
    </TransitionGroup>
  </div>
</template>
