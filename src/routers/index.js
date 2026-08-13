import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from '@/views/layouts/AppLayout.vue'
import LandingView from '@/views/Landing/LandingView.vue'
import RecordView from '@/views/Record/RecordView.vue'
import ProcessingView from '@/views/Processing/ProcessingView.vue'
import TranscriptView from '@/views/Transcript/TranscriptView.vue'
import SummaryView from '@/views/Summary/SummaryView.vue'
import ChatView from '@/views/Chat/ChatView.vue'
import ReminderView from '@/views/Reminder/ReminderView.vue'
import HistoryView from '@/views/History/HistoryView.vue'
import CalendarView from '@/views/Calendar/CalendarView.vue'
import PageNotFound from '@/views/error/PageNotFound.vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '', name: 'landing', component: LandingView, meta: { title: 'Beranda' } },
      { path: '/rekam', name: 'rekam', component: RecordView, meta: { title: 'Rekam Kunjungan' } },
      { path: '/memproses', name: 'memproses', component: ProcessingView, meta: { title: 'Memproses', hideNavbar: true } },
      { path: '/transkripsi', name: 'transkripsi', component: TranscriptView, meta: { title: 'Transkripsi' } },
      { path: '/ringkasan', name: 'ringkasan', component: SummaryView, meta: { title: 'Ringkasan' } },
      { path: '/chat', name: 'chat', component: ChatView, meta: { title: 'Chat AI' } },
      { path: '/pengingat', name: 'pengingat', component: ReminderView, meta: { title: 'Pengingat' } },
      { path: '/riwayat', name: 'riwayat', component: HistoryView, meta: { title: 'Riwayat' } },
      { path: '/kalender', name: 'kalender', component: CalendarView, meta: { title: 'Kalender' } },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: PageNotFound,
    meta: { title: 'Halaman Tidak Ditemukan' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = `${to.meta.title || 'Rekap Dokter'} — Rekap Dokter`
})

export default router
