<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useVisits } from '@/composables/useVisits.js'
import { useReminders } from '@/composables/useReminders.js'
import { BULAN, formatDateShort } from '@/utils/utils.js'
import CalendarGrid from './calendar-component/CalendarGrid.vue'

const router = useRouter()
const { allVisits } = useVisits()
const { reminders } = useReminders()

const today = new Date()
const currentYear = ref(today.getFullYear())
const currentMonth = ref(today.getMonth())
const selectedDate = ref(today.getDate())

const prevMonth = () => {
  if (currentMonth.value === 0) { currentMonth.value = 11; currentYear.value-- }
  else currentMonth.value--
  selectedDate.value = null
}
const nextMonth = () => {
  if (currentMonth.value === 11) { currentMonth.value = 0; currentYear.value++ }
  else currentMonth.value++
  selectedDate.value = null
}

// Collect event dates from visits' nextVisit and checkup reminders
const eventDates = computed(() => {
  const dates = new Set()
  for (const v of allVisits.value) {
    if (v.summary?.nextVisit?.date) {
      const d = new Date(v.summary.nextVisit.date)
      if (d.getFullYear() === currentYear.value && d.getMonth() === currentMonth.value) {
        dates.add(d.getDate())
      }
    }
  }
  for (const r of reminders.value) {
    if (r.type === 'checkup' && r.date) {
      const d = new Date(r.date)
      if (d.getFullYear() === currentYear.value && d.getMonth() === currentMonth.value) {
        dates.add(d.getDate())
      }
    }
  }
  return [...dates]
})

// Events for selected date
const selectedEvents = computed(() => {
  if (!selectedDate.value) return []
  const events = []
  for (const v of allVisits.value) {
    if (v.summary?.nextVisit?.date) {
      const d = new Date(v.summary.nextVisit.date)
      if (d.getFullYear() === currentYear.value && d.getMonth() === currentMonth.value && d.getDate() === selectedDate.value) {
        events.push({ type: 'visit', label: `Kontrol — ${v.diagnosis}`, sub: v.doctorName, visitId: v.id })
      }
    }
  }
  for (const r of reminders.value) {
    if (r.type === 'checkup' && r.date) {
      const d = new Date(r.date)
      if (d.getFullYear() === currentYear.value && d.getMonth() === currentMonth.value && d.getDate() === selectedDate.value) {
        events.push({ type: 'reminder', label: r.title, sub: 'Pengingat kontrol' })
      }
    }
  }
  return events
})

// Upcoming events (all months)
const upcomingEvents = computed(() => {
  const now = new Date()
  const events = []
  for (const v of allVisits.value) {
    if (v.summary?.nextVisit?.date) {
      const d = new Date(v.summary.nextVisit.date)
      if (d >= now) events.push({ date: d, label: `Kontrol — ${v.diagnosis}`, sub: v.doctorName, visitId: v.id })
    }
  }
  for (const r of reminders.value) {
    if (r.type === 'checkup' && r.date) {
      const d = new Date(r.date)
      if (d >= now) events.push({ date: d, label: r.title, sub: 'Pengingat kontrol' })
    }
  }
  return events.sort((a, b) => a.date - b.date).slice(0, 5)
})
</script>

<template>
  <div class="max-w-[960px] mx-auto px-8 py-10">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-[28px] font-bold text-heading tracking-tight">Jadwal Kontrol</h1>
      <p class="text-sm text-placeholder mt-1">Pantau jadwal kontrol dan pengingat Anda</p>
    </div>

    <div class="grid gap-6" style="grid-template-columns: 1fr 300px;">
      <!-- Calendar -->
      <div class="bg-white border border-border rounded-2xl p-6">
        <!-- Month nav -->
        <div class="flex items-center justify-between mb-5">
          <button
            @click="prevMonth"
            class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-bg cursor-pointer border border-border bg-white transition-colors"
          >
            <Icon icon="lucide:chevron-left" class="w-4 h-4 text-body" />
          </button>
          <span class="text-sm font-semibold text-heading">{{ BULAN[currentMonth] }} {{ currentYear }}</span>
          <button
            @click="nextMonth"
            class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-bg cursor-pointer border border-border bg-white transition-colors"
          >
            <Icon icon="lucide:chevron-right" class="w-4 h-4 text-body" />
          </button>
        </div>

        <CalendarGrid
          :year="currentYear"
          :month="currentMonth"
          :event-dates="eventDates"
          :selected-date="selectedDate"
          @select="selectedDate = $event"
        />

        <!-- Legend -->
        <div class="flex items-center gap-4 mt-4 pt-4 border-t border-border">
          <div class="flex items-center gap-1.5 text-xs text-placeholder">
            <div class="w-2 h-2 rounded-full bg-primary-surface border border-primary" />
            Hari ini
          </div>
          <div class="flex items-center gap-1.5 text-xs text-placeholder">
            <div class="w-2 h-2 rounded-full bg-primary" />
            Ada jadwal
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="flex flex-col gap-3">
        <!-- Selected date events -->
        <div v-if="selectedDate" class="bg-white border border-border rounded-2xl p-5">
          <p class="text-[11px] font-semibold text-primary uppercase tracking-widest mb-3">
            {{ selectedDate }} {{ BULAN[currentMonth] }} {{ currentYear }}
          </p>
          <div v-if="selectedEvents.length > 0" class="flex flex-col gap-3">
            <div
              v-for="(ev, i) in selectedEvents"
              :key="i"
              class="flex gap-3 items-start cursor-pointer hover:bg-bg rounded-xl p-1 -m-1 transition-colors"
              @click="ev.visitId && router.push({ name: 'ringkasan', query: { id: ev.visitId } })"
            >
              <div class="w-9 h-9 rounded-lg bg-primary-surface flex items-center justify-center flex-shrink-0">
                <Icon icon="lucide:calendar" class="w-4 h-4 text-primary" />
              </div>
              <div>
                <p class="text-sm font-semibold text-heading">{{ ev.label }}</p>
                <p class="text-xs text-placeholder mt-0.5">{{ ev.sub }}</p>
              </div>
            </div>
          </div>
          <p v-else class="text-sm text-placeholder">Tidak ada jadwal pada tanggal ini.</p>
        </div>

        <!-- Upcoming events -->
        <div class="bg-white border border-border rounded-2xl p-5">
          <p class="text-[11px] font-semibold text-primary uppercase tracking-widest mb-3">Jadwal Mendatang</p>
          <div v-if="upcomingEvents.length > 0" class="flex flex-col gap-3">
            <div
              v-for="(ev, i) in upcomingEvents"
              :key="i"
              class="flex gap-3 items-start"
            >
              <div class="w-9 h-9 rounded-lg bg-primary-surface flex items-center justify-center flex-shrink-0">
                <Icon icon="lucide:calendar-check" class="w-4 h-4 text-primary" />
              </div>
              <div>
                <p class="text-xs text-placeholder">{{ ev.date.toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' }) }}</p>
                <p class="text-sm font-semibold text-heading mt-0.5">{{ ev.label }}</p>
                <p class="text-xs text-placeholder">{{ ev.sub }}</p>
              </div>
            </div>
          </div>
          <p v-else class="text-sm text-placeholder">Tidak ada jadwal mendatang.</p>
        </div>
      </div>
    </div>
  </div>
</template>
