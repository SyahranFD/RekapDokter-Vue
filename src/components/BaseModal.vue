<script setup>
defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: '' },
  maxWidth: { type: String, default: 'max-w-md' },
})

defineEmits(['close'])
</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      @click.self="$emit('close')"
    >
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="$emit('close')" />
      <div
        class="modal-box relative bg-white rounded-2xl shadow-xl w-full z-10 p-6"
        :class="maxWidth"
      >
        <div v-if="title" class="flex items-center justify-between mb-4">
          <h3 class="text-base font-semibold text-heading">{{ title }}</h3>
          <button
            @click="$emit('close')"
            class="w-7 h-7 rounded-lg flex items-center justify-center text-placeholder hover:bg-card transition-colors cursor-pointer border-0 bg-transparent"
          >
            ✕
          </button>
        </div>
        <slot />
      </div>
    </div>
  </Transition>
</template>
