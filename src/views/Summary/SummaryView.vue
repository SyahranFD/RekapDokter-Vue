<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useVisits } from '@/composables/useVisits.js'
import { useToast } from '@/composables/useToast.js'
import { formatDateShort } from '@/utils/utils.js'
import MedicationCard from './summary-component/MedicationCard.vue'
import InstructionCard from './summary-component/InstructionCard.vue'
import ScheduleCard from './summary-component/ScheduleCard.vue'

const router = useRouter()
const route = useRoute()
const { getCurrentVisit, getVisitById, markSummarized } = useVisits()
const { success } = useToast()

const visit = ref(null)

onMounted(() => {
  const id = route.query.id
  visit.value = id ? getVisitById(id) : getCurrentVisit()
  if (visit.value) markSummarized(visit.value.id)
})

const goToChat = () => router.push('/chat')
const saveToHistory = () => {
  success('Kunjungan sudah tersimpan di Riwayat.')
  router.push('/riwayat')
}
</script>

<template>
  <div class="max-w-[960px] mx-auto px-8 py-10">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-[28px] font-bold text-heading tracking-tight">Ringkasan Kunjungan</h1>
      <p v-if="visit" class="text-sm text-placeholder mt-1">
        {{ formatDateShort(visit.date) }} · {{ visit.doctorName }} · {{ visit.diagnosis }}
      </p>
    </div>

    <div v-if="visit">
      <!-- Cards Grid -->
      <div class="grid grid-cols-3 gap-5 mb-7">
        <MedicationCard :medications="visit.summary?.medications || []" />
        <InstructionCard :instructions="visit.summary?.instructions || []" />
        <ScheduleCard :next-visit="visit.summary?.nextVisit || {}" />
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3">
        <button
          @click="goToChat"
          class="px-7 py-3 rounded-xl text-sm font-semibold text-white border-0 cursor-pointer hover:opacity-90 transition-all flex items-center gap-2"
          style="background: #14532C;"
        >
          <Icon icon="lucide:message-circle" class="w-4 h-4" />
          Mulai Chat AI
        </button>
        <button
          @click="saveToHistory"
          class="px-7 py-3 rounded-xl border border-border bg-white text-sm font-medium text-body cursor-pointer hover:bg-card transition-colors flex items-center gap-2"
        >
          <Icon icon="lucide:save" class="w-4 h-4" />
          Simpan ke Riwayat
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else class="text-center py-20 text-placeholder">
      Memuat ringkasan...
    </div>
  </div>
</template>
