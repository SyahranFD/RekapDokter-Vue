<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useVisits } from '@/composables/useVisits.js'

const router = useRouter()
const { getCurrentVisit, markTranscribed } = useVisits()

const progress = ref(0)
const statusTexts = ['Menganalisis rekaman...', 'Membuat transkripsi...', 'Mengidentifikasi istilah medis...', 'Menyusun ringkasan...']
const currentStatus = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    progress.value += 4
    if (progress.value >= 100) {
      clearInterval(interval)
      const visit = getCurrentVisit()
      if (visit) markTranscribed(visit.id)
      setTimeout(() => router.push('/transkripsi'), 300)
    }
    if (progress.value % 25 === 0 && currentStatus.value < statusTexts.length - 1) {
      currentStatus.value++
    }
  }, 100)
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-bg px-8">
    <div class="bg-white border border-border rounded-2xl px-12 py-20 flex flex-col items-center gap-9 w-full max-w-[600px]">
      <!-- Spinner -->
      <svg width="120" height="120" viewBox="0 0 120 120" style="animation: spin 1.2s linear infinite;">
        <circle cx="60" cy="60" r="52" fill="none" stroke="#e4e4e7" stroke-width="7" />
        <circle cx="60" cy="60" r="52" fill="none" stroke="#14532C" stroke-width="7" stroke-linecap="round" stroke-dasharray="72 255" />
      </svg>

      <!-- Text -->
      <div class="text-center">
        <p class="text-lg font-semibold text-heading">{{ statusTexts[currentStatus] }}</p>
        <p class="text-sm text-placeholder mt-1.5">Harap tunggu sebentar...</p>
      </div>

      <!-- Progress Bar -->
      <div class="w-full bg-border rounded-full h-1.5 overflow-hidden">
        <div
          class="h-full bg-primary rounded-full transition-all duration-100"
          :style="{ width: progress + '%' }"
        />
      </div>
    </div>
  </div>
</template>
