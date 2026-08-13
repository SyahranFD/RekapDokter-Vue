<script setup>
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useVisits } from '@/composables/useVisits.js'
import { useToast } from '@/composables/useToast.js'
import { formatDuration } from '@/utils/utils.js'

const router = useRouter()
const { createVisit } = useVisits()
const { success, error: toastError } = useToast()

const state = ref('idle') // idle | recording | paused
const seconds = ref(0)
const timerRef = ref(null)

const bars = Array.from({ length: 13 })

const startTimer = () => {
  timerRef.value = setInterval(() => { seconds.value++ }, 1000)
}

const stopTimer = () => {
  clearInterval(timerRef.value)
  timerRef.value = null
}

const handleStart = () => {
  state.value = 'recording'
  startTimer()
}

const handlePause = () => {
  if (state.value === 'recording') {
    state.value = 'paused'
    stopTimer()
  } else {
    state.value = 'recording'
    startTimer()
  }
}

const handleStop = () => {
  if (seconds.value < 3) {
    toastError('Rekaman terlalu pendek. Minimal 3 detik.')
    return
  }
  stopTimer()
  const visit = createVisit(seconds.value)
  success('Rekaman berhasil disimpan!')
  router.push('/memproses')
}

const handleReset = () => {
  stopTimer()
  state.value = 'idle'
  seconds.value = 0
}

onUnmounted(() => stopTimer())
</script>

<template>
  <div class="max-w-[700px] mx-auto px-8 py-10">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-[28px] font-bold text-heading tracking-tight">Rekam Kunjungan</h1>
      <p class="text-sm text-placeholder mt-1">Rekam percakapan dengan doktermu secara langsung</p>
    </div>

    <!-- Recording Card -->
    <div class="bg-white border border-border rounded-2xl px-12 py-14 flex flex-col items-center gap-9">
      <!-- Status indicator -->
      <div class="flex items-center gap-2">
        <div
          class="w-2 h-2 rounded-full flex-shrink-0"
          :class="state === 'recording' ? 'bg-primary-accent' : state === 'paused' ? 'bg-amber-400' : 'bg-placeholder'"
          :style="state === 'recording' ? 'animation: pulse-dot 1.4s ease infinite' : ''"
        />
        <span class="text-sm font-medium text-body">
          {{ state === 'idle' ? 'Siap merekam' : state === 'recording' ? 'Sedang merekam...' : 'Dijeda' }}
        </span>
      </div>

      <!-- Timer -->
      <span class="font-mono text-[64px] font-medium text-heading tracking-[0.05em] leading-none">
        {{ formatDuration(seconds) }}
      </span>

      <!-- Waveform -->
      <div class="flex items-center gap-1.5 h-12">
        <div
          v-for="(_, i) in bars"
          :key="i"
          class="w-1.5 rounded-full bg-primary origin-bottom transition-transform duration-500"
          :style="state === 'recording'
            ? `height:100%; animation: bar-anim ${0.5 + i * 0.09}s ease-in-out infinite alternate ${i * 0.06}s`
            : 'height:100%; transform: scaleY(0.12)'"
          :class="state === 'idle' ? 'opacity-20' : 'opacity-100'"
        />
      </div>

      <!-- Record Button -->
      <div class="relative flex items-center justify-center">
        <!-- Pulse rings -->
        <template v-if="state === 'recording'">
          <div
            class="absolute w-[110px] h-[110px] rounded-full border-2 border-primary-accent"
            style="animation: pulse-ring 1.6s ease-out infinite; opacity: 0.5;"
          />
          <div
            class="absolute w-[136px] h-[136px] rounded-full border border-primary-accent"
            style="animation: pulse-ring 1.6s ease-out infinite 0.4s; opacity: 0.3;"
          />
        </template>

        <button
          @click="state === 'idle' ? handleStart() : handleStop()"
          class="w-24 h-24 rounded-full border-0 cursor-pointer flex items-center justify-center transition-all"
          style="background: #14532C; box-shadow: 0 12px 32px rgba(20,83,44,0.35);"
          @mouseenter="e => e.currentTarget.style.transform = 'scale(1.05)'"
          @mouseleave="e => e.currentTarget.style.transform = 'scale(1)'"
        >
          <!-- Stop square when recording/paused, mic when idle -->
          <div v-if="state !== 'idle'" class="w-7 h-7 rounded-md bg-white" />
          <Icon v-else icon="lucide:mic" class="w-8 h-8 text-white" />
        </button>
      </div>

      <!-- Controls -->
      <div class="flex items-center gap-3">
        <button
          v-if="state !== 'idle'"
          @click="handlePause"
          class="px-7 py-2.5 rounded-xl border border-border bg-white text-body text-sm font-medium cursor-pointer hover:bg-card transition-colors"
        >
          {{ state === 'paused' ? 'Lanjut' : 'Jeda' }}
        </button>
        <button
          v-if="state !== 'idle'"
          @click="handleStop"
          class="px-8 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer border-0 transition-all hover:opacity-90"
          style="background: #14532C;"
        >
          Selesai
        </button>
        <button
          v-if="state !== 'idle'"
          @click="handleReset"
          class="px-5 py-2.5 rounded-xl border border-border bg-white text-placeholder text-sm cursor-pointer hover:bg-card transition-colors"
        >
          Reset
        </button>
        <button
          v-if="state === 'idle'"
          @click="handleStart"
          class="px-10 py-3.5 rounded-xl text-base font-bold text-white border-0 cursor-pointer hover:opacity-90 transition-all"
          style="background: #14532C;"
        >
          Mulai Rekaman
        </button>
      </div>

      <!-- Tips -->
      <div class="w-full bg-primary-surface rounded-xl p-4 text-sm text-body/80">
        <p class="font-semibold text-primary mb-1">Tips rekaman terbaik</p>
        <ul class="space-y-0.5 text-xs text-body/70">
          <li>• Pastikan Anda berada di ruangan yang tenang</li>
          <li>• Pegang perangkat di dekat sumber suara</li>
          <li>• Bicaralah dengan jelas dan tidak terlalu cepat</li>
        </ul>
      </div>
    </div>
  </div>
</template>
