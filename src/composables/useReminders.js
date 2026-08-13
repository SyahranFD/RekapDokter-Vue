import { ref, watch } from 'vue'
import { generateId } from '@/utils/utils.js'

const STORAGE_KEY = 'rekap_reminders'

const reminders = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))

watch(reminders, (val) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
}, { deep: true })

export function useReminders() {
  async function requestNotificationPermission() {
    if (!('Notification' in window)) return 'unsupported'
    if (Notification.permission === 'granted') return 'granted'
    if (Notification.permission === 'denied') return 'denied'
    const result = await Notification.requestPermission()
    return result
  }

  function sendNotification(title, body) {
    if (Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/favicon.svg' })
    }
  }

  async function addReminder(data) {
    const id = generateId('reminder')
    const reminder = {
      id,
      visitId: data.visitId || null,
      type: data.type || 'medication',
      title: data.title,
      time: data.time || '',
      days: data.days || [],
      date: data.date || null,
      active: true,
      createdAt: new Date().toISOString(),
    }
    reminders.value.unshift(reminder)
    await requestNotificationPermission()
    return reminder
  }

  function toggleReminder(id) {
    const r = reminders.value.find((r) => r.id === id)
    if (r) r.active = !r.active
  }

  function deleteReminder(id) {
    reminders.value = reminders.value.filter((r) => r.id !== id)
  }

  function checkDueReminders() {
    const now = new Date()
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    const currentDay = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][now.getDay()]
    reminders.value
      .filter((r) => r.active && r.type === 'medication' && r.time === currentTime && r.days.includes(currentDay))
      .forEach((r) => sendNotification('Pengingat Obat', r.title))
  }

  return {
    reminders,
    addReminder,
    toggleReminder,
    deleteReminder,
    requestNotificationPermission,
    checkDueReminders,
  }
}
