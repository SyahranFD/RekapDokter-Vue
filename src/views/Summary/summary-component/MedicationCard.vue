<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  medications: { type: Array, default: () => [] },
})
</script>

<template>
  <div class="bg-white border border-border rounded-2xl overflow-hidden">
    <div class="px-5 py-3.5 border-b border-border flex items-center gap-2.5">
      <div class="w-8 h-8 rounded-lg bg-primary-surface flex items-center justify-center">
        <Icon icon="lucide:pill" class="w-4 h-4 text-primary" />
      </div>
      <span class="text-sm font-semibold text-heading">Obat & Dosis</span>
    </div>
    <div class="p-5 flex flex-col gap-4">
      <div
        v-for="med in medications"
        :key="med.name"
        class="flex gap-3 items-start"
      >
        <div class="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
        <div>
          <p class="text-sm font-semibold text-heading">{{ med.name }}</p>
          <p class="text-xs text-placeholder mt-0.5">{{ med.dose }} · {{ med.duration }}</p>
          <p class="text-xs text-body/70 mt-1">{{ med.notes }}</p>
        </div>
      </div>
      <p v-if="medications.length === 0" class="text-sm text-placeholder">Tidak ada obat.</p>
    </div>
  </div>
</template>
