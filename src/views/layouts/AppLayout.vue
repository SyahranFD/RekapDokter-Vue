<script setup>
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import BaseToast from '@/components/BaseToast.vue'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-bg">
    <Navbar v-if="!route.meta.hideNavbar" />
    <main class="flex-1">
      <router-view />
    </main>
    <BaseToast />
  </div>
</template>
