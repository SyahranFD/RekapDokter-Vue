<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useVisits } from '@/composables/useVisits.js'
import { useReminders } from '@/composables/useReminders.js'
import { formatDateShort } from '@/utils/utils.js'
import logo from '@/assets/logo.svg'

const router = useRouter()
const { allVisits } = useVisits()
const { reminders } = useReminders()

const activeReminders = computed(() => reminders.value.filter((r) => r.active).length)

const nextVisit = computed(() => {
  for (const v of allVisits.value) {
    if (v.summary?.nextVisit?.date) {
      return formatDateShort(v.summary.nextVisit.date)
    }
  }
  return '—'
})

const goToRekam = () => router.push('/rekam')
const goToRiwayat = () => router.push('/riwayat')
</script>

<template>
  <div class="min-h-[calc(100vh-60px)] flex flex-col">
    <!-- Hero -->
    <div
      class="flex-1 flex flex-col items-center justify-center relative overflow-hidden min-h-[520px] px-8 py-20"
      style="background: linear-gradient(135deg, #0a2e18 0%, #14532C 45%, #0f3d22 70%, #091f12 100%); background-size: 300% 300%; animation: grad-shift 14s ease infinite;"
    >
      <!-- Ambient blobs -->
      <div class="absolute pointer-events-none" style="width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(34,197,94,0.1) 0%,transparent 60%);top:-200px;right:-100px;" />
      <div class="absolute pointer-events-none" style="width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(34,197,94,0.07) 0%,transparent 60%);bottom:-100px;left:-100px;" />

      <div class="text-center max-w-2xl z-10">
        <!-- Brand -->
        <div class="flex items-center justify-center gap-3 mb-8" style="animation: fade-in 0.5s ease both 0.1s;">
          <img :src="logo" alt="Logo" class="w-7 h-7" />
          <span class="text-[17px] font-bold text-white/90">Rekap Dokter</span>
        </div>

        <!-- Heading -->
        <h1
          class="text-[52px] font-extrabold text-white leading-[1.1] tracking-[-0.03em] mb-5"
          style="animation: fade-up 0.8s ease both 0.3s;"
        >
          Ingat semua yang<br />
          <span style="color: #22c55e;">dokter katakan.</span>
        </h1>

        <!-- Subtext -->
        <p
          class="text-lg text-white/60 mb-10 leading-relaxed"
          style="animation: fade-up 0.8s ease both 0.55s;"
        >
          Rekam kunjungan doktermu, dapatkan transkripsi otomatis,<br />
          dan ringkasan yang mudah dipahami.
        </p>

        <!-- CTA Buttons -->
        <div
          class="flex items-center justify-center gap-3.5"
          style="animation: scale-in 0.5s ease both 0.85s;"
        >
          <button
            @click="goToRekam"
            class="px-8 py-3.5 rounded-xl text-base font-bold cursor-pointer border-0 transition-all hover:scale-[1.03]"
            style="background:#22c55e;color:#14532C;box-shadow:0 8px 28px rgba(34,197,94,0.35);"
            @mouseenter="e => e.currentTarget.style.boxShadow='0 12px 36px rgba(34,197,94,0.45)'"
            @mouseleave="e => e.currentTarget.style.boxShadow='0 8px 28px rgba(34,197,94,0.35)'"
          >
            Mulai Rekaman
          </button>
          <button
            @click="goToRiwayat"
            class="px-8 py-3.5 rounded-xl text-base font-medium cursor-pointer transition-all"
            style="background:transparent;color:rgba(255,255,255,0.85);border:1.5px solid rgba(255,255,255,0.28);"
            @mouseenter="e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.55)'; e.currentTarget.style.background='rgba(255,255,255,0.06)'; }"
            @mouseleave="e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.28)'; e.currentTarget.style.background='transparent'; }"
          >
            Lihat Riwayat
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Strip -->
    <div class="bg-white border-t border-border px-8 py-6">
      <div class="max-w-[900px] mx-auto grid grid-cols-3">
        <div class="text-center py-3 border-r border-border">
          <div class="text-2xl font-bold text-primary">{{ allVisits.length }}</div>
          <div class="text-sm text-placeholder mt-0.5">Kunjungan Tersimpan</div>
        </div>
        <div class="text-center py-3 border-r border-border">
          <div class="text-2xl font-bold text-primary">{{ activeReminders }}</div>
          <div class="text-sm text-placeholder mt-0.5">Pengingat Aktif</div>
        </div>
        <div class="text-center py-3">
          <div class="text-2xl font-bold text-primary">{{ nextVisit }}</div>
          <div class="text-sm text-placeholder mt-0.5">Jadwal Kontrol</div>
        </div>
      </div>
    </div>
  </div>
</template>
