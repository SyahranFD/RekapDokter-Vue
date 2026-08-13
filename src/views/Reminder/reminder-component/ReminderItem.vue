<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  reminder: { type: Object, required: true },
})
const emit = defineEmits(['toggle', 'delete'])
</script>

<template>
  <div class="bg-white border border-border rounded-2xl px-5 py-4 flex items-center gap-4">
    <!-- Icon -->
    <div class="w-10 h-10 rounded-xl bg-primary-surface flex items-center justify-center flex-shrink-0">
      <Icon
        :icon="reminder.type === 'checkup' ? 'lucide:calendar' : 'lucide:pill'"
        class="w-4 h-4 text-primary"
      />
    </div>

    <!-- Info -->
    <div class="flex-1 min-w-0">
      <p class="text-sm font-semibold text-heading truncate">{{ reminder.title }}</p>
      <p class="text-xs text-placeholder mt-0.5">
        <template v-if="reminder.type === 'medication'">
          {{ reminder.time }} · {{ reminder.days.join(', ') || 'Setiap hari' }}
        </template>
        <template v-else>
          {{ reminder.date ? new Date(reminder.date).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' }) : '—' }}
        </template>
      </p>
    </div>

    <!-- Toggle -->
    <button
      @click="emit('toggle', reminder.id)"
      class="relative flex-shrink-0 cursor-pointer border-0 bg-transparent p-0"
      :aria-label="reminder.active ? 'Nonaktifkan' : 'Aktifkan'"
    >
      <div
        class="w-11 h-6 rounded-full transition-colors"
        :class="reminder.active ? 'bg-primary' : 'bg-border'"
      />
      <div
        class="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all"
        :class="reminder.active ? 'left-[23px]' : 'left-[3px]'"
      />
    </button>

    <!-- Delete -->
    <button
      @click="emit('delete', reminder.id)"
      class="w-8 h-8 rounded-lg flex items-center justify-center text-placeholder hover:text-destructive hover:bg-red-50 cursor-pointer border-0 bg-transparent transition-colors flex-shrink-0"
    >
      <Icon icon="lucide:trash-2" class="w-3.5 h-3.5" />
    </button>
  </div>
</template>
