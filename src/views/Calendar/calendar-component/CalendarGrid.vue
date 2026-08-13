<script setup>
import { computed } from 'vue'
import { HARI, BULAN } from '@/utils/utils.js'

const props = defineProps({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  eventDates: { type: Array, default: () => [] },
  selectedDate: { type: Number, default: null },
})
const emit = defineEmits(['select'])

const dayHeaders = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

const cells = computed(() => {
  const firstDay = new Date(props.year, props.month, 1).getDay()
  const totalDays = new Date(props.year, props.month + 1, 0).getDate()
  const arr = []
  for (let i = 0; i < firstDay; i++) arr.push(null)
  for (let d = 1; d <= totalDays; d++) arr.push(d)
  return arr
})

const today = new Date()
const isToday = (d) =>
  d === today.getDate() && props.month === today.getMonth() && props.year === today.getFullYear()

const hasEvent = (d) => props.eventDates.includes(d)
const isSelected = (d) => d === props.selectedDate
</script>

<template>
  <div>
    <p class="text-sm font-semibold text-heading mb-4">
      {{ BULAN[month] }} {{ year }}
    </p>
    <div class="grid grid-cols-7 gap-1">
      <!-- Day headers -->
      <div
        v-for="day in dayHeaders"
        :key="day"
        class="text-center text-[11px] font-semibold text-placeholder pb-2.5"
      >
        {{ day }}
      </div>

      <!-- Cells -->
      <template v-for="(d, i) in cells" :key="i">
        <div v-if="!d" />
        <button
          v-else
          @click="emit('select', d)"
          class="aspect-square flex flex-col items-center justify-center gap-1 rounded-xl border-0 cursor-pointer transition-all text-sm"
          :class="isSelected(d)
            ? 'bg-primary text-white font-bold'
            : isToday(d)
              ? 'bg-primary-surface text-primary font-bold'
              : 'bg-transparent text-body hover:bg-bg'"
        >
          {{ d }}
          <div
            v-if="hasEvent(d)"
            class="w-1 h-1 rounded-full"
            :class="isSelected(d) ? 'bg-white' : 'bg-primary'"
          />
        </button>
      </template>
    </div>
  </div>
</template>
