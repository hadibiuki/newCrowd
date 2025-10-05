<template>
  <div class="root">
    <div class="flex flex-row items-centers justify-center gap-xs">
      <ui-Button
        class="h-[48px]"
        type="primary"
        icon="ArrowLeft"
        :loading="loading"
        :disabled="ssn.length !== 10"
        @click="onSendOtp"
      />
      <ui-TextField
        v-model="ssn"
        :disabled="loading"
        :loading="loading"
        :placeholder="$t('signup.ssn_input')"
        class="w-full h-[48px]"
        name="discount_percent"
        is-number
        max-length="10"
        @keyup.enter="onSendOtp"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  loading: boolean;
}>();
const emits = defineEmits(['send']);
const ssn = ref('');
const onSendOtp = () => {
  if (ssn.value.length !== 10) {
    return;
  }
  emits('send', ssn.value);
};
</script>
