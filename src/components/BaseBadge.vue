<script setup>
defineProps({
  variant: { type: String, default: 'default' },
})

const variantClasses = {
  default: 'bg-card text-body',
  primary: 'bg-primary-surface text-primary',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-destructive',
}
</script>

<template>
  <span
    class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium"
    :class="variantClasses[variant]"
  >
    <slot />
  </span>
</template>
