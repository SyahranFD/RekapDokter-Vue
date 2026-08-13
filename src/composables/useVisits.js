import { ref, watch } from 'vue'
import { generateId, getNextVisitDate, DUMMY_TRANSCRIPT, DUMMY_SUMMARY, MEDICAL_TERMS } from '@/utils/utils.js'

const STORAGE_KEY = 'rekap_visits'

const visits = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))

watch(visits, (val) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
}, { deep: true })

export function useVisits() {
  function createVisit(duration) {
    const id = generateId('visit')
    const nextDate = getNextVisitDate()
    const summary = {
      ...DUMMY_SUMMARY,
      nextVisit: {
        ...DUMMY_SUMMARY.nextVisit,
        date: nextDate,
      },
    }
    const visit = {
      id,
      date: new Date().toISOString(),
      doctorName: 'Dr. Budi Santoso, Sp.PD',
      diagnosis: 'Faringitis akut',
      status: 'recorded',
      duration,
      transcript: {
        text: DUMMY_TRANSCRIPT,
        medicalTerms: Object.entries(MEDICAL_TERMS).map(([term, explanation]) => ({
          term,
          explanation,
        })),
      },
      summary,
    }
    visits.value.unshift(visit)
    localStorage.setItem('rekap_current_visit_id', id)
    return visit
  }

  function markTranscribed(id) {
    const v = visits.value.find((v) => v.id === id)
    if (v) v.status = 'transcribed'
  }

  function markSummarized(id) {
    const v = visits.value.find((v) => v.id === id)
    if (v) v.status = 'summarized'
  }

  function getCurrentVisit() {
    const id = localStorage.getItem('rekap_current_visit_id')
    return visits.value.find((v) => v.id === id) || visits.value[0] || null
  }

  function getVisitById(id) {
    return visits.value.find((v) => v.id === id) || null
  }

  function deleteVisit(id) {
    visits.value = visits.value.filter((v) => v.id !== id)
  }

  const allVisits = visits

  return {
    allVisits,
    createVisit,
    markTranscribed,
    markSummarized,
    getCurrentVisit,
    getVisitById,
    deleteVisit,
  }
}
