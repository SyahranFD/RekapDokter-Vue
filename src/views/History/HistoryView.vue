<script setup>
import { useRouter } from 'vue-router'
import { useVisits } from '@/composables/useVisits.js'
import { useToast } from '@/composables/useToast.js'
import { Icon } from '@iconify/vue'
import VisitRow from './history-component/VisitRow.vue'

const router = useRouter()
const { allVisits, deleteVisit } = useVisits()
const { success } = useToast()

const goToSummary = (visitId) => router.push({ name: 'ringkasan', query: { id: visitId } })

const handleDelete = (id) => {
  deleteVisit(id)
  success('Kunjungan dihapus.')
}
</script>

<template>
  <div class="max-w-[960px] mx-auto px-8 py-10">
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-[28px] font-bold text-heading tracking-tight">Riwayat Kunjungan</h1>
        <p class="text-sm text-placeholder mt-1">{{ allVisits.length }} kunjungan tersimpan</p>
      </div>
      <button
        @click="router.push('/rekam')"
        class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white border-0 cursor-pointer hover:opacity-90 flex items-center gap-2"
        style="background: #14532C;"
      >
        <Icon icon="lucide:plus" class="w-4 h-4" />
        Rekam Baru
      </button>
    </div>

    <!-- Table -->
    <div v-if="allVisits.length > 0" class="bg-white border border-border rounded-2xl overflow-hidden">
      <!-- Header Row -->
      <div
        class="grid px-6 py-3 border-b border-border bg-bg"
        style="grid-template-columns: 160px 1fr 1fr 1fr 80px auto;"
      >
        <span class="text-[11px] font-semibold text-placeholder uppercase tracking-widest">Tanggal</span>
        <span class="text-[11px] font-semibold text-placeholder uppercase tracking-widest">Dokter</span>
        <span class="text-[11px] font-semibold text-placeholder uppercase tracking-widest">Diagnosis</span>
        <span class="text-[11px] font-semibold text-placeholder uppercase tracking-widest">Obat</span>
        <span class="text-[11px] font-semibold text-placeholder uppercase tracking-widest">Status</span>
        <span />
      </div>

      <!-- Rows -->
      <VisitRow
        v-for="visit in allVisits"
        :key="visit.id"
        :visit="visit"
        @click="goToSummary(visit.id)"
      />
    </div>

    <!-- Empty state -->
    <div v-else class="bg-white border border-border rounded-2xl px-8 py-20 text-center">
      <Icon icon="lucide:clock" class="w-10 h-10 text-placeholder mx-auto mb-4" />
      <p class="text-base font-medium text-heading">Belum ada kunjungan</p>
      <p class="text-sm text-placeholder mt-1.5 mb-6">Rekam kunjungan pertama Anda untuk melihat riwayat.</p>
      <button
        @click="router.push('/rekam')"
        class="px-6 py-2.5 rounded-xl text-sm font-semibold text-white border-0 cursor-pointer hover:opacity-90"
        style="background: #14532C;"
      >
        Mulai Rekaman
      </button>
    </div>
  </div>
</template>
