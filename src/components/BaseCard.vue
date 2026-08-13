<script setup>
defineProps({
  padding: { type: String, default: 'md' },
})

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
}
</script>

<template>
  <div
    class="bg-white border border-border rounded-2xl"
    :class="paddingClasses[padding]"
  >
    <slot />
  </div>
</template>
