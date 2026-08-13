<script setup>
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const router = useRouter()
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-bg px-8">
    <div class="text-center max-w-md">
      <div class="w-16 h-16 rounded-2xl bg-primary-surface flex items-center justify-center mx-auto mb-6">
        <Icon icon="lucide:compass" class="w-8 h-8 text-primary" />
      </div>
      <h1 class="text-4xl font-extrabold text-heading mb-2">404</h1>
      <p class="text-base font-medium text-heading mb-1.5">Halaman Tidak Ditemukan</p>
      <p class="text-sm text-placeholder mb-8 leading-relaxed">
        Halaman yang Anda cari tidak ada atau telah dipindahkan.
      </p>
      <button
        @click="router.push('/')"
        class="px-8 py-3 rounded-xl text-sm font-semibold text-white border-0 cursor-pointer hover:opacity-90 transition-all"
        style="background: #14532C;"
      >
        Kembali ke Beranda
      </button>
    </div>
  </div>
</template>
