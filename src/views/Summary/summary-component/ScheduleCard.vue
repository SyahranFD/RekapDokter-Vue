<script setup>
import { Icon } from '@iconify/vue'
import { formatDateShort } from '@/utils/utils.js'

defineProps({
  nextVisit: { type: Object, default: () => ({}) },
})
</script>

<template>
  <div class="bg-white border border-border rounded-2xl overflow-hidden">
    <div class="px-5 py-3.5 border-b border-border flex items-center gap-2.5">
      <div class="w-8 h-8 rounded-lg bg-primary-surface flex items-center justify-center">
        <Icon icon="lucide:calendar" class="w-4 h-4 text-primary" />
      </div>
      <span class="text-sm font-semibold text-heading">Jadwal Kontrol</span>
    </div>
    <div class="p-5 flex flex-col gap-2">
      <div v-if="nextVisit?.date" class="flex gap-2.5 items-start">
        <div class="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
        <p class="text-sm font-medium text-heading">{{ formatDateShort(nextVisit.date) }}</p>
      </div>
      <div v-if="nextVisit?.notes" class="flex gap-2.5 items-start">
        <div class="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
        <p class="text-sm text-body leading-relaxed">{{ nextVisit.notes }}</p>
      </div>
      <p v-if="!nextVisit?.date && !nextVisit?.notes" class="text-sm text-placeholder">
        Belum ada jadwal kontrol.
      </p>
    </div>
  </div>
</template>
