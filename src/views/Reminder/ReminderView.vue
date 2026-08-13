<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useReminders } from '@/composables/useReminders.js'
import { useToast } from '@/composables/useToast.js'
import { HARI } from '@/utils/utils.js'
import ReminderItem from './reminder-component/ReminderItem.vue'

const { reminders, addReminder, toggleReminder, deleteReminder } = useReminders()
const { success, error: toastError } = useToast()

const form = ref({
  type: 'medication',
  title: '',
  time: '08:00',
  days: [...HARI],
  date: '',
})

const isSubmitting = ref(false)

const medicationReminders = computed(() => reminders.value.filter((r) => r.type === 'medication'))
const checkupReminders = computed(() => reminders.value.filter((r) => r.type === 'checkup'))

const handleSubmit = async () => {
  if (!form.value.title.trim()) {
    toastError('Nama reminder tidak boleh kosong.')
    return
  }
  if (isSubmitting.value) return
  isSubmitting.value = true
  try {
    await addReminder({ ...form.value })
    success('Pengingat berhasil ditambahkan!')
    form.value = { type: 'medication', title: '', time: '08:00', days: [...HARI], date: '' }
  } finally {
    isSubmitting.value = false
  }
}

const handleToggle = (id) => {
  toggleReminder(id)
}

const handleDelete = (id) => {
  deleteReminder(id)
  success('Pengingat dihapus.')
}

const toggleDay = (day) => {
  const idx = form.value.days.indexOf(day)
  if (idx === -1) form.value.days.push(day)
  else form.value.days.splice(idx, 1)
}
</script>

<template>
  <div class="max-w-[960px] mx-auto px-8 py-10">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-[28px] font-bold text-heading tracking-tight">Pengingat Obat</h1>
      <p class="text-sm text-placeholder mt-1">Kelola pengingat minum obat dan jadwal kontrol</p>
    </div>

    <div class="grid gap-6" style="grid-template-columns: 1fr 320px;">
      <!-- Reminder Lists -->
      <div class="flex flex-col gap-6">
        <!-- Medication reminders -->
        <div>
          <p class="text-[11px] font-semibold text-primary uppercase tracking-widest mb-3">
            Pengingat Obat ({{ medicationReminders.length }})
          </p>
          <div class="flex flex-col gap-2.5">
            <ReminderItem
              v-for="r in medicationReminders"
              :key="r.id"
              :reminder="r"
              @toggle="handleToggle"
              @delete="handleDelete"
            />
            <div v-if="medicationReminders.length === 0" class="bg-white border border-border rounded-2xl px-5 py-8 text-center text-sm text-placeholder">
              Belum ada pengingat obat.
            </div>
          </div>
        </div>

        <!-- Checkup reminders -->
        <div>
          <p class="text-[11px] font-semibold text-primary uppercase tracking-widest mb-3">
            Pengingat Kontrol ({{ checkupReminders.length }})
          </p>
          <div class="flex flex-col gap-2.5">
            <ReminderItem
              v-for="r in checkupReminders"
              :key="r.id"
              :reminder="r"
              @toggle="handleToggle"
              @delete="handleDelete"
            />
            <div v-if="checkupReminders.length === 0" class="bg-white border border-border rounded-2xl px-5 py-8 text-center text-sm text-placeholder">
              Belum ada pengingat kontrol.
            </div>
          </div>
        </div>
      </div>

      <!-- Add Form -->
      <div class="bg-white border border-border rounded-2xl p-6 self-start">
        <p class="text-sm font-bold text-heading mb-5">Tambah Pengingat</p>

        <!-- Type -->
        <div class="mb-4">
          <p class="text-[11px] font-semibold text-placeholder uppercase tracking-wide mb-1.5">Tipe</p>
          <div class="flex gap-2">
            <button
              @click="form.type = 'medication'"
              class="flex-1 py-2 rounded-lg text-xs font-medium border cursor-pointer transition-all"
              :class="form.type === 'medication' ? 'bg-primary-surface text-primary border-primary/20' : 'bg-transparent text-body border-border'"
            >
              Obat
            </button>
            <button
              @click="form.type = 'checkup'"
              class="flex-1 py-2 rounded-lg text-xs font-medium border cursor-pointer transition-all"
              :class="form.type === 'checkup' ? 'bg-primary-surface text-primary border-primary/20' : 'bg-transparent text-body border-border'"
            >
              Kontrol
            </button>
          </div>
        </div>

        <!-- Title -->
        <div class="mb-4">
          <p class="text-[11px] font-semibold text-placeholder uppercase tracking-wide mb-1.5">Nama</p>
          <input
            v-model="form.title"
            placeholder="cth: Amoxicillin 500mg"
            class="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm text-heading bg-bg placeholder:text-placeholder"
          />
        </div>

        <!-- Time (medication only) -->
        <div v-if="form.type === 'medication'" class="mb-4">
          <p class="text-[11px] font-semibold text-placeholder uppercase tracking-wide mb-1.5">Waktu</p>
          <input
            v-model="form.time"
            type="time"
            class="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm text-heading bg-bg"
          />
        </div>

        <!-- Days (medication only) -->
        <div v-if="form.type === 'medication'" class="mb-4">
          <p class="text-[11px] font-semibold text-placeholder uppercase tracking-wide mb-1.5">Hari Aktif</p>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="hari in HARI"
              :key="hari"
              @click="toggleDay(hari)"
              class="px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all border"
              :class="form.days.includes(hari) ? 'bg-primary text-white border-primary' : 'bg-transparent text-placeholder border-border'"
            >
              {{ hari.slice(0, 3) }}
            </button>
          </div>
        </div>

        <!-- Date (checkup only) -->
        <div v-if="form.type === 'checkup'" class="mb-4">
          <p class="text-[11px] font-semibold text-placeholder uppercase tracking-wide mb-1.5">Tanggal Kontrol</p>
          <input
            v-model="form.date"
            type="date"
            class="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm text-heading bg-bg"
          />
        </div>

        <!-- Submit -->
        <button
          @click="handleSubmit"
          :disabled="isSubmitting"
          class="w-full py-3 rounded-xl text-sm font-semibold text-white border-0 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style="background: #14532C;"
        >
          <span v-if="!isSubmitting">Simpan Pengingat</span>
          <span v-else class="flex items-center justify-center gap-2">
            <Icon icon="eos-icons:loading" class="w-4 h-4" />
            Menyimpan...
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
