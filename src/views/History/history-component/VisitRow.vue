<script setup>
import { Icon } from '@iconify/vue'
import { formatDateShort } from '@/utils/utils.js'
import BaseBadge from '@/components/BaseBadge.vue'

defineProps({
  visit: { type: Object, required: true },
})
defineEmits(['click'])

const statusLabel = { recorded: 'Direkam', transcribed: 'Transkripsi', summarized: 'Ringkasan' }
const statusVariant = { recorded: 'default', transcribed: 'warning', summarized: 'primary' }
</script>

<template>
  <div
    class="grid items-center px-6 py-4 border-b border-border last:border-b-0 cursor-pointer hover:bg-bg transition-colors"
    style="grid-template-columns: 160px 1fr 1fr 1fr 80px auto;"
    @click="$emit('click')"
  >
    <span class="text-sm text-placeholder">{{ formatDateShort(visit.date) }}</span>
    <span class="text-sm font-medium text-heading">{{ visit.doctorName }}</span>
    <span class="text-sm text-body">{{ visit.diagnosis }}</span>
    <span class="text-xs text-placeholder">{{ visit.summary?.medications?.map(m => m.name).join(' · ') || '—' }}</span>
    <BaseBadge :variant="statusVariant[visit.status] || 'default'">{{ statusLabel[visit.status] || visit.status }}</BaseBadge>
    <Icon icon="lucide:chevron-right" class="w-3.5 h-3.5 text-placeholder" />
  </div>
</template>
