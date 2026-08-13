<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  error: { type: String, default: '' },
  helper: { type: String, default: '' },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-[11px] font-semibold text-placeholder uppercase tracking-wide">
      {{ label }}
    </label>
    <input
      v-if="type !== 'textarea'"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      class="px-3.5 py-2.5 border border-border rounded-xl text-sm text-heading bg-bg placeholder:text-placeholder transition-colors"
      :class="error ? 'border-destructive' : ''"
    />
    <textarea
      v-else
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      rows="3"
      class="px-3.5 py-2.5 border border-border rounded-xl text-sm text-heading bg-bg placeholder:text-placeholder transition-colors resize-none"
      :class="error ? 'border-destructive' : ''"
    />
    <p v-if="error" class="text-xs text-destructive">{{ error }}</p>
    <p v-else-if="helper" class="text-xs text-placeholder">{{ helper }}</p>
  </div>
</template>
