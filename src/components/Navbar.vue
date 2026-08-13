<script setup>
import { useRoute, useRouter } from 'vue-router'
import logo from '@/assets/logo.svg'

const route = useRoute()
const router = useRouter()

const navItems = [
  { id: 'landing', path: '/', label: 'Beranda' },
  { id: 'rekam', path: '/rekam', label: 'Rekam' },
  { id: 'riwayat', path: '/riwayat', label: 'Riwayat' },
  { id: 'pengingat', path: '/pengingat', label: 'Pengingat' },
  { id: 'kalender', path: '/kalender', label: 'Kalender' },
]

const isActive = (item) => {
  if (item.path === '/') return route.path === '/'
  return route.path.startsWith(item.path)
}

const goTo = (path) => router.push(path)
</script>

<template>
  <nav class="bg-white border-b border-border sticky top-0 z-50">
    <div class="px-10 flex items-center h-[60px]">
      <!-- Logo (kiri) -->
      <div class="min-w-[160px]">
        <button
          @click="goTo('/')"
          class="flex items-center gap-2 cursor-pointer bg-transparent border-0"
        >
          <img :src="logo" alt="Rekap Dokter" class="w-6 h-6" />
          <span class="font-bold text-[15px] text-heading tracking-[-0.01em]">Rekap Dokter</span>
        </button>
      </div>

      <!-- Nav Links (tengah) -->
      <div class="flex-1 flex items-center justify-center gap-1">
        <button
          v-for="item in navItems"
          :key="item.id"
          @click="goTo(item.path)"
          class="relative flex items-center h-[60px] px-4 text-sm cursor-pointer border-0 bg-transparent transition-colors"
          :class="isActive(item)
            ? 'font-semibold text-primary'
            : 'font-normal text-body hover:text-primary'"
        >
          {{ item.label }}
          <!-- Underline active indicator -->
          <span
            v-if="isActive(item)"
            class="absolute bottom-0 left-4 right-4 h-[2px] rounded-t-sm bg-primary"
          />
        </button>
      </div>

      <!-- User Avatar (kanan) -->
      <div class="min-w-[160px] flex justify-end">
        <div class="w-[34px] h-[34px] rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <span class="text-xs font-semibold text-white">BP</span>
        </div>
      </div>
    </div>
  </nav>
</template>
