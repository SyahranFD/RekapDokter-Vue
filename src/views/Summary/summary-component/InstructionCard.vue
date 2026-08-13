<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  instructions: { type: Array, default: () => [] },
})
</script>

<template>
  <div class="bg-white border border-border rounded-2xl overflow-hidden">
    <div class="px-5 py-3.5 border-b border-border flex items-center gap-2.5">
      <div class="w-8 h-8 rounded-lg bg-primary-surface flex items-center justify-center">
        <Icon icon="lucide:clipboard-list" class="w-4 h-4 text-primary" />
      </div>
      <span class="text-sm font-semibold text-heading">Instruksi Dokter</span>
    </div>
    <div class="p-5 flex flex-col gap-2.5">
      <div
        v-for="(instr, i) in instructions"
        :key="i"
        class="flex gap-2.5 items-start"
      >
        <div class="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
        <p class="text-sm text-body leading-relaxed">{{ instr }}</p>
      </div>
      <p v-if="instructions.length === 0" class="text-sm text-placeholder">Tidak ada instruksi.</p>
    </div>
  </div>
</template>
