<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useVisits } from '@/composables/useVisits.js'
import { formatDateShort } from '@/utils/utils.js'

const router = useRouter()
const { getCurrentVisit } = useVisits()

const visit = ref(null)
const selectedTerm = ref(null)

onMounted(() => {
  visit.value = getCurrentVisit()
})

const dialogLines = computed(() => {
  if (!visit.value?.transcript?.text) return []
  return visit.value.transcript.text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const colonIdx = line.indexOf(':')
      if (colonIdx === -1) return { speaker: '', text: line }
      return {
        speaker: line.slice(0, colonIdx).trim(),
        text: line.slice(colonIdx + 1).trim(),
      }
    })
})

const medicalTerms = computed(() => visit.value?.transcript?.medicalTerms || [])

function highlightTerms(text) {
  if (!text || medicalTerms.value.length === 0) return text
  let result = text
  for (const { term } of medicalTerms.value) {
    const regex = new RegExp(`\\b(${term})\\b`, 'gi')
    result = result.replace(regex, `<span class="medical-term" data-term="${term}">$1</span>`)
  }
  return result
}

function handleTermClick(event) {
  const termEl = event.target.closest('.medical-term')
  if (!termEl) return
  const termName = termEl.dataset.term
  const found = medicalTerms.value.find((t) => t.term.toLowerCase() === termName.toLowerCase())
  if (found) selectedTerm.value = found
}
</script>

<template>
  <div class="max-w-[960px] mx-auto px-8 py-10">
    <!-- Header -->
    <div class="mb-7">
      <h1 class="text-[28px] font-bold text-heading tracking-tight">Transkripsi Kunjungan</h1>
      <p v-if="visit" class="text-sm text-placeholder mt-1">
        {{ formatDateShort(visit.date) }} · {{ visit.doctorName }}
      </p>
    </div>

    <div v-if="visit" class="grid gap-6" style="grid-template-columns: 1fr 280px;">
      <!-- Dialog Column -->
      <div class="flex flex-col gap-3.5">
        <div
          v-for="(line, i) in dialogLines"
          :key="i"
          class="bg-white border border-border rounded-2xl p-5"
        >
          <span
            v-if="line.speaker"
            class="block mb-2 text-[11px] font-semibold text-primary uppercase tracking-widest"
          >
            {{ line.speaker }}
          </span>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p
            class="text-sm text-body leading-relaxed cursor-pointer"
            @click="handleTermClick"
            v-html="highlightTerms(line.text)"
          />
        </div>

        <!-- CTA -->
        <div class="mt-2">
          <button
            @click="router.push('/ringkasan')"
            class="px-8 py-3.5 rounded-xl text-sm font-semibold text-white border-0 cursor-pointer hover:opacity-90 transition-all flex items-center gap-2"
            style="background: #14532C;"
          >
            Lihat Ringkasan
            <Icon icon="lucide:arrow-right" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Sidebar: Medical Terms -->
      <div class="flex flex-col gap-3">
        <div class="bg-white border border-border rounded-2xl p-5">
          <p class="text-[11px] font-semibold text-primary uppercase tracking-widest mb-4">Istilah Medis</p>
          <div
            v-for="term in medicalTerms"
            :key="term.term"
            class="py-2.5 border-b border-border last:border-b-0 cursor-pointer hover:bg-bg rounded-lg px-1 -mx-1 transition-colors"
            @click="selectedTerm = term"
          >
            <span class="text-sm font-medium text-heading" style="border-bottom: 2px solid #14532C;">
              {{ term.term }}
            </span>
            <p class="text-xs text-placeholder mt-1">Klik untuk penjelasan</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else class="text-center py-20 text-placeholder">
      Memuat transkripsi...
    </div>

    <!-- Term Popup Modal -->
    <div
      v-if="selectedTerm"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click.self="selectedTerm = null"
    >
      <div class="absolute inset-0 bg-black/40" @click="selectedTerm = null" />
      <div class="relative bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full z-10">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-heading">{{ selectedTerm.term }}</h3>
          <button
            @click="selectedTerm = null"
            class="text-placeholder hover:text-heading cursor-pointer border-0 bg-transparent text-lg leading-none"
          >✕</button>
        </div>
        <p class="text-sm text-body leading-relaxed">{{ selectedTerm.explanation }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.medical-term) {
  border-bottom: 2px solid #14532C;
  font-weight: 500;
  cursor: pointer;
}
:deep(.medical-term:hover) {
  background: #f4f4f5;
}
</style>
